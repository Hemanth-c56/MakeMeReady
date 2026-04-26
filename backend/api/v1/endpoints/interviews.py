from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from core.database import get_db
from api.deps import get_current_user
from models.user import User
from models.resume import Resume
from models.interview import InterviewSession, InterviewMessage
from services.agent import generate_first_question, evaluate_and_reply

router = APIRouter()

class InterviewCreate(BaseModel):
    domain: str
    difficulty: str

@router.post("/")
def create_interview(
    data: InterviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = InterviewSession(user_id=current_user.id, domain=data.domain, difficulty=data.difficulty)
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"session_id": session.id}

@router.get("/{session_id}")
def get_interview_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = db.query(InterviewSession).filter(InterviewSession.id == session_id, InterviewSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    messages = db.query(InterviewMessage).filter(InterviewMessage.session_id == session_id).order_by(InterviewMessage.created_at.asc()).all()
    
    return {
        "session": session,
        "messages": messages
    }

@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, db: Session = Depends(get_db)):
    await websocket.accept()
    
    session = db.query(InterviewSession).filter(InterviewSession.id == session_id).first()
    if not session:
        await websocket.close(code=1008)
        return

    # Fetch latest resume for context
    resume = db.query(Resume).filter(Resume.user_id == session.user_id).order_by(Resume.created_at.desc()).first()
    resume_text = resume.raw_text[:2000] if resume else "No resume provided."

    # Initial interaction
    first_question = generate_first_question(session.domain, session.difficulty, resume_text)
    
    msg = InterviewMessage(session_id=session.id, role="agent", content=first_question)
    db.add(msg)
    db.commit()

    # Send the first question to kick off
    await websocket.send_json({
        "next_question": first_question,
        "feedback": "Welcome! Let's begin.",
        "filler_words_detected": [],
        "better_answer": ""
    })

    try:
        while True:
            # Wait for candidate response
            user_msg = await websocket.receive_text()
            
            db_user_msg = InterviewMessage(session_id=session.id, role="user", content=user_msg)
            db.add(db_user_msg)
            db.commit()

            # Reconstruct recent transcript (last 6 messages to save context limits)
            history = db.query(InterviewMessage).filter(InterviewMessage.session_id == session.id).order_by(InterviewMessage.created_at.desc()).limit(6).all()
            history.reverse()
            transcript = "\n".join([f"{m.role}: {m.content}" for m in history])
            
            # AI Evaluates and continues
            response_json = evaluate_and_reply(session.domain, session.difficulty, transcript, user_msg, resume_text)
            
            agent_content = response_json.get("next_question", "")
            
            db_agent_msg = InterviewMessage(
                session_id=session_id, 
                role="agent", 
                content=agent_content,
                feedback_json=response_json
            )
            db.add(db_agent_msg)
            db.commit()

            # Push structured AI response to client
            await websocket.send_json(response_json)

    except WebSocketDisconnect:
        session.status = "completed"
        db.commit()
