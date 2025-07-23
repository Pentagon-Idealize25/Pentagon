from datetime import date
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    name: str
    birthday: date

    @field_validator('birthday', mode='before')
    def parse_birthday(cls, value):
        if isinstance(value, str):
            # Convert ISO string to date object
            return date.fromisoformat(value)
        return value

class UserCreate(UserBase):
    password: str
    confirm_password: str
    
    @field_validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v

    @field_validator('name')
    def validate_name(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        if len(v) > 100:
            raise ValueError('Name is too long (maximum 100 characters)')
        return v.strip()

class UserInDB(UserBase):
    hashed_password: str

class UserOut(UserBase):
    id: str

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str
    

class UserLogin(BaseModel):
    email: EmailStr
    password: str