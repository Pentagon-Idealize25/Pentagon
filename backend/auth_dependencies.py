from fastapi import Depends, HTTPException, status, Request
from models.user import User
from utils import decode_token
import os
from dotenv import load_dotenv
from beanie import PydanticObjectId

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "pentagon_secret_key_2025_secure_token_generation")
ALGORITHM = "HS256"

async def get_current_user_from_token(request: Request) -> dict:
    """Reusable dependency to get current user from token"""
    # Try to get token from Authorization header first
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header[7:]
    else:
        # Try getting from cookies as fallback
        token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    try:
        payload = decode_token(token, SECRET_KEY, ALGORITHM)
        user_id = payload.get("sub")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
        
        user = await User.get(PydanticObjectId(user_id))
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
            
        return {
            "id": str(user.id),
            "email": user.email,
            "name": user.name,
            "birthday": user.birthday.isoformat() if user.birthday else None,
            "created_at": user.created_at
        }
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )
