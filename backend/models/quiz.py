import uuid
from sqlalchemy import Column, String, ForeignKey, TIMESTAMP, Integer, Float
from sqlalchemy.sql import func
from models.base import Base

class QuizSession(Base):
    __tablename__ = "quiz_sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    topics = Column(String, nullable=False)  # Comma separated topics
    total_questions = Column(Integer, default=20)
    correct_answers = Column(Integer, default=0)
    score_percentage = Column(Float, default=0.0)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
