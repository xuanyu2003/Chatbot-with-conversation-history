import ReactMarkdown from "react-markdown";

function MessageList({ messages, isLoading }) {
  return (
    <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", marginBottom: "10px" }}>
          <div style={{ 
            display: "inline-block", 
            padding: "10px", 
            background: msg.role === "user" ? "#007bff" : "#eee",
            color: msg.role === "user" ? "white" : "black",
            borderRadius: "8px",
            maxWidth: "80%"
          }}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      {isLoading && (
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <div style={{ 
            display: "inline-block", 
            padding: "10px", 
            background: "#eee",
            borderRadius: "8px"
          }}>
            <span>Thinking</span>
            <span style={{ animation: "blink 1.4s infinite" }}>...</span>
          </div>
        </div>
      )}
      <style>{`
        @keyframes blink {
          0%, 20%, 50%, 80%, 100% { opacity: 1; }
          40% { opacity: 0.5; }
          60% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default MessageList;