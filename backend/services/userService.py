from models.user import User
from schemas.userSchema import UserCreate

async def create_user(user: UserCreate):
    user_doc = User(
        email=user.email,
        name=user.name,
        birthday=user.birthday,
        hashed_password=""  # This should be set by the calling function
    )
    await user_doc.insert()
    return str(user_doc.id)