from datetime import datetime
from db.database import sessions_collection
from models.session import SessionResponse
from bson import ObjectId
from typing import List, Optional
from util.gemini import generate_session_title 
from fastapi import HTTPException, status
from pydantic import BaseModel

class FirstMessage(BaseModel):
    user_id: str
    message: str

async def create_session(user_id: str, title: str) -> str:
    session_data = {
        "user_id": user_id,
        "title": title,
        "created_at": datetime.utcnow()
    }
    result = await sessions_collection.insert_one(session_data)
    return str(result.inserted_id)

async def delete_session(user_id: str, session_id: str) -> None:
    """Delete a session if it belongs to the user"""
    try:
        result = await sessions_collection.delete_one({
            "_id": ObjectId(session_id),
            "user_id": user_id
        })
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or you don't have permission to delete it"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete session: {str(e)}"
        )

async def update_session_title(user_id: str, session_id: str, new_title: str) -> SessionResponse:
    """Update a session's title if it belongs to the user"""
    try:
        # Update the session
        result = await sessions_collection.find_one_and_update(
            {"_id": ObjectId(session_id), "user_id": user_id},
            {"$set": {"title": new_title}},
            return_document=True
        )
        
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or you don't have permission to update it"
            )
            
        # Convert the result to SessionResponse
        return SessionResponse(
            id=str(result["_id"]),
            title=result["title"],
            created_at=result["created_at"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update session: {str(e)}"
        )
    return str(result.inserted_id)

async def start_new_session(data: FirstMessage):
    try:
        # Step 1: Generate a title from the first message
        title = await generate_session_title(data.message)

        # Step 2: Create session in DB
        session_id = await create_session(data.user_id, title)

        return {
            "session_id": session_id,
            "title": title,
            "message": "New session created successfully."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_session_by_id(session_id: str, user_id: str):
    session = await sessions_collection.find_one(
        {"_id": ObjectId(session_id), "user_id": user_id}
    )
    if not session:
        return None
    session["_id"] = str(session["_id"])
    return session

async def get_sessions_by_user(user_id: str) -> List[SessionResponse]:
    """Get all sessions for a specific user"""
    sessions = []
    async for doc in sessions_collection.find(
        {"user_id": user_id}
    ).sort("created_at", -1):
        # Convert MongoDB document to SessionResponse model
        sessions.append(SessionResponse(
            id=str(doc["_id"]),  # Convert ObjectId to string
            title=doc["title"],
            created_at=doc["created_at"]
        ))
    return sessions