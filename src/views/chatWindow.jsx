import MessageList from "./MessageList";
import InputBox from "./InputBox";

function ChatWindow({ chat, onSend, onModeChange, isLoading }) {
  if (!chat) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "16px", padding: "20px", textAlign: "center" }}>
        Start a new chat or launch a Study Buddy session to begin learning.
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>{chat.title}</strong>
          {chat.isStudyBuddy ? (
            <div style={{ fontSize: "12px", color: "#555" }}>
              Study Buddy mode: {chat.mode === "quiz" ? "Quiz" : "Explain"}
            </div>
          ) : (
            <div style={{ fontSize: "12px", color: "#555" }}>
              Regular chat mode
            </div>
          )}
        </div>
        {chat.isStudyBuddy && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label htmlFor="mode-select" style={{ fontSize: "12px", color: "#333" }}>Switch mode</label>
            <select
              id="mode-select"
              value={chat.mode || "explain"}
              onChange={(e) => onModeChange(e.target.value)}
              style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              <option value="explain">Explain</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
        )}
      </div>

      {chat.isStudyBuddy && (
        <div style={{ padding: "14px 16px", background: chat.mode === "quiz" ? "#fff4e5" : "#e8f4ff", borderLeft: `4px solid ${chat.mode === "quiz" ? "#f39c12" : "#0077cc"}`, color: chat.mode === "quiz" ? "#663c00" : "#0d3f72", fontSize: "14px", fontWeight: 600, margin: "12px 16px", borderRadius: "8px" }}>
          {chat.mode === "quiz"
            ? "Quiz mode is active — I will ask study questions based on your current conversation. Ready when you are!"
            : "Explain mode is active — I will clarify concepts and explain ideas based on your conversation. Ask me what you want to understand next!"}
        </div>
      )}

      <MessageList messages={chat.messages} isLoading={isLoading} />
      <InputBox onSend={onSend} isLoading={isLoading} mode={chat.mode} />
    </div>
  );
}

export default ChatWindow;