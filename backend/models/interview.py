import uuid
from sqlalchemy import Column, String, ForeignKey, TIMESTAMP, Text, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from models.base import Base

class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    domain = Column(String, nullable=False)  # e.g., "Frontend", "Backend"
    difficulty = Column(String, nullable=False)  # e.g., "Beginner", "Advanced"
    status = Column(String, default="active")  # active, completed
    started_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    completed_at = Column(TIMESTAMP(timezone=True), nullable=True)

class InterviewMessage(Base):
    __tablename__ = "interview_messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("interview_sessions.id", ondelete="CASCADE"), nullable=False)
    role = Column(String, nullable=False)  # "agent" or "user"
    content = Column(Text, nullable=False)
    feedback_json = Column(JSON, nullable=True)  # Store structured feedback if agent evaluates
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
