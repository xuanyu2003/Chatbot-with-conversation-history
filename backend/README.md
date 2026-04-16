# Chatbot Backend API

FastAPI-based backend server for the AI Chatbot application with Google Gemini integration.

## Features

- **FastAPI Framework**: Modern, fast Python web framework
- **Gemini API Integration**: Direct integration with Google's generative AI models
- **CORS Support**: Configured for React frontend communication
- **Error Handling**: Comprehensive error handling and logging
- **Health Check Endpoint**: Monitor backend health
- **Batch Processing**: Handle multiple conversations

## Architecture

```
backend/
├── main.py              # FastAPI application and endpoints
├── gemini_service.py    # Gemini API service layer
├── config.py            # Configuration and settings
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
└── .env.example         # Example environment file
```

## Prerequisites

- Python 3.8+
- pip or conda
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file with your Gemini API key:
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env
   ```

## Running the Server

```bash
python main.py
```

Or with uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation

Once running, access interactive API docs at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and model information.

### Send Message
```
POST /chat
Content-Type: application/json

Body:
{
  "messages": [
    {"role": "user", "content": "Hello!"},
    {"role": "assistant", "content": "Hi there!"},
    {"role": "user", "content": "How are you?"}
  ],
  "conversation_id": "optional_conversation_id"
}

Response:
{
  "reply": "I'm doing well, thank you for asking!",
  "conversation_id": "optional_conversation_id"
}
```

### Batch Processing
```
POST /batch-chat
Content-Type: application/json

Body:
[
  {"messages": [...], "conversation_id": "conv_1"},
  {"messages": [...], "conversation_id": "conv_2"}
]

Response:
[
  {"reply": "...", "conversation_id": "conv_1"},
  {"reply": "...", "conversation_id": "conv_2"}
]
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | API key from Google AI Studio |
| `BACKEND_CORS_ORIGINS` | No | Comma-separated list of allowed origins |

## Configuration

Edit `config.py` to customize:
- CORS allowed origins
- Gemini model selection
- API timeout settings
- Logging levels

## Error Handling

The API returns standard HTTP status codes:
- `200`: Successful request
- `400`: Bad request (missing/invalid parameters)
- `500`: Server error
- `503`: Service unavailable

Error responses include a detail message with more information.

## Logging

Logs are output to console with INFO level by default. Configure in `main.py`:

```python
logging.basicConfig(level=logging.DEBUG)  # For verbose logging
```

## Security Considerations

- ✅ API key stored in `.env` (not in code)
- ✅ `.env` is in `.gitignore`
- ✅ CORS configured for specific origins
- ⚠️ Never commit `.env` file to version control
- ⚠️ Use environment variables in production

## Development

### Adding New Endpoints

1. Add endpoint to `main.py`:
   ```python
   @app.get("/new-endpoint")
   async def new_endpoint():
       return {"status": "success"}
   ```

2. Restart the server with `--reload` flag

### Testing

Create a `test_api.py` file to test endpoints:

```python
import requests

response = requests.post("http://localhost:8000/chat", json={
    "messages": [{"role": "user", "content": "Hello!"}]
})
print(response.json())
```

## Troubleshooting

### API Key Error
```
Error: GEMINI_API_KEY not found
```
- Ensure `.env` file exists with a valid API key
- Check that the key is correctly set: `echo $GEMINI_API_KEY`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
- Verify frontend URL is in `BACKEND_CORS_ORIGINS` in `config.py`
- Restart the backend server

### Connection Refused
```
Connection refused to http://localhost:8000
```
- Ensure backend is running: `python main.py`
- Check that port 8000 is not in use: `lsof -i :8000`

## Deployment

For production deployment:

1. Use a production ASGI server (Gunicorn + Uvicorn)
2. Set `DEBUG=False`
3. Use environment-specific `.env` files
4. Add authentication/API keys
5. Use HTTPS
6. Set appropriate CORS origins
7. Configure logging to files
8. Use process managers (systemd, supervisor, etc.)

Example production command:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 main:app
```

## License

MIT License
