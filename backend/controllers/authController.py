# app/services/auth_service.py
import uuid
from db.database import users_collection
from models.user import UserCreate, Token
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
        """Register a new user and return the user ID"""
        # Validate password
        if len(user_data.password) < 8:
            raise ValueError("Password must be at least 8 characters long")
            
        if not any(c.isupper() for c in user_data.password):
            raise ValueError("Password must contain at least one uppercase letter")
            
        if not any(c.islower() for c in user_data.password):
            raise ValueError("Password must contain at least one lowercase letter")
            
        if not any(c.isdigit() for c in user_data.password):
            raise ValueError("Password must contain at least one number")
            
        if user_data.password != user_data.confirm_password:
            raise ValueError("Passwords do not match")
            
        # Validate name
        if not user_data.name or len(user_data.name.strip()) == 0:
            raise ValueError("Name cannot be empty")
            
        # Check if email exists
        existing_user = await users_collection.find_one({"email": user_data.email})
        if existing_user:
            raise ValueError("Email already registered")

        # Create user ID and hash password
        user_id = str(uuid.uuid4())
        hashed_password = get_password_hash(user_data.password)
        
        # Prepare user document
        user_doc = {
            "id": user_id,
            "email": user_data.email,
            "name": user_data.name,
            "birthday": user_data.birthday.isoformat(),
            "hashed_password": hashed_password
        }
        
        # Create user in DB
        result = await users_collection.insert_one(user_doc)
        if not result.inserted_id:
            raise ValueError("Failed to create user")
        
    

    @staticmethod
    async def get_user_by_email(email: str):
        data=await users_collection.find_one({"email": email})
        return data
    
    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[dict]:
        user = await users_collection.find_one({"email": email})
        if not user:
            return None
        if not verify_password(password, user["hashed_password"]):
            return None
        return user

    @staticmethod
    async def create_tokens(user_id: str) -> Token:
        access_token = create_access_token(
            {"sub": user_id},
            timedelta(minutes=30),
            "your-secret-key",
            "HS256"
        )
        refresh_token = create_refresh_token(
            {"sub": user_id},
            timedelta(days=7),
            "your-secret-key",
            "HS256"
        )
        return Token(
            access_token=access_token,
            token_type="bearer",
            refresh_token=refresh_token
        )