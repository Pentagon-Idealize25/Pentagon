from models.message import Message
from beanie import PydanticObjectId
from datetime import datetime
from schemas.messageSchema import MessageCreate
from typing import List, Optional
import pytz

SRI_LANKA_TZ = pytz.timezone('Asia/Colombo')

def get_utc_time():
    """Get current UTC time"""
    return datetime.utcnow()

def utc_to_local(utc_time):
    """Convert UTC time to Sri Lanka local time"""
    if utc_time.tzinfo is None:
        # If no timezone info, assume it's UTC
        utc_time = pytz.utc.localize(utc_time)
    return utc_time.astimezone(SRI_LANKA_TZ)

async def get_messages_by_session(session_id: str, skip: int = 0, limit: int = 100) -> List[dict]:
    print(f"get_messages_by_session called with session_id: {session_id}, skip: {skip}, limit: {limit}")
    messages = await Message.find(Message.session_id == session_id) \
        .sort(+Message.created_at) \
        .skip(skip) \
        .limit(limit) \
        .to_list()
    print(f"Found {len(messages)} messages")
    return [serialize_message(msg) for msg in messages]

async def create_message(message: MessageCreate) -> dict:
    message_doc = Message(
        session_id=message.session_id,
        sender=message.sender,
        content=message.content,
        reply_to_id=message.reply_to_id
    )
    await message_doc.insert()
    return serialize_message(message_doc)

async def update_message(message_id: PydanticObjectId, message: MessageCreate) -> Optional[dict]:
    existing_message = await Message.get(message_id)
    if not existing_message:
        return None
        
    existing_message.session_id = message.session_id
    existing_message.sender = message.sender
    existing_message.content = message.content
    existing_message.reply_to_id = message.reply_to_id
    
    await existing_message.save()
    return serialize_message(existing_message)

async def delete_message(message_id: PydanticObjectId) -> bool:
    message = await Message.get(message_id)
    if message:
        await message.delete()
        return True
    return False

def serialize_message(message: Message) -> dict:
    """Convert Message model to dictionary with local timestamp"""
    if message:
        # Convert UTC timestamp to Sri Lanka time for display
        local_timestamp = utc_to_local(message.created_at)
        
        return {
            "id": str(message.id),
            "session_id": message.session_id,
            "sender": message.sender,
            "content": message.content,
            "reply_to_id": message.reply_to_id,
            "timestamp": local_timestamp,
        }
    return None

async def get_message_by_id(message_id: PydanticObjectId) -> Optional[dict]:
    """Get a single message by ID"""
    message = await Message.get(message_id)
    return serialize_message(message) if message else None

async def delete_messages_by_session(session_id) -> int:
    """Delete all messages that belong to a specific session"""
    print(f"delete_messages_by_session called with session_id: {session_id}")
    
    # Convert PydanticObjectId to string if necessary for querying
    session_id_str = str(session_id) if hasattr(session_id, '__str__') else session_id
    print(f"Querying for deletion with session_id_str: {session_id_str}")
    
    messages = await Message.find(Message.session_id == session_id_str).to_list()
    print(f"Found {len(messages)} messages to delete")
    
    deleted_count = 0
    for message in messages:
        print(f"Deleting message: {message.id}")
        await message.delete()
        deleted_count += 1
    
    print(f"Successfully deleted {deleted_count} messages")
    return deleted_count