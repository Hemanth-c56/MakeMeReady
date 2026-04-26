import requests
import fitz
import io

API_URL = "http://127.0.0.1:8000"

# 1. Create a User
user_data = {
    "email": "test@example.com",
    "password": "strongpassword123",
    "full_name": "Test User"
}
print("Creating user...")
res = requests.post(f"{API_URL}/api/v1/users/", json=user_data)
if res.status_code not in (201, 400):
    print("Failed to create user:", res.text)
else:
    print("User created / already exists.")

# 2. Login to get token
print("Logging in...")
login_data = {
    "username": "test@example.com",
    "password": "strongpassword123"
}
res = requests.post(f"{API_URL}/api/v1/login/access-token", data=login_data)
if res.status_code != 200:
    print("Failed to login:", res.text)
    exit(1)
token = res.json()["access_token"]
print("Logged in successfully.")

# 3. Create a dummy PDF in memory
doc = fitz.open()
page = doc.new_page()
page.insert_text((50, 50), "Hello, this is a test resume!", fontsize=20)
page.insert_text((50, 100), "I have 5 years of experience in Python and FastAPI.", fontsize=14)
pdf_bytes = doc.write()

# 4. Upload the PDF
print("Uploading PDF...")
headers = {
    "Authorization": f"Bearer {token}"
}
files = {
    "file": ("test_resume.pdf", pdf_bytes, "application/pdf")
}
res = requests.post(f"{API_URL}/api/v1/resumes/upload", headers=headers, files=files)
if res.status_code == 201:
    print("PDF uploaded successfully.")
    print("Parsed Text:")
    print("-------")
    print(res.json()["raw_text"])
    print("-------")
else:
    print("Upload failed:", res.text)
