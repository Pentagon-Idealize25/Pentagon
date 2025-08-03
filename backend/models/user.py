from beanie import Document
from datetime import date, datetime, timezone
from pydantic import EmailStr, Field

class User(Document):
    email: EmailStr
    name: str
    birthday: date
    hashed_password: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    class Settings:
        name = "users"  # Collection name in MongoDB