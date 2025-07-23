#!/usr/bin/env python3

# Simple test to verify authentication logic without full server startup
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import HTTPException
from auth_dependencies import get_current_user_from_token
from utils import create_access_token, decode_token

def test_token_creation_and_validation():
    print("Testing token creation and validation...")
    
    try:
        # Create a test token
        user_id = "test_user_123"
        token = create_access_token(user_id)
        print(f"✅ Token created: {token[:20]}...")
        
        # Test token decoding
        secret_key = "pentagon_secret_key_2025_secure_token_generation"
        payload = decode_token(token, secret_key, "HS256")
        print(f"✅ Token decoded successfully: {payload}")
        
        if payload.get("sub") == user_id:
            print("✅ Token validation successful!")
        else:
            print("❌ Token validation failed - user_id mismatch")
            
    except Exception as e:
        print(f"❌ Token test failed: {e}")

def test_401_response():
    print("\nTesting 401 response format...")
    try:
        # This should raise a 401 error
        from fastapi import Request
        from unittest.mock import Mock
        
        mock_request = Mock(spec=Request)
        mock_request.headers = {"Authorization": ""}
        mock_request.cookies = {}
        
        # This should fail and raise HTTPException
        import asyncio
        asyncio.run(get_current_user_from_token(mock_request))
        
    except HTTPException as e:
        print(f"✅ Correctly raised HTTPException: {e.status_code} - {e.detail}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_token_creation_and_validation()
    test_401_response()
