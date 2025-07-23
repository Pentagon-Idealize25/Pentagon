#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import asyncio
from unittest.mock import Mock
from fastapi import Request

async def test_session_auth():
    print("Testing sessionRoutes authentication...")
    
    try:
        from routes.sessionRoutes import get_user_sessions, create_new_session
        from utils import create_access_token
        from auth_dependencies import get_current_user_from_token
        
        # Create a test token
        user_id = "test_user_123"
        token = create_access_token(user_id)
        print(f"✅ Token created for testing")
        
        # Test the auth dependency with a valid token
        mock_request = Mock(spec=Request)
        mock_request.headers = {"Authorization": f"Bearer {token}"}
        mock_request.cookies = {}
        
        # This should work if the user exists in the database
        # But since we're testing without a database, it will fail at the database lookup
        try:
            user = await get_current_user_from_token(mock_request)
            print(f"✅ Auth dependency worked: {user}")
        except Exception as e:
            if "User not found" in str(e):
                print("✅ Auth dependency working correctly (user not found in DB as expected)")
            else:
                print(f"❌ Auth dependency failed: {e}")
        
        # Test the auth dependency with no token
        mock_request_no_auth = Mock(spec=Request)
        mock_request_no_auth.headers = {}
        mock_request_no_auth.cookies = {}
        
        try:
            user = await get_current_user_from_token(mock_request_no_auth)
            print("❌ Should have failed without token")
        except Exception as e:
            if "Not authenticated" in str(e):
                print("✅ Correctly rejected request without token")
            else:
                print(f"❌ Unexpected error: {e}")
                
    except Exception as e:
        print(f"❌ Import or setup error: {e}")

if __name__ == "__main__":
    asyncio.run(test_session_auth())
