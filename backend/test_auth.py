#!/usr/bin/env python3

import asyncio
import sys
import os

# Add the backend directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from server import app

def test_auth():
    with TestClient(app) as client:
        # Test the /auth/me endpoint without token (should return 401)
        response = client.get("/auth/me")
        print(f"Auth/me without token: {response.status_code} - {response.text}")
        
        # Test the /sessions endpoint without token (should return 401)
        response = client.get("/sessions/")
        print(f"Sessions without token: {response.status_code} - {response.text}")
        
        print("Test completed!")

if __name__ == "__main__":
    test_auth()
