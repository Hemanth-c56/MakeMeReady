import asyncio
import httpx
import websockets
import json

API_URL = "http://127.0.0.1:8000"
WS_URL = "ws://127.0.0.1:8000"

async def test_interview():
    print("Testing Interview API Flow...")
    
    # 1. Login to get token (using test user created previously)
    async with httpx.AsyncClient() as client:
        print("Logging in...")
        login_data = {"username": "test@example.com", "password": "strongpassword123"}
        res = await client.post(f"{API_URL}/api/v1/login/access-token", data=login_data)
        if res.status_code != 200:
            print("Failed to login:", res.text)
            return
        
        token = res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # 2. Create Interview Session
        print("Creating Interview Session...")
        interview_data = {
            "domain": "Frontend Development",
            "difficulty": "Intermediate"
        }
        res = await client.post(f"{API_URL}/api/v1/interviews/", json=interview_data, headers=headers)
        if res.status_code != 200:
            print("Failed to create session:", res.text)
            return
            
        session_id = res.json()["session_id"]
        print(f"Session created: {session_id}")
        
    # 3. Connect to WebSocket
    print("Connecting to WebSocket...")
    # Note: Our fastApi WS endpoint currently doesn't check the token directly in the route for simplicity. 
    # In a real app we'd pass ?token=... or use a cookie. 
    # The current endpoint signature: async def websocket_endpoint(websocket: WebSocket, session_id: str, db: Session = Depends(get_db)):
    # So we can just connect.
    
    uri = f"{WS_URL}/api/v1/interviews/ws/{session_id}"
    try:
        async with websockets.connect(uri) as ws:
            print("WebSocket connected.")
            
            # Receive the first question
            first_msg_str = await ws.recv()
            first_msg = json.loads(first_msg_str)
            print("\n[AI OUT] First question:", first_msg.get("next_question"))
            
            # Send an answer
            answer = "I have experience building React applications and using Tailwind CSS for styling. I'm excited to learn more!"
            print(f"\n[USER IN] Sending answer: {answer}")
            await ws.send(answer)
            
            # Receive evaluation and second question
            print("\nWaiting for evaluation from Gemini API...")
            second_msg_str = await ws.recv()
            second_msg = json.loads(second_msg_str)
            print("\n[AI EVAL OUT] Feedback:", second_msg.get("feedback"))
            print("[AI EVAL OUT] Filler words:", second_msg.get("filler_words_detected"))
            print("[AI EVAL OUT] Better Answer:", second_msg.get("better_answer"))
            print("\n[AI NEXT Q OUT]:", second_msg.get("next_question"))
            
            print("\nTest passed successfully!")
            
    except Exception as e:
        print(f"WebSocket test failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_interview())
