
from fastapi import APIRouter, HTTPException, status,Response
from schemas.userSchema import UserCreate, UserLogin
from controllers.authController import AuthService
from fastapi import Depends, Request,Response
from utils import decode_token  
import os
from dotenv import load_dotenv
from auth_dependencies import get_current_user_from_token

load_dotenv()  # Load environment variables

PRODUCTION = os.getenv("PRODUCTION", "false").lower() == "true"
DOMAIN = os.getenv("DOMAIN", "localhost")
# Security configurations

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
SECRET_KEY = os.getenv("SECRET_KEY", "pentagon_secret_key_2025_secure_token_generation")
ALGORITHM = "HS256"

router = APIRouter(tags=["Auth"], prefix="/auth")

@router.get("/me")
async def get_current_user(current_user: dict = Depends(get_current_user_from_token)):
    """Get current user information"""
    return current_user

@router.post("/refresh")
async def refresh_token(request: Request, response: Response):
    refresh_token = request.cookies.get("refresh_token")
    
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing refresh token"
        )
    
    try:
        payload = decode_token(refresh_token, SECRET_KEY, ALGORITHM)
        user_id = payload.get("sub")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Create new tokens
        tokens = await AuthService.create_tokens(user_id)
        
        # Set new cookies
        response.set_cookie(
            key="access_token",
            value=tokens.access_token,
            httponly=True,
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite="lax"
        )
        
        response.set_cookie(
            key="refresh_token",
            value=tokens.refresh_token,
            httponly=True,
            max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            samesite="lax"
        )
        
        return {"message": "Tokens refreshed successfully"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token refresh failed: {str(e)}"
        )

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, response: Response):
    try:
        user_id = await AuthService.register(user)  # ✅ get id from return value

        tokens = await AuthService.create_tokens(user_id)  # ✅ now use this

        # Set HTTP-only cookies
        response.set_cookie(
            key="access_token",
            value=tokens.access_token,
            httponly=True,
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            secure=False,
            samesite="lax",
            path="/"
        )

        response.set_cookie(
            key="refresh_token",
            value=tokens.refresh_token,
            httponly=True,
            max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            secure=False,
            samesite="lax",
            path="/"
        )

        return {"message": "User created successfully"}

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signup failed: {str(e)}"
        )

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(user_data: UserLogin,response: Response):
    try:
        print(user_data)
        # Authenticate user
        user = await AuthService.authenticate_user(user_data.email, user_data.password)
        if not user:
            raise ValueError("Invalid email or password")
        
        print(user)
        # Generate tokens
        tokens = await AuthService.create_tokens(user["_id"])
        
        
        
        # Set HTTP-only cookies
        response.set_cookie(
            key="access_token",
            value=tokens.access_token,
            httponly=True,
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            secure=False, 
            samesite="lax",
            path="/"
        )
        
        response.set_cookie(
            key="refresh_token",
            value=tokens.refresh_token,
            httponly=True,
            max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            secure=False,
            samesite="lax",
            path="/"
        )
        
        return {"message": "Login successful", "user_id": user["_id"]}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(response: Response):
    # Clear access token cookie
    response.delete_cookie(
        key="access_token",
        path="/"
    )
    
    # Clear refresh token cookie
    response.delete_cookie(
        key="refresh_token",
        path="/"
    )
    
    return {"message": "Successfully logged out"}