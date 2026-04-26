from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from core.database import get_db
from models.user import User
from models.resume import Resume
from models.interview import InterviewSession
from models.quiz import QuizSession
from datetime import datetime, timedelta, timezone
import json
from collections import defaultdict
from sqlalchemy import func
from schemas.user import UserCreate, UserResponse
from api.deps import get_current_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    
    # Create new user
    user_data = user_in.model_dump(exclude={"password"})
    user_data["hashed_password"] = get_password_hash(user_in.password)
    
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me/dashboard")
def get_user_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Counts
    interview_count = db.query(func.count(InterviewSession.id)).filter(InterviewSession.user_id == current_user.id).scalar() or 0
    drill_count = db.query(func.count(QuizSession.id)).filter(QuizSession.user_id == current_user.id).scalar() or 0
    
    # Calculate average drill score
    avg_score = db.query(func.avg(QuizSession.score_percentage)).filter(QuizSession.user_id == current_user.id).scalar() or 0.0
    
    # Calculate resume score average or logic
    latest_resume = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.created_at.desc()).first()
    resume_score = 0
    if latest_resume and latest_resume.analysis_json:
        try:
            analysis = json.loads(latest_resume.analysis_json)
            resume_score = analysis.get("overall_match_score", 0)
        except:
            pass

    # Build consistency data for the last 7 days
    today = datetime.now(timezone.utc).date()
    consistency_data = []
    
    for i in range(6, -1, -1):
        target_date = today - timedelta(days=i)
        
        # Count interviews for target_date
        interviews_on_day = db.query(func.count(InterviewSession.id)).filter(
            InterviewSession.user_id == current_user.id,
            func.date(InterviewSession.started_at) == target_date
        ).scalar() or 0
        
        # Count drills for target_date
        drills_on_day = db.query(func.count(QuizSession.id)).filter(
            QuizSession.user_id == current_user.id,
            func.date(QuizSession.created_at) == target_date
        ).scalar() or 0
        
        consistency_data.append({
            "day": target_date.strftime("%a"),
            "interviews": interviews_on_day,
            "drills": drills_on_day,
            "date": target_date.isoformat()
        })
        
    # Calculate current streak
    current_streak = 0
    check_date = today
    while True:
        activity_count = db.query(func.count(InterviewSession.id)).filter(
            InterviewSession.user_id == current_user.id,
            func.date(InterviewSession.started_at) == check_date
        ).scalar() or 0
        activity_count += db.query(func.count(QuizSession.id)).filter(
            QuizSession.user_id == current_user.id,
            func.date(QuizSession.created_at) == check_date
        ).scalar() or 0
        
        if activity_count > 0:
            current_streak += 1
            check_date -= timedelta(days=1)
        else:
            if check_date == today:
                check_date -= timedelta(days=1)
                continue
            break

    # Calculate skill_data
    skill_scores = defaultdict(list)
    all_drills = db.query(QuizSession).filter(QuizSession.user_id == current_user.id).all()
    for d in all_drills:
        if d.topics:
            topics = [t.strip() for t in d.topics.split(",")]
            for t in topics:
                if t:
                    skill_scores[t].append(d.score_percentage or 0)
                
    all_interviews = db.query(InterviewSession).filter(InterviewSession.user_id == current_user.id).all()
    for iv in all_interviews:
        if iv.domain:
            skill_scores[iv.domain].append(80.0)

    skill_data = []
    for skill, scores in skill_scores.items():
        if scores:
            avg = sum(scores) / len(scores)
            skill_data.append({"skill": skill.capitalize(), "value": round(avg)})

    # Sort descending by value to get top skills
    skill_data.sort(key=lambda x: x["value"], reverse=True)

    if not skill_data:
        skill_data = [
            {"skill": "DSA", "value": 0},
            {"skill": "System Design", "value": 0},
            {"skill": "Behavioral", "value": 0}
        ]
        
    # Get recent activities (Mix of top 3 interviews and top 3 drills, sorted by date)
    recent_interviews = db.query(InterviewSession).filter(InterviewSession.user_id == current_user.id).order_by(InterviewSession.started_at.desc()).limit(3).all()
    recent_drills = db.query(QuizSession).filter(QuizSession.user_id == current_user.id).order_by(QuizSession.created_at.desc()).limit(3).all()
    
    activities = []
    for iv in recent_interviews:
        activities.append({
            "id": iv.id,
            "type": "Interview",
            "title": f"Mock Interview: {iv.domain}",
            "date": iv.started_at.isoformat() if iv.started_at else "",
            "score": None
        })
    for dr in recent_drills:
        activities.append({
            "id": dr.id,
            "type": "Rapid Fire Drill",
            "title": f"Drill: {dr.topics}",
            "date": dr.created_at.isoformat() if dr.created_at else "",
            "score": getattr(dr, 'score_percentage', 0)
        })
        
    # Sort activities by newest first and limit to 5
    activities.sort(key=lambda x: x["date"], reverse=True)
    recent_activities = activities[:5]

    return {
        "interviews_completed": interview_count,
        "drills_completed": drill_count,
        "average_drill_score": avg_score,
        "resume_score": resume_score,
        "consistency_data": consistency_data,
        "recent_activities": recent_activities,
        "current_streak": current_streak,
        "skill_data": skill_data[:6]
    }

@router.get("/me/profile")
def get_user_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # 1. User basic info
    interview_count = db.query(func.count(InterviewSession.id)).filter(InterviewSession.user_id == current_user.id).scalar() or 0
    drill_count = db.query(func.count(QuizSession.id)).filter(QuizSession.user_id == current_user.id).scalar() or 0
    total_sessions = interview_count + drill_count

    latest_resume = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.created_at.desc()).first()
    current_ats_score = 0
    if latest_resume and latest_resume.analysis_json:
        try:
            analysis = json.loads(latest_resume.analysis_json)
            current_ats_score = analysis.get("overall_match_score", 0)
        except:
            pass

    # 2. Focus Areas
    domain_counts = defaultdict(int)
    all_interviews = db.query(InterviewSession).filter(InterviewSession.user_id == current_user.id).all()
    for iv in all_interviews:
        if iv.domain:
            domain_counts[iv.domain.capitalize()] += 1
            
    all_drills = db.query(QuizSession).filter(QuizSession.user_id == current_user.id).all()
    for dr in all_drills:
        if dr.topics:
            topics = [t.strip().capitalize() for t in dr.topics.split(",")]
            for t in topics:
                if t:
                    domain_counts[t] += 1
                    
    focus_areas = []
    colors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5']
    sorted_domains = sorted(domain_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    for idx, (domain, count) in enumerate(sorted_domains):
        focus_areas.append({
            "category": domain,
            "count": count,
            "color": colors[idx % len(colors)]
        })

    # 3. Badges
    badges = []
    badge_id = 1
    if total_sessions > 0:
        badges.append({"id": badge_id, "label": "First Step", "icon": "🌱"})
        badge_id += 1
    if drill_count >= 5:
        badges.append({"id": badge_id, "label": "Drill Master", "icon": "🎯"})
        badge_id += 1
    if interview_count >= 3:
        badges.append({"id": badge_id, "label": "Interview Ready", "icon": "🎤"})
        badge_id += 1
    if drill_count >= 10 and interview_count >= 10:
        badges.append({"id": badge_id, "label": "Unstoppable", "icon": "🔥"})
        badge_id += 1
        
    full_name = current_user.full_name or "Student"
    user_info = {
        "name": full_name,
        "email": current_user.email,
        "avatar": full_name[:2].upper() if full_name else "ST",
        "currentAtsScore": current_ats_score,
        "totalSessions": total_sessions,
        "focusAreas": focus_areas,
        "hasResume": latest_resume is not None,
        "resumeName": "Resume.pdf" if latest_resume else None
    }

    # 4. Activity History
    activities = []
    activity_id = 1
    
    # Resume Audit
    all_resumes = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.created_at.desc()).limit(5).all()
    for res in all_resumes:
        score = 0
        try:
            if res.analysis_json:
                an = json.loads(res.analysis_json)
                score = an.get("overall_match_score", 0)
        except:
            pass
        activities.append({
            "id": activity_id,
            "title": "Resume Audit",
            "description": "Uploaded and audited resume",
            "time": res.created_at.isoformat(),
            "timestamp": res.created_at.timestamp() if res.created_at else 0,
            "icon": "📄",
            "feedback": {
                "atsScore": score,
                "suggestions": "Resume parsed and analyzed."
            }
        })
        activity_id += 1

    # Mock Interviews
    for iv in all_interviews:
        ts = iv.started_at or datetime.now(timezone.utc)
        activities.append({
            "id": activity_id,
            "title": "Mock Interview",
            "description": f"Completed {iv.domain} interview",
            "time": ts.isoformat(),
            "timestamp": ts.timestamp(),
            "icon": "🎤",
            "feedback": {
                "score": 80, 
                "duration": "Completed", 
                "feedback": "Interview session recorded."
            }
        })
        activity_id += 1

    # Drills
    for dr in all_drills:
        ts = dr.created_at or datetime.now(timezone.utc)
        activities.append({
            "id": activity_id,
            "title": "Rapid Fire Drill",
            "description": f"Practiced {dr.topics}",
            "time": ts.isoformat(),
            "timestamp": ts.timestamp(),
            "icon": "🎯",
            "feedback": {
                "solved": dr.correct_answers or 0,
                "total": dr.total_questions or 0,
                "accuracy": round(dr.score_percentage or 0, 1),
            }
        })
        activity_id += 1

    # Sort descending by timestamp
    activities.sort(key=lambda x: x["timestamp"], reverse=True)
    activities = activities[:10]
    
    for act in activities:
        del act["timestamp"]

    return {
        "user": user_info,
        "badges": badges,
        "activityHistory": activities
    }

@router.get("/global/leaderboard")
def get_global_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).all()
    
    leaderboard = []
    for user in users:
        iv_count = db.query(func.count(InterviewSession.id)).filter(InterviewSession.user_id == user.id).scalar() or 0
        drill_count = db.query(func.count(QuizSession.id)).filter(QuizSession.user_id == user.id).scalar() or 0
        total_score = (iv_count * 10) + (drill_count * 5)
        
        if total_score > 0:
            leaderboard.append({
                "user_id": user.id,
                "name": getattr(user, 'full_name', "Anonymous User") or "Anonymous User",
                "interviews": iv_count,
                "assessments": drill_count,
                "total": total_score
            })
            
    # Sort by total descending
    leaderboard.sort(key=lambda x: x["total"], reverse=True)
    
    # Assign ranks
    for i, entry in enumerate(leaderboard):
        entry["rank"] = i + 1
        
    return leaderboard[:10]
