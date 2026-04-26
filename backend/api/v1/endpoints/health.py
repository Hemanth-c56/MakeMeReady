from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from core.database import get_db
from schemas.health import HealthResponse

router = APIRouter()

@router.get("/", response_model=HealthResponse)
def health_check(db: Session = Depends(get_db)):
    try:
        # Simple query to check if db is up
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected: {str(e)}"
        
    return {"status": "ok", "db_status": db_status}
