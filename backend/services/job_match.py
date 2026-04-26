import json
from google.genai import types
from services.agent import get_client

JOB_MATCH_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "match_percentage": {"type": "INTEGER", "description": "Match score between 0 and 100 based on how well the resume fits the job description"},
        "verdict_short": {"type": "STRING", "description": "A one-sentence summary verdict of the match"},
        "matched_keywords": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "Keywords from the JD that are present in the resume"},
        "missing_keywords": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "Keywords from the JD that are NOT present in the resume"},
        "resume_improvements": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "title": {"type": "STRING", "description": "Title of the improvement suggestion"},
                    "reason": {"type": "STRING", "description": "Why this improvement is needed based on the JD"},
                    "original": {"type": "STRING", "description": "Original text from the resume (or 'N/A' if missing entirely)"},
                    "suggested": {"type": "STRING", "description": "Suggested rewritten text to better match the JD"}
                },
                "required": ["title", "reason", "original", "suggested"]
            },
            "description": "Actionable suggestions to improve the resume for this specific job description"
        }
    },
    "required": [
        "match_percentage", "verdict_short", "matched_keywords", "missing_keywords", "resume_improvements"
    ]
}

def analyze_job_match(resume_text: str, job_description: str) -> str:
    """Analyzes a resume against a job description and returns a structured JSON string."""
    client = get_client()
    
    if not client:
        # Fallback dummy data if no API key
        dummy = {
            "match_percentage": 0,
            "verdict_short": "Provide GEMINI_API_KEY to see real match results.",
            "matched_keywords": [],
            "missing_keywords": [],
            "resume_improvements": []
        }
        return json.dumps(dummy)

    system_instruction = "You are an expert technical recruiter and AI ATS matching system. Given a user's resume and a target job description, meticulously compare them. Determine a realistic match percentage, identify matched and missing keywords accurately, and suggest highly targeted rewrite improvements based strictly on the schema provided."
    
    # Cap job description to prevent extremely large inputs, 15000 characters is a safe generous limit
    capped_jd = job_description[:15000]
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f"Job Description:\n{capped_jd}\n\n---\n\nApplicant's Resume:\n{resume_text[:10000]}",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=JOB_MATCH_SCHEMA
            )
        )
        return response.text
    except Exception as e:
        print(f"Job Match analysis error: {e}")
        error_dummy = {
            "match_percentage": 10,
            "verdict_short": f"Error from AI Service: {str(e)}",
            "matched_keywords": [],
            "missing_keywords": [],
            "resume_improvements": []
        }
        return json.dumps(error_dummy)
