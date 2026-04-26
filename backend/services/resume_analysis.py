import json
from pydantic import BaseModel, Field
from typing import List
from google.genai import types
from services.agent import get_client

class AuditResults(BaseModel):
    overallScore: int = Field(description="Overall resume score out of 100")
    atsScore: int = Field(description="ATS compatibility score out of 100")
    keywordMatchScore: int = Field(description="Keyword match score out of 100")
    experienceRelevanceScore: int = Field(description="Experience relevance score out of 100")
    skillsCoverageScore: int = Field(description="Skills coverage score out of 100")
    formatReadabilityScore: int = Field(description="Format readability score out of 100")
    hardSkills: int = Field(description="Number of hard skills explicitly found")
    softSkills: int = Field(description="Number of soft skills explicitly found")
    actionVerbsPercentage: int = Field(description="Percentage of bullet points starting with action verbs")
    quantifiableResultsPercentage: int = Field(description="Percentage of bullet points with quantifiable metrics")
    strengths: List[str] = Field(description="Key strengths found in the resume")
    improvements: List[str] = Field(description="Key areas for improvement")
    actionPlan: List[dict] = Field(description="Step by step action plan. List of objects with keys 'title' (string) and 'description' (string)")
    careerProgression: List[dict] = Field(description="Estimated career progression timeline. List of objects with keys 'year' (int) and 'level' (string)")
    industryAlignment: List[dict] = Field(description="Industries this resume aligns best with. List of objects with keys 'industry' (string) and 'match' (int out of 100)")
    keywordDensity: List[dict] = Field(description="Density of main keywords found. List of objects with keys 'keyword' (string) and 'count' (int)")
    interviewReadinessScore: int = Field(description="Interview readiness score out of 100")
    competitiveTierScore: int = Field(description="Competitive tier out of 100 compared to average applicant")
    improvementSuggestions: List[str] = Field(description="Suggestions for improvement")
    personalityMatch: str = Field(description="One sentence summarizing the implicit personality portrayed")
    potentialRoles: List[str] = Field(description="Roles this resume is suited for")

AUDIT_RESULTS_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "overallScore": {"type": "INTEGER", "description": "Overall resume score out of 100"},
        "atsScore": {"type": "INTEGER", "description": "ATS compatibility score out of 100"},
        "keywordMatchScore": {"type": "INTEGER", "description": "Keyword match score out of 100"},
        "experienceRelevanceScore": {"type": "INTEGER", "description": "Experience relevance score out of 100"},
        "skillsCoverageScore": {"type": "INTEGER", "description": "Skills coverage score out of 100"},
        "formatReadabilityScore": {"type": "INTEGER", "description": "Format readability score out of 100"},
        "hardSkills": {"type": "INTEGER", "description": "Number of hard skills explicitly found"},
        "softSkills": {"type": "INTEGER", "description": "Number of soft skills explicitly found"},
        "actionVerbsPercentage": {"type": "INTEGER", "description": "Percentage of bullet points starting with action verbs"},
        "quantifiableResultsPercentage": {"type": "INTEGER", "description": "Percentage of bullet points with quantifiable metrics"},
        "strengths": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "Key strengths found in the resume"},
        "improvements": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "Key areas for improvement"},
        "actionPlan": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "title": {"type": "STRING"},
                    "description": {"type": "STRING"}
                },
                "required": ["title", "description"]
            },
            "description": "Step by step action plan."
        },
        "careerProgression": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "year": {"type": "INTEGER"},
                    "level": {"type": "STRING"}
                },
                "required": ["year", "level"]
            },
            "description": "Estimated career progression timeline."
        },
        "industryAlignment": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "industry": {"type": "STRING"},
                    "match": {"type": "INTEGER"}
                },
                "required": ["industry", "match"]
            },
            "description": "Industries this resume aligns best with."
        },
        "keywordDensity": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "keyword": {"type": "STRING"},
                    "count": {"type": "INTEGER"}
                },
                "required": ["keyword", "count"]
            },
            "description": "Density of main keywords found."
        },
        "interviewReadinessScore": {"type": "INTEGER", "description": "Interview readiness score out of 100"},
        "competitiveTierScore": {"type": "INTEGER", "description": "Competitive tier out of 100 compared to average applicant"},
        "improvementSuggestions": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "Suggestions for improvement"},
        "personalityMatch": {"type": "STRING", "description": "One sentence summarizing the implicit personality portrayed"},
        "potentialRoles": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "Roles this resume is suited for"}
    },
    "required": [
        "overallScore", "atsScore", "keywordMatchScore", "experienceRelevanceScore",
        "skillsCoverageScore", "formatReadabilityScore", "hardSkills", "softSkills",
        "actionVerbsPercentage", "quantifiableResultsPercentage", "strengths",
        "improvements", "actionPlan", "careerProgression", "industryAlignment",
        "keywordDensity", "interviewReadinessScore", "competitiveTierScore",
        "improvementSuggestions", "personalityMatch", "potentialRoles"
    ]
}

def analyze_resume_text(resume_text: str) -> str:
    """Analyzes the raw text of a resume and returns a structured JSON string matching AuditResults."""
    client = get_client()
    
    if not client:
        # Fallback dummy data if no API key
        dummy = AuditResults(
            overallScore=0, atsScore=0, keywordMatchScore=0, experienceRelevanceScore=0,
            skillsCoverageScore=0, formatReadabilityScore=0, hardSkills=0, softSkills=0,
            actionVerbsPercentage=0, quantifiableResultsPercentage=0,
            strengths=["Provide GEMINI_API_KEY to see real strengths"],
            improvements=[], actionPlan=[], careerProgression=[], industryAlignment=[],
            keywordDensity=[], interviewReadinessScore=0, competitiveTierScore=0,
            improvementSuggestions=[], personalityMatch="N/A", potentialRoles=[]
        )
        return dummy.model_dump_json()

    system_instruction = "You are an expert technical recruiter and ATS parser. Analyze the given resume text profoundly and calculate all requested metrics strictly adhering to the schema."
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f"Analyze the following resume text:\n\n{resume_text[:10000]}", # prevent absurdly long input
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=AUDIT_RESULTS_SCHEMA
            )
        )
        return response.text
    except Exception as e:
        print(f"Resume analysis error: {e}")
        error_dummy = AuditResults(
            overallScore=10, atsScore=10, keywordMatchScore=10, experienceRelevanceScore=10,
            skillsCoverageScore=10, formatReadabilityScore=10, hardSkills=0, softSkills=0,
            actionVerbsPercentage=0, quantifiableResultsPercentage=0,
            strengths=["Could not parse resume"],
            improvements=["Error from AI Service: " + str(e)], actionPlan=[], careerProgression=[], industryAlignment=[],
            keywordDensity=[], interviewReadinessScore=0, competitiveTierScore=0,
            improvementSuggestions=[], personalityMatch="N/A", potentialRoles=[]
        )
        return error_dummy.model_dump_json()
