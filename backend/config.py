import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    """Application settings and configuration"""
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    BACKEND_CORS_ORIGINS: list = ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"]

settings = Settings()
