import time
import google.genai as genai
from config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create client with API key
client = genai.Client(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    """Service for Gemini API interactions"""
    
    def __init__(self, model_name: str = "gemini-2.5-flash", max_retries: int = 3, retry_delay: int = 2):
        """Initialize Gemini service with model"""
        self.model_name = model_name
        self.client = client
        self.max_retries = max_retries
        self.retry_delay = retry_delay
    
    def send_message(self, messages: list[dict]) -> str:
        """
        Send messages to Gemini API and get response
        
        Args:
            messages: List of message dicts with 'role' and 'content' keys
        
        Returns:
            str: Response text from Gemini
        """
        formatted_messages = [
            {
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [{"text": msg["content"]}]
            }
            for msg in messages
        ]

        last_error = None
        for attempt in range(1, self.max_retries + 1):
            try:
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=formatted_messages
                )

                logger.info(f"Gemini response received: {len(response.text)} chars")
                return response.text

            except Exception as e:
                last_error = e
                message = str(e).lower()
                logger.warning(f"Gemini API attempt {attempt} failed: {message}")

                if "503" in message or "unavailable" in message or "high demand" in message:
                    if attempt < self.max_retries:
                        logger.info(f"Retrying Gemini request in {self.retry_delay} seconds...")
                        time.sleep(self.retry_delay)
                        continue
                break

        logger.error(f"Error calling Gemini API after {self.max_retries} attempts: {last_error}")
        raise last_error

gemini_service = GeminiService()
