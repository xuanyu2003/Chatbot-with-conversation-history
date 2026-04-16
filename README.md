# AI Chatbot Web App

## Project Description

This is a simple AI-powered chatbot web application that allows users to have conversations with Google's Gemini AI models. Users can create multiple chat sessions, switch between them, and maintain conversation history. The app includes a "Study Buddy" mode with two interaction styles: "Explain" mode for detailed explanations and "Quiz" mode for interactive learning through questions.

The app works like a chat interface (similar to ChatGPT) but with the ability to manage multiple conversations and specialized modes for educational purposes.

## Architecture Overview

The application follows a client-server architecture with clear separation between frontend and backend:

**Frontend (React) → Backend (FastAPI) → LLM Provider (Google Gemini API)**

### Data Flow
```
User Browser
    ↓ (HTTP POST)
React Frontend (localhost:5173)
    ↓ (REST API)
FastAPI Backend (localhost:8000)
    ↓ (API Call)
Google Gemini API
    ↓ (Response)
FastAPI Backend
    ↓ (JSON Response)
React Frontend
    ↓ (UI Update)
User Browser
```

### Architecture Diagram
```
┌─────────────────┐    HTTP POST /chat    ┌─────────────────┐    API Call    ┌─────────────────┐
│   React App     │ ────────────────────► │   FastAPI App   │ ─────────────► │  Gemini API     │
│   (Frontend)    │                      │   (Backend)     │                │  (LLM Provider) │
│                 │ ◄──────────────────── │                 │ ◄───────────── │                 │
│ - Chat UI       │    JSON Response      │ - REST API      │   JSON Response │ - AI Models     │
│ - State Mgmt    │                       │ - Validation    │                │ - Text Gen      │
│ - Local Storage │                       └─────────────────┘                └─────────────────┘
└─────────────────┘
```

## Technical Choices

### Frontend
- **React 19**: Modern React with hooks for component state management and lifecycle
- **Vite**: Fast build tool and development server, chosen for its speed and modern ES modules support
- **Local Storage**: Browser-based persistence for conversation history (simple, no server required)

### Backend
- **FastAPI**: Python web framework chosen for its automatic API documentation, async support, and type validation with Pydantic
- **Google Generative AI (genai) library**: Official Google library for Gemini API integration, provides reliable SDK methods
- **Uvicorn**: ASGI server for running FastAPI applications, standard choice for production deployment

### Why These Choices?
- **No LangGraph or complex frameworks**: The app doesn't need multi-step reasoning, conditional routing, or tool calling - direct API calls suffice for simple chat
- **No RAG (Retrieval-Augmented Generation)**: Conversations don't require external knowledge retrieval; Gemini's built-in knowledge is adequate
- **Local storage over database**: Keeps the app simple and self-contained for demonstration purposes
- **REST API over WebSockets**: Simple request-response pattern fits the chat use case without added complexity

## Setup and Running Instructions

### Prerequisites
- Node.js 16 or higher
- Python 3.8 or higher
- A Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd chatbot
```

### Step 2: Set Up Frontend
```bash
# Install dependencies
npm install

# Create environment file (optional, defaults to localhost:8000)
echo "VITE_BACKEND_URL=http://localhost:8000" > .env
```

### Step 3: Set Up Backend
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create environment file with your API key
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env
```

### Step 4: Start the Backend
```bash
# From backend directory with virtual environment activated
python main.py
```
The backend will start on http://localhost:8000

### Step 5: Start the Frontend
```bash
# From root directory (new terminal)
npm run dev
```
The frontend will start on http://localhost:5173

### Step 6: Use the App
Open http://localhost:5173 in your browser and start chatting!

## Known Limitations

### Production Readiness Issues
- **No user authentication**: Anyone can access the app; no user accounts or session management
- **No rate limiting**: Backend has no protection against abuse or API quota exhaustion
- **No data persistence beyond localStorage**: Conversations are lost if browser data is cleared
- **No error monitoring/logging**: Limited error tracking for debugging issues in production
- **Hardcoded CORS origins**: Only allows specific localhost ports; needs configuration for production domains

### Technical Limitations
- **Single LLM provider**: Only supports Google Gemini; no fallback to other providers
- **No conversation search**: Can't search through message history
- **No message editing/deletion**: Once sent, messages can't be modified
- **No file uploads**: Can't process images, documents, or other media
- **No streaming responses**: AI responses appear all at once, not word-by-word
- **Browser-only storage**: No server-side backup; conversations don't sync across devices

### Scalability Concerns
- **No database**: Conversation history stored client-side only limits scalability
- **No caching**: Every request goes to Gemini API; no response caching for repeated queries
- **No load balancing**: Single backend instance; can't handle multiple concurrent users well

### Security Considerations
- **API key exposure risk**: Backend .env file could be compromised if server is breached
- **No input sanitization**: User messages aren't validated beyond basic structure checks
- **No HTTPS enforcement**: Development setup uses HTTP only

## AI Tools Used

- **GitHub Copilot**: Used extensively for writing this README, analyzing the existing codebase structure, and providing technical explanations. Also helped with initial code exploration and understanding the project architecture.
- **Claude (Anthropic)**: Assisted with debugging API integration issues and suggesting improvements to error handling in the Gemini service layer.# AI Chatbot Web App with Conversation History

A full-stack chatbot application with a React frontend and Python backend, powered by Google's Gemini API. Features conversation history, multiple chat sessions, and MVVM architecture.

## 🎯 Project Overview

This project demonstrates building a complete web application with:
- **Frontend**: React 19 with MVVM architecture
- **Backend**: Python FastAPI with Gemini LLM integration
- **Architecture**: Clean separation of concerns with Model-View-ViewModel pattern
- **Features**: Multiple conversations, persistent storage, real-time responses

## 📋 Tech Stack

### Frontend
- React 19.2.4
- Vite (build tool)
- React Markdown (for formatted responses)
- Local Storage (for persistence)

### Backend
- FastAPI (Python web framework)
- Google Generative AI (Gemini API)
- Uvicorn (ASGI server)
- Pydantic (data validation)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

#### 1. Clone and Install Frontend
```bash
cd /path/to/chatbot

# Install frontend dependencies
npm install
```

#### 2. Setup Backend
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

#### 3. Configure Frontend
Update `.env` in the root directory if needed:
```
VITE_BACKEND_URL=http://localhost:8000
```

### Running the Application

#### Terminal 1: Start the Backend
```bash
cd backend
source venv/bin/activate  # Or use your Python environment
python main.py
```
Backend will be running at `http://localhost:8000`

#### Terminal 2: Start the Frontend
```bash
npm run dev
```
Frontend will be running at `http://localhost:5173` (or next available port)

### Open in Browser
Navigate to `http://localhost:5173` and start chatting!

## 📁 Project Structure

```
chatbot/
├── frontend (React app)
│   ├── src/
│   │   ├── models/
│   │   │   └── chatModel.js              # API communication
│   │   ├── viewmodels/
│   │   │   └── useChatViewModel.js       # State & business logic
│   │   ├── views/
│   │   │   ├── ChatWindow.jsx            # Main chat interface
│   │   │   ├── MessageList.jsx           # Displays messages
│   │   │   ├── InputBox.jsx              # Message input
│   │   │   └── Sidebar.jsx               # Chat sessions
│   │   ├── App.jsx                       # Main component
│   │   └── main.jsx                      # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── .env                              # Frontend config
│   └── README.md
│
├── backend/ (Python API)
│   ├── main.py                           # FastAPI app & endpoints
│   ├── gemini_service.py                 # Gemini API integration
│   ├── config.py                         # Configuration
│   ├── requirements.txt                  # Python dependencies
│   ├── .env                              # Backend config (API key)
│   └── README.md                         # Backend documentation
│
├── .env                                  # Frontend environment
├── .gitignore
├── README.md                             # This file
└── package.json
```

## 🏗️ Architecture

### MVVM Pattern (Frontend)

```
View Layer (React Components)
  ↓
ViewModel (useChatViewModel hook)
  ↓
Model (chatModel.js - REST API calls)
  ↓
Backend API (FastAPI)
  ↓
LLM Service (Gemini API)
```

### Data Flow

1. **User Types Message** → InputBox component
2. **sendMessage Called** → ViewModel processes message
3. **API Call** → Model sends to backend
4. **Backend Processing** → Gemini API call with conversation history
5. **Response Returned** → ViewModel updates state
6. **UI Updates** → React re-renders with new message

## 🎮 Features

### Frontend Features
- ✅ Create multiple chat sessions
- ✅ Switch between conversations
- ✅ Real-time message display
- ✅ Loading indicators
- ✅ Conversation history persistence (localStorage)
- ✅ Markdown support for AI responses
- ✅ Enter key to send messages
- ✅ Auto-generated chat titles

### Backend Features
- ✅ FastAPI with automatic Swagger docs
- ✅ Gemini API integration with conversation context
- ✅ CORS support for frontend
- ✅ Error handling and logging
- ✅ Health check endpoint
- ✅ Batch processing support
- ✅ Input validation with Pydantic

## 💬 API Documentation

### Frontend → Backend Communication

**POST /chat**
```json
{
  "messages": [
    {"role": "user", "content": "What is Python?"},
    {"role": "assistant", "content": "Python is..."},
    {"role": "user", "content": "How is it different from JavaScript?"}
  ]
}
```

**Response**
```json
{
  "reply": "The main differences are...",
  "conversation_id": "optional_id"
}
```

For complete API documentation, see [backend/README.md](backend/README.md)

## 🔐 Security

- ✅ API keys stored in `.env` (not in code)
- ✅ `.env` files in `.gitignore`
- ✅ CORS configured for specific origins
- ✅ No sensitive data in frontend
- ⚠️ Never commit `.env` files to version control

## 🧪 Testing

### Frontend
```bash
npm run lint
```

### Backend
```bash
cd backend
pytest  # If pytest installed
```

Or manually test endpoints:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## 📊 Conversation Flow Example

```
User: "Tell me a joke"
  ↓
React State: ["user message added", "loading..."]
  ↓
API Call to Backend
  ↓
Backend: Calls Gemini with history
  ↓
Gemini Response: "Why did the chicken cross the road..."
  ↓
Backend Returns: {"reply": "Why did..."}
  ↓
React State: ["user message", "ai response"]
  ↓
Browser Display: User and AI messages
```

## 🛠️ Development

### Adding New Features

1. **Backend Endpoint**: Add to `backend/main.py`
2. **Service**: Update `backend/gemini_service.py` if needed
3. **Frontend Model**: Update `src/models/chatModel.js`
4. **ViewModel**: Update `src/viewmodels/useChatViewModel.js`
5. **UI Component**: Update relevant view component

### Common Tasks

**Change Gemini Model**
- Edit `backend/gemini_service.py`: Change `model_name` parameter
- Supported models: gemini-1.5-flash, gemini-1.5-pro, gemini-2.0-flash

**Modify UI Theme**
- Edit inline styles in `src/views/` components
- Or create `src/App.css` for global styles

**Add Persistent Backend Storage**
- Add database to `backend/main.py`
- Store conversations instead of just in localStorage

## 📝 Environment Variables

### Frontend (`.env`)
```
VITE_BACKEND_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```
GEMINI_API_KEY=your_api_key_here
```

## 🚨 Troubleshooting

### "Cannot reach backend"
- Start backend: `cd backend && python main.py`
- Check firewall allows port 8000
- Verify `VITE_BACKEND_URL` in frontend `.env`

### "CORS error"
- Backend not running? Start it
- Wrong port? Update `.env`
- Check backend logs for CORS issues

### "Gemini API errors"
- Verify API key in `backend/.env`
- Check API quota at Google AI Studio
- Review backend logs for detailed errors

### "Messages not saving"
- Check browser's localStorage is enabled
- Check browser console for JavaScript errors
- Verify localStorage quota

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Google Generative AI Docs](https://ai.google.dev/gemini-api/docs)
- [MVVM Pattern Explanation](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

## 🎓 Key Concepts Demonstrated

1. **Frontend Architecture**: MVVM pattern with React hooks
2. **State Management**: Local state with React hooks
3. **API Integration**: Fetch API with error handling
4. **Backend Development**: FastAPI with async/await
5. **AI Integration**: Using Gemini API with conversation context
6. **Full-Stack JavaScript/Python**: Building across languages
7. **Data Persistence**: localStorage for client-side caching
8. **CORS & Security**: Proper API configuration
9. **Real-time UX**: Loading states and user feedback
10. **Error Handling**: Graceful error management

## 📄 License

MIT License - feel free to use this project for learning and development

## 🤝 Contributing

This is a learning project. Feel free to fork and customize it for your needs!

### Possible Enhancements
- User authentication
- Database backend storage
- Message search
- Export conversations
- Multiple AI models selection
- Voice input/output
- Dark mode theme
- Conversation sharing
- Rate limiting
- Analytics dashboard
