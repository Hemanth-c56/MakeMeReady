import uuid
from sqlalchemy import Column, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from models.base import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_hash = Column(String, index=True, nullable=True)
    raw_text = Column(Text, nullable=False)
    analysis_json = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationship back to User
    # user = relationship("User", back_populates="resumes")
