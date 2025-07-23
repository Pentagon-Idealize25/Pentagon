#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from server import app
from utils import create_access_token

def test_sessions_with_auth():
    print("Testing sessions endpoint with proper authentication...")
    
    # Create a test token
    user_id = "test_user_123"
    token = create_access_token(user_id)
    print(f"✅ Test token created: {token[:20]}...")
    
    with TestClient(app) as client:
        # Test sessions endpoint without authentication (should return 401)
        response = client.get("/sessions/")
        print(f"Sessions without token: {response.status_code} - Expected: 401")
        
        # Test sessions endpoint with authentication header
        headers = {"Authorization": f"Bearer {token}"}
        response = client.get("/sessions/", headers=headers)
        print(f"Sessions with Bearer token: {response.status_code} - {response.json() if response.status_code != 500 else 'Server Error'}")
        
        # Test sessions create endpoint
        session_data = {"title": "Test Session"}
        response = client.post("/sessions/create", headers=headers, json=session_data)
        print(f"Create session with Bearer token: {response.status_code} - {response.json() if response.status_code != 500 else 'Server Error'}")
        
        # Test auth/me endpoint with token
        response = client.get("/auth/me", headers=headers)
        print(f"Auth/me with Bearer token: {response.status_code} - {response.json() if response.status_code != 500 else 'Server Error'}")

if __name__ == "__main__":
    test_sessions_with_auth()
