# utils.py
from datetime import timedelta, datetime
from passlib.context import CryptContext
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def decode_token(token: str, secret_key: str, algorithm: str) -> dict:
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload
    except JWTError as e:
        raise ValueError(f"Token decoding failed: {str(e)}")

def create_access_token(user_id: str) -> str:
    return _create_token(
        data={"sub": user_id, "type": "access"},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

def create_refresh_token(user_id: str) -> str:
    return _create_token(
        data={"sub": user_id, "type": "refresh"},
        expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )

def _create_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
