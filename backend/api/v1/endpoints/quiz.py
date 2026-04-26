from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from core.database import get_db
from api.deps import get_current_user
from models.user import User
from models.quiz import QuizSession
from services.agent import generate_cs_quiz

router = APIRouter()

class QuizGenerateRequest(BaseModel):
    topics: List[str]

class QuizScoreRequest(BaseModel):
    topics: List[str]
    total_questions: int
    correct_answers: int

@router.post("/generate")
def generate_quiz(data: QuizGenerateRequest, current_user: User = Depends(get_current_user)):
    if not data.topics:
        raise HTTPException(status_code=400, detail="Must provide at least one topic.")
    
    # Generate 10 questions based on topics
    questions = generate_cs_quiz(data.topics, count=10)
    
    return questions

@router.post("/score")
def save_quiz_score(data: QuizScoreRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.total_questions <= 0:
        raise HTTPException(status_code=400, detail="Total questions must be greater than zero.")
        
    score_percentage = (data.correct_answers / data.total_questions) * 100
    topics_string = ", ".join(data.topics)
    
    session = QuizSession(
        user_id=current_user.id,
        topics=topics_string,
        total_questions=data.total_questions,
        correct_answers=data.correct_answers,
        score_percentage=score_percentage
    )
    
    db.add(session)
    db.commit()
    db.refresh(session)
    
    return {"message": "Score saved successfully", "score_id": session.id}
