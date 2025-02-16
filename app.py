from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import time

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for optimized performance
breach_data = {}
email_set = set()
last_modified_time = 0

# Function to load breach data efficiently
def load_breach_data():
    global breach_data, email_set, last_modified_time

    file_path = "users.txt"

    # Check if the file has changed to avoid unnecessary reloading
    if not os.path.exists(file_path):
        print("❌ users.txt file not found.")
        return

    current_modified_time = os.path.getmtime(file_path)
    if current_modified_time == last_modified_time:
        return  # Skip reloading if file has not changed

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = file.read().strip()
            if not data:
                breach_data = {}
                email_set = set()
                return

            # Ensure proper JSON formatting
            breach_list = json.loads(f"[{data.strip(',')}]" if not data.startswith("[") else data)

            # Convert list to dictionary & set for ultra-fast lookups
            breach_data = {user["emailAddress"]: user for user in breach_list if "emailAddress" in user}
            email_set = set(breach_data.keys())

            last_modified_time = current_modified_time  # Update modification timestamp

            print(f"✅ Loaded {len(breach_data)} breached records successfully!")

    except json.JSONDecodeError as e:
        print(f"❌ JSON Error: {e}")
    except Exception as e:
        print(f"❌ Error reading users.txt: {e}")

# Initial data load
load_breach_data()

@app.get("/check_breach")
def check_breach(email: str = Query(..., title="Email Address")):
    load_breach_data()  # Reload only if the file has changed

    if not breach_data:
        return {"status": "error", "message": "No breach data available."}

    # Fast email lookup
    if email in email_set:
        user = breach_data[email]
        return {
            "status": "breached",
            "name": user.get("firstName", "Unknown"),
            "phone": user.get("phoneNumber", "Not Available"),
            "breach_date": user.get("lastLoginTime", "Unknown")
        }
    
    return {"status": "safe"}

# To run the server:
# uvicorn server:app --host 0.0.0.0 --port 8000 --reload
