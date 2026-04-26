from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import hashlib

from core.database import get_db
from api.deps import get_current_user
from models.user import User
from models.resume import Resume
from schemas.resume import ResumeResponse
from services.resume_parser import extract_text_from_pdf
from services.resume_analysis import analyze_resume_text

router = APIRouter()

@router.get("/", response_model=List[ResumeResponse])
def get_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resumes = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.created_at.desc()).all()
    return resumes

@router.post("/upload", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
    
    try:
        # Await the file stream completely
        pdf_bytes = await file.read()
        
        # Calculate Hash to check for redundancy
        file_hash = hashlib.sha256(pdf_bytes).hexdigest()
        
        # Check if already exists for this user
        existing_resume = db.query(Resume).filter(
            Resume.user_id == current_user.id,
            Resume.file_hash == file_hash
        ).first()
        
        if existing_resume:
            return existing_resume
        
        # Systematically isolate string extraction process
        extracted_text = extract_text_from_pdf(pdf_bytes)
        
        # Analyze using Gemini
        analysis_json_str = analyze_resume_text(extracted_text)
        
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to parse PDF document: {str(e)}"
        )
        
    # Bind the parsed artifact directly to the currently tracked User session
    db_resume = Resume(
        user_id=current_user.id,
        raw_text=extracted_text,
        file_hash=file_hash,
        analysis_json=analysis_json_str
    )
    
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    
    return db_resume
