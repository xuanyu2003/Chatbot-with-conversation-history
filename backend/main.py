from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_service import gemini_service
from config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Chatbot API",
    description="Backend API for AI Chatbot with Gemini integration",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class Message(BaseModel):
    """Single message in conversation"""
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    """Request to send a message to the chatbot"""
    messages: list[Message]
    conversation_id: str | None = None

class ChatResponse(BaseModel):
    """Response from chatbot"""
    reply: str
    conversation_id: str | None = None

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Chatbot Backend",
        "model": "gemini-1.5-flash"
    }

# Main chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Send a message to the chatbot and get AI response
    
    Args:
        request: ChatRequest with messages list
    
    Returns:
        ChatResponse with AI reply
    """
    try:
        if not request.messages:
            raise HTTPException(status_code=400, detail="No messages provided")
        
        logger.info(f"Processing chat request with {len(request.messages)} messages")
        
        # Convert Pydantic models to dicts for service
        messages = [msg.model_dump() for msg in request.messages]
        
        # Get response from Gemini
        reply = gemini_service.send_message(messages)
        
        return ChatResponse(
            reply=reply,
            conversation_id=request.conversation_id
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Batch chat endpoint for multiple conversations
@app.post("/batch-chat")
async def batch_chat(requests: list[ChatRequest], background_tasks: BackgroundTasks):
    """
    Process multiple chat requests (useful for analytics/testing)
    
    Args:
        requests: List of ChatRequest objects
    
    Returns:
        List of ChatResponse objects
    """
    try:
        responses = []
        
        for request in requests:
            messages = [msg.model_dump() for msg in request.messages]
            reply = gemini_service.send_message(messages)
            
            responses.append(ChatResponse(
                reply=reply,
                conversation_id=request.conversation_id
            ))
        
        logger.info(f"Processed {len(requests)} batch requests")
        return responses
    
    except Exception as e:
        logger.error(f"Error in batch_chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Batch processing error: {str(e)}")

# Catch-all error handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "error": "Internal server error",
        "detail": str(exc)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
