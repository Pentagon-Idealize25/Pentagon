# models.py
from beanie import Document
from datetime import datetime, timezone
from pydantic import Field

class Session(Document):
    user_id: str
    title: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    class Settings:
        name = "sessions"  # Collection name in MongoDB
