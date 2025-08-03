# app/services/auth_service.py
import uuid
from models.user import User
from schemas.userSchema import UserCreate, Token
from services.authService import (
    get_password_hash,
    create_access_token,
    create_refresh_token,
    verify_password
)
from datetime import timedelta
from typing import Optional



class AuthService:
    @staticmethod
    async def register(user_data: UserCreate) -> str:
        # Verify password match
        if user_data.password != user_data.confirm_password:
            raise ValueError("Passwords do not match")
        
        # Check if email exists
        existing_user = await User.find_one(User.email == user_data.email)
        
        if existing_user:
            raise ValueError("Email already registered")

        hashed_password = get_password_hash(user_data.password)
        
        # Create user with Beanie model
        user = User(
            email=user_data.email,
            name=user_data.name,
            birthday=user_data.birthday,
            hashed_password=hashed_password
        )
        
        await user.insert()
        return str(user.id)
    

    @staticmethod
    async def get_user_by_email(email: str):
        user = await User.find_one(User.email == email)
        if user:
            return {
                "_id": str(user.id),
                "email": user.email,
                "name": user.name,
                "birthday": user.birthday.isoformat() if user.birthday else None,
                "hashed_password": user.hashed_password,
                "created_at": user.created_at
            }
        return None
    
    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[dict]:
        user = await User.find_one(User.email == email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return {
            "_id": str(user.id),
            "email": user.email,
            "name": user.name,
            "birthday": user.birthday.isoformat() if user.birthday else None,
            "hashed_password": user.hashed_password,
            "created_at": user.created_at
        }

    @staticmethod
    async def create_tokens(user_id: str) -> Token:
        return Token(
            access_token=create_access_token(user_id),
            token_type="bearer",
            refresh_token=create_refresh_token(user_id)
        )