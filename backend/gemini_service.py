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
    
    def __init__(self, max_retries: int = 3, retry_delay: int = 2):
        """Initialize Gemini service with model fallback support"""
        self.models = [
            "gemini-3-flash",
            "gemini-3.1-flash-lite",
            "gemini-2.5-flash",
            "gemini-2.5-flash-lite"
        ]
        self.client = client
        self.max_retries = max_retries
        self.retry_delay = retry_delay
    
    def send_message(self, messages: list[dict], mode: str = "explain") -> str:
        """
        Send messages to Gemini API and get response.

        This method will attempt the preferred model first and fall back to
        alternative Gemini models if the request fails due to availability or
        high-demand errors.

        Args:
            messages: List of message dicts with 'role' and 'content' keys
            mode: Current conversation mode, either 'explain' or 'quiz'

        Returns:
            str: Response text from Gemini
        """
        base_instruction = (
            "You are Chatbot, a friendly and helpful AI study buddy. "
            "Support the user's learning with kind explanations, examples, and encouragement. "
            "Keep your tone positive and clear."
        )

        if mode == "quiz":
            mode_instruction = (
                "You are now in quiz mode. Ask short study questions about the user's topic, "
                "encourage them to answer, and only provide the answer or explanation after they try. "
                "Use supportive language and keep the experience fun and helpful."
            )
        else:
            mode_instruction = (
                "You are now in explain mode. Provide clear, step-by-step explanations, "
                "use examples, analogies, and summaries, and connect follow-up questions to previous replies."
            )

        system_instruction = {
            "role": "model",
            "parts": [{
                "text": f"{base_instruction} {mode_instruction}"
            }]
        }

        formatted_messages = [system_instruction] + [
            {
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [{"text": msg["content"]}]
            }
            for msg in messages
        ]

        last_error = None
        failed_models = []

        for model in self.models:
            model_had_limit_error = False
            for attempt in range(1, self.max_retries + 1):
                try:
                    response = self.client.models.generate_content(
                        model=model,
                        contents=formatted_messages
                    )

                    logger.info(f"Gemini response received from {model}: {len(response.text)} chars")

                    if failed_models:
                        limit_messages = ", ".join(
                            f"{m} ({reason})" for m, reason in failed_models
                        )
                        note = f"Note: The chatbot switched models because {limit_messages}.\n\n"
                        response_text = response.text
                        if response_text.startswith("Note: The chatbot switched models because"):
                            response_text = response_text.split("\n\n", 1)[-1]
                        return note + response_text

                    return response.text

                except Exception as e:
                    last_error = e
                    message = str(e).lower()
                    logger.warning(f"Gemini API ({model}) attempt {attempt} failed: {message}")

                    recoverable = any(
                        keyword in message
                        for keyword in [
                            "503",
                            "unavailable",
                            "high demand",
                            "quota",
                            "rate limit"
                        ]
                    )
                    unsupported = any(
                        keyword in message
                        for keyword in [
                            "not found",
                            "unsupported for generatecontent",
                            "invalid_argument"
                        ]
                    )

                    if recoverable:
                        if attempt < self.max_retries:
                            logger.info(f"Retrying {model} in {self.retry_delay} seconds...")
                            time.sleep(self.retry_delay)
                            continue
                        failed_models.append((model, message.split(".")[0]))
                        logger.info(f"Falling back from {model} to next available model")
                        model_had_limit_error = True
                        break

                    if unsupported:
                        logger.info(f"Skipping unsupported Gemini model {model}")
                        model_had_limit_error = True
                        break

                    logger.error(f"Non-recoverable Gemini error for {model}: {message}")
                    raise e

            if model_had_limit_error:
                continue

        if failed_models:
            limit_messages = ", ".join(f"{m} ({reason})" for m, reason in failed_models)
            return f"Sorry, I couldn't complete the request because the following models reached their limits: {limit_messages}."

        logger.error(f"Error calling Gemini API after fallback attempts: {last_error}")
        raise last_error

gemini_service = GeminiService()
