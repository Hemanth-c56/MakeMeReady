from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ResumeResponse(BaseModel):
    id: str
    user_id: str
    raw_text: str
    file_hash: Optional[str] = None
    analysis_json: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
