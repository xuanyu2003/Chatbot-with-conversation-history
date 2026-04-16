# AI Chatbot Web App with Conversation History

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
