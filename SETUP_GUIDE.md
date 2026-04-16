# Full-Stack Chatbot Setup Guide

A complete guide to set up and run the AI Chatbot application with React frontend and Python FastAPI backend.

## 📋 Requirements

Before starting, ensure you have:
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/))
- **Gemini API Key** ([Get here](https://makersuite.google.com/app/apikey))
- **Git** (optional, for version control)

## 🔑 Getting Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key
4. Keep it safe - never share it publicly

## 📝 Installation Steps

### Step 1: Setup Backend

#### 1a. Open Terminal in Backend Directory
```bash
cd backend
```

#### 1b. Create Python Virtual Environment
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

If successful, you'll see `(venv)` at the start of your terminal prompt.

#### 1c. Install Python Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- fastapi (web framework)
- uvicorn (server)
- google-genai (Gemini API)
- pydantic (data validation)
- python-dotenv (environment config)
- pydantic (validation)
- python-dotenv (environment config)

#### 1d. Create Backend .env File
```bash
# Create .env file with your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

Replace `your_api_key_here` with your actual Gemini API key.

**Security Tip**: This `.env` file is in `.gitignore` and won't be committed to version control.

#### 1e. Test Backend
```bash
# Start the backend server
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

Visit `http://localhost:8000/docs` in your browser to see the API documentation.

**Keep this terminal running.**

### Step 2: Setup Frontend

#### 2a. Open New Terminal in Root Directory
```bash
# From backend directory, go up one level
cd ..
```

#### 2b. Install Node Dependencies
```bash
npm install
```

This installs React, Vite, and other JavaScript dependencies.

#### 2c. Verify Frontend .env
The `.env` file should already exist with:
```
VITE_BACKEND_URL=http://localhost:8000
```

If not, create it with these contents.

#### 2d. Start Development Server
```bash
npm run dev
```

Expected output:
```
Local:   http://localhost:5173/
```

The server will provide the URL to access the app.

## 🎮 Running the Application

Once both servers are running:

1. **Backend** (Terminal 1): `http://localhost:8000`
   - Running on Python with FastAPI
   - API docs at `http://localhost:8000/docs`

2. **Frontend** (Terminal 2): `http://localhost:5173`
   - Click the link to open in browser
   - Or manually visit the URL

## 💬 First Chat

1. Open the frontend URL in your browser
2. You'll see an empty chat interface
3. Click "+ New Chat" to start a conversation
4. Type a message and click "Send" or press Enter
5. Wait for the loading indicator
6. See the AI response from Gemini!

## 🌐 Available URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React app - chat UI |
| Backend API | http://localhost:8000 | FastAPI server |
| API Docs (Swagger) | http://localhost:8000/docs | Interactive API documentation |
| API Docs (ReDoc) | http://localhost:8000/redoc | Alternative API docs |
| Health Check | http://localhost:8000/health | Backend status |

## 🛑 Stopping the Servers

To stop each server:
- Press `CTRL+C` in the terminal where it's running

## 🔄 Restarting

After restarting:
1. Backend: Same commands as Step 1e
2. Frontend: Same commands as Step 2d

## ⚙️ Changing Ports

### Backend on Different Port
Edit `backend/main.py`, last line:
```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Change 8000 to 8001
```

Then update frontend `.env`:
```
VITE_BACKEND_URL=http://localhost:8001
```

### Frontend on Different Port
After running `npm run dev`, Vite will automatically try the next available port (5174, 5175, etc.)

## 🐛 Troubleshooting

### Error: "Port 8000 already in use"
```bash
# Find what's using port 8000
lsof -i :8000

# Kill the process (macOS/Linux)
kill -9 <PID>

# Or use a different port (see Changing Ports section)
```

### Error: "Cannot find module 'fastapi'"
Make sure you've installed Python dependencies:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Error: "GEMINI_API_KEY not found"
1. Create `.env` in backend directory
2. Add your API key: `GEMINI_API_KEY=your_key_here`
3. Restart backend server

### Error: "No chat responses"
1. Check backend is running: `http://localhost:8000/health`
2. Check browser console (F12) for errors
3. Check backend terminal for error messages
4. Verify API key is valid

### Error: "CORS Policy Error"
1. Backend not running? Start it first
2. Frontend trying different port? Update `.env` with correct backend URL
3. Restart frontend after changing `.env`

### Frontend shows "Select a chat"
1. Click "+ New Chat" button
2. Type a message and send it
3. The message should appear in blue

## ✅ Verification Checklist

- [ ] Node.js installed: `node --version`
- [ ] Python installed: `python --version`
- [ ] API key obtained from Google AI Studio
- [ ] Backend `.env` file created with API key
- [ ] Backend dependencies installed: `pip list`
- [ ] Frontend dependencies installed: `npm list`
- [ ] Backend server running: Terminal 1
- [ ] Frontend server running: Terminal 2
- [ ] Backend API responding: `http://localhost:8000/health`
- [ ] Frontend loads: `http://localhost:5173`
- [ ] Can send and receive messages

## 📚 Next Steps

1. **Build for Production**
   ```bash
   npm run build
   ```
   Creates optimized build in `dist/` folder

2. **Deploy Backend**
   See `backend/README.md` for deployment options

3. **Customize**
   - Change Gemini model in `backend/gemini_service.py`
   - Modify UI in `src/views/` components
   - Add database for message persistence

4. **Add Features**
   - User authentication
   - Message search
   - Export conversations
   - Dark mode
   - Voice input

## 🆘 Getting Help

1. Check the error messages in terminal
2. Review `backend/README.md` for backend-specific help
3. Check main `README.md` for project overview
4. Visit [FastAPI Docs](https://fastapi.tiangolo.com)
5. Visit [Google Generative AI Docs](https://ai.google.dev/gemini-api/docs)

## 🔒 Security Notes

- ✅ Never commit `.env` files to Git
- ❌ Never share your API key publicly
- ✅ Use strong API key quotas on Google Cloud Console
- ✅ In production, use environment secrets management
- ❌ Don't run frontend and backend on 0.0.0.0 in production

---

Enjoy your chatbot! 🚀
