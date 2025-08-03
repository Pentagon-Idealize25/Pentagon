from datetime import datetime
from models.session import Session
from schemas.chatSessionSchema import SessionResponse
from typing import List
from beanie import PydanticObjectId

async def create_session(user_id: str, title: str) -> str:
    session = Session(
        user_id=user_id,
        title=title
    )
    await session.insert()
    return str(session.id)

async def get_session_by_id(session_id: str, user_id: str):
    session = await Session.find_one(Session.id == PydanticObjectId(session_id), Session.user_id == user_id)
    if not session:
        return None
    return {
        "_id": str(session.id),
        "user_id": session.user_id,
        "title": session.title,
        "created_at": session.created_at
    }

async def delete_session(session_id: str, user_id: str) -> bool:
    print(f"delete_session called with session_id: {session_id}, user_id: {user_id}")
    
    try:
        # Validate ObjectId format
        object_id = PydanticObjectId(session_id)
        print(f"Converted to ObjectId: {object_id}")
    except Exception as e:
        print(f"Invalid ObjectId format: {session_id}, error: {e}")
        return False
    
    session = await Session.find_one(Session.id == object_id, Session.user_id == user_id)
    if not session:
        print(f"Session not found: {session_id} for user: {user_id}")
        # Let's also try to find the session without user filter to debug
        any_session = await Session.find_one(Session.id == object_id)
        if any_session:
            print(f"Session exists but belongs to different user: {any_session.user_id}")
        else:
            print(f"Session with id {session_id} does not exist at all")
        return False
    
    print(f"Found session: {session.id}, title: {session.title}, user_id: {session.user_id}")
    
    # Import here to avoid circular imports
    from services.messageService import delete_messages_by_session
    
    # Delete all messages associated with this session first
    print(f"Deleting messages for session: {session_id}")
    deleted_messages_count = await delete_messages_by_session(session_id)
    print(f"Deleted {deleted_messages_count} messages")
    
    # Then delete the session
    print(f"Deleting session: {session_id}")
    await session.delete()
    print(f"Session {session_id} deleted successfully")
    return True

async def update_session_title(session_id: str, user_id: str, new_title: str) -> bool:
    """Update the title of a session"""
    session = await Session.find_one(Session.id == PydanticObjectId(session_id), Session.user_id == user_id)
    if not session:
        return False
    
    session.title = new_title
    await session.save()
    return True

async def get_sessions_by_user(user_id: str) -> List[SessionResponse]:
    """Get all sessions for a specific user"""
    sessions = await Session.find(Session.user_id == user_id).sort(-Session.created_at).to_list()
    
    return [
        SessionResponse(
            id=str(session.id),
            title=session.title,
            created_at=session.created_at
        )
        for session in sessions
    ]