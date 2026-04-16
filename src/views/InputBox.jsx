import { useState } from "react";

function InputBox({ onSend, isLoading, mode }) {
  const [input, setInput] = useState("");
  const placeholder = mode === "quiz"
    ? "Ask a study question or answer the quiz..."
    : "Type a topic or question to learn more...";

  return (
    <div style={{ display: "flex", padding: "10px", gap: "10px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && input.trim() && !isLoading) {
            onSend(input);
            setInput("");
          }
        }}
        disabled={isLoading}
        placeholder={placeholder}
        style={{ flex: 1 }}
      />
      <button
        onClick={() => {
          if (input.trim()) {
            onSend(input);
            setInput("");
          }
        }}
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default InputBox;