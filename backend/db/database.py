import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv

# Import all models for Beanie initialization
from models.user import User
from models.session import Session
from models.message import Message

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI","mongodb+srv://Thanuka:2002@cluster0.m2mrpxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
DB_NAME = os.getenv("DB_NAME","LawganIdealize2025")

if not MONGO_URI:
    raise EnvironmentError("❌ MONGO_URI environment variable is not set.")
if not DB_NAME:
    raise EnvironmentError("❌ DB_NAME environment variable is not set.")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Keep collections for backward compatibility if needed
users_collection = db["users"]
sessions_collection = db["sessions"]
messages_collection = db["messages"]
lawyers_collection = db["lawyers"]

async def connect_to_mongo():
    # Initialize Beanie with the document models
    await init_beanie(database=db, document_models=[User, Session, Message])
    print("📦 Connected to MongoDB and initialized Beanie!")

async def close_mongo_connection():
    client.close()
    print("🔌 Disconnected from MongoDB!")
