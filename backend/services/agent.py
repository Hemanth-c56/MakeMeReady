import os
import json
from pydantic import BaseModel, Field
from typing import List, Optional
from google import genai
from google.genai import types
from core.config import settings

class AgentResponse(BaseModel):
    next_question: str = Field(description="The next technical question or follow-up question to ask the candidate.")
    feedback: str = Field(description="Brief constructive feedback on the user's previous answer.")
    filler_words_detected: List[str] = Field(description="Any filler words like 'um', 'uh', 'like' detected in their answer.")
    better_answer: str = Field(description="A concise, more professional or accurate way they could have answered.")

class QuizQuestion(BaseModel):
    question: str = Field(description="The multiple choice question text.")
    code_snippet: Optional[str] = Field(None, description="An optional code snippet that the question refers to. Crucial for debugging or output prediction questions.")
    options: List[str] = Field(description="Exactly 4 distinct possible answers.")
    correct_answer: str = Field(description="The exact string matching the correct option.")
    explanation: str = Field(description="A concise explanation detailing why the answer is correct.")

class QuizResponse(BaseModel):
    questions: List[QuizQuestion] = Field(description="A list of the generated quiz questions.")

def get_client() -> Optional[genai.Client]:
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        return None
    return genai.Client(api_key=api_key)

def generate_first_question(domain: str, difficulty: str, resume_context: str = "") -> str:
    client = get_client()
    if not client:
        return f"Welcome to the {domain} interview! Are you ready to begin?"
        
    prompt = f"You are an expert {domain} interviewer. The candidate is interviewing at {difficulty} level. Start the interview by asking one introductory technical question based on their resume. Resume excerpt: {resume_context}"
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt
    )
    return response.text

def evaluate_and_reply(domain: str, difficulty: str, transcript: str, last_answer: str, resume_context: str = "") -> dict:
    client = get_client()
    if not client:
        # Fallback if no API key is provided
        return {
            "next_question": "That's an interesting perspective. Could you elaborate on that?",
            "feedback": "MOCKED FEEDBACK: API KEY MISSING.",
            "filler_words_detected": [],
            "better_answer": "Provide a GEMINI_API_KEY in .env to enable real evaluations."
        }
    
    system_instruction = f"You are a sharp {domain} interviewer conducting a {difficulty} level interview. The candidate's resume excerpt is: {resume_context}. Grade the user's recent answer, provide a better way to phrase it, and pose the next relevant technical question based strictly on their resume and the {domain} job role."
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f"Previous Context:\n{transcript}\n\nCandidate's Answer: {last_answer}",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=AgentResponse
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Agent error: {e}")
        return {
            "next_question": "I had a bit of an issue processing that. Let's move on. What is your strongest technical skill?",
            "feedback": "Error communicating with AI evaluator.",
            "filler_words_detected": [],
            "better_answer": "N/A"
        }

def generate_cs_quiz(topics: List[str], count: int = 20) -> dict:
    client = get_client()
    if not client:
        return {
            "questions": [
                {
                    "question": "Mock Question due to missing API Key?",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct_answer": "Option A",
                    "explanation": "Add GEMINI_API_KEY to generate genuine questions."
                }
            ]
        }
        
    topic_str = ", ".join(topics)
    system_instruction = f"You are an expert technical interviewer designing a 'Rapid Fire Drill' assessment. Generate an incredibly accurate, challenging {count}-question multiple choice quiz covering exclusively the following topics: {topic_str}. The questions can cover theoretical concepts, practical scenarios, output prediction, or identifying bugs related to the chosen topics. Include a relevant `code_snippet` only if it makes sense for the specific question. Your output must perfectly match the provided JSON schema."
    
    quiz_schema = {
        "type": "OBJECT",
        "properties": {
            "questions": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "question": {"type": "STRING"},
                        "code_snippet": {"type": "STRING"},
                        "options": {"type": "ARRAY", "items": {"type": "STRING"}},
                        "correct_answer": {"type": "STRING"},
                        "explanation": {"type": "STRING"}
                    },
                    "required": ["question", "options", "correct_answer", "explanation"]
                }
            }
        },
        "required": ["questions"]
    }

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f"Generate exactly {count} distinct multiple choice questions.",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=quiz_schema
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Quiz generation error: {e}")
        return {"questions": []}
