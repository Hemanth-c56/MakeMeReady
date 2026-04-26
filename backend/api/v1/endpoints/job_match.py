from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import json

from core.database import get_db
from api.deps import get_current_user
from models.user import User
from models.resume import Resume
from services.job_match import analyze_job_match

router = APIRouter()

class JobMatchRequest(BaseModel):
    resume_id: str
    job_description: str

@router.post("/analyze")
async def analyze(
    request: JobMatchRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty")

    resume = db.query(Resume).filter(
        Resume.id == request.resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    try:
        # analyze_job_match returns a JSON string based on the schema
        result_json_str = analyze_job_match(resume.raw_text, request.job_description)
        return json.loads(result_json_str)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze job match: {str(e)}")
