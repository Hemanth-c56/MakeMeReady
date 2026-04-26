from fastapi import APIRouter
from api.v1.endpoints import health, users, login, resumes, interviews, quiz, job_match

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(resumes.router, prefix="/resumes", tags=["resumes"])
api_router.include_router(interviews.router, prefix="/interviews", tags=["interviews"])
api_router.include_router(quiz.router, prefix="/quiz", tags=["quiz"])
api_router.include_router(job_match.router, prefix="/job-match", tags=["job-match"])
