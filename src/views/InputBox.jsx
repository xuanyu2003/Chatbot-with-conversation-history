import { useState } from "react";

function InputBox({ onSend, isLoading }) {
  const [input, setInput] = useState("");

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
        placeholder="Type a message..."
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