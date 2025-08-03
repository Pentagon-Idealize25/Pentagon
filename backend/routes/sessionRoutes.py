from fastapi import APIRouter, Depends, HTTPException, status
from schemas.chatSessionSchema import SessionCreate, SessionsList, SessionUpdate
from services.sessionServices import create_session, get_session_by_id, get_sessions_by_user, delete_session, update_session_title
from auth_dependencies import get_current_user_from_token

router = APIRouter(tags=["Sessions"], prefix="/sessions")

@router.get("/", response_model=SessionsList)  # Changed to SessionsList
async def get_user_sessions(
    current_user: dict = Depends(get_current_user_from_token)
):
    """Get all sessions for the current user"""
    try:
        user_id = current_user["id"]
        print(f"Fetching sessions for user_id: {user_id}")
        sessions = await get_sessions_by_user(user_id)
        return SessionsList(sessions=sessions)  # Wrap in SessionsList model
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch sessions: {str(e)}"
        )
        
@router.post("/create", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_new_session(
    session_data: SessionCreate,
    current_user: dict = Depends(get_current_user_from_token)
):
    try:
        user_id = current_user["id"]
        session_id = await create_session(user_id, session_data.title)
        return {
            "message": "Session created successfully",
            "session_id": session_id
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Session creation failed: {str(e)}"
        )
        
@router.put("/{session_id}", response_model=dict)
async def update_session_title_route(
    session_id: str,
    session_update: SessionUpdate,
    current_user: dict = Depends(get_current_user_from_token)
):
    """Update the title of a session"""
    try:
        user_id = current_user["id"]
        
        # Update the session title
        success = await update_session_title(session_id, user_id, session_update.title)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )
        
        return {"message": "Session title updated successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update session: {str(e)}"
        )
        
@router.delete("/{session_id}", status_code=status.HTTP_200_OK)
async def delete_session_route(
    session_id: str,
    current_user: dict = Depends(get_current_user_from_token)
):
    """Delete a session and all its associated messages"""
    try:
        user_id = current_user["id"]
        print(f"DELETE request received - Session ID: {session_id}, User ID: {user_id}")
        
        # Delete the session using Beanie (this will also delete all associated messages)
        success = await delete_session(session_id, user_id)
        print(f"Delete operation result: {success}")
        
        if not success:
            print(f"Session not found: {session_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )
        
        print(f"Session {session_id} deleted successfully")
        return {"message": "Session and all associated messages deleted successfully"}
    except Exception as e:
        print(f"Error deleting session: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete session: {str(e)}"
        )      


@router.get("/test-auth")
async def test_auth(current_user: dict = Depends(get_current_user_from_token)):
    """Test endpoint to verify authentication"""
    return {"message": "Auth working", "user": current_user}

@router.get("/debug/{session_id}")
async def debug_session(
    session_id: str,
    current_user: dict = Depends(get_current_user_from_token)
):
    """Debug endpoint to check if session exists"""
    try:
        user_id = current_user["id"]
        session = await get_session_by_id(session_id, user_id)
        return {
            "session_exists": session is not None,
            "session_data": session,
            "user_id": user_id,
            "session_id": session_id
        }
    except Exception as e:
        return {"error": str(e)}