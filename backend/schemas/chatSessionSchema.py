from pydantic import BaseModel, Field
from datetime import datetime
from typing import List
from bson import ObjectId

class SessionCreate(BaseModel):
    title: str

class SessionUpdate(BaseModel):
    title: str

class SessionResponse(BaseModel):
    id: str  # Remove alias
    title: str
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = { datetime: lambda v: v.isoformat() }

class SessionsList(BaseModel):
    sessions: List[SessionResponse]
    
#     from pydantic import BaseModel
# from datetime import datetime

# class SessionCreate(BaseModel):
#     user_id: str
#     title: str

# class SessionResponse(BaseModel):
#     id: str
#     user_id: str
#     title: str
#     created_at: datetime
    