import { useState } from "react";

function Sidebar({ conversations, currentChat, onSelect, onNewChat, onNewStudyBuddy, onDeleteChat, onDeleteAll }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: "10px", display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
        <button onClick={onNewChat} style={{ flex: 1 }}>
          + New Chat
        </button>
        <button onClick={onNewStudyBuddy} style={{ flex: 1, background: "#4f8cff", color: "white", border: "none", borderRadius: "4px" }}>
          Study Buddy
        </button>
        {conversations.length > 0 && (
          <button 
            onClick={onDeleteAll}
            style={{ background: "#ff6b6b", color: "white", cursor: "pointer", padding: "5px 10px", border: "none", borderRadius: "4px" }}
            title="Delete all conversations"
          >
            🗑️
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {conversations.length === 0 ? (
          <div style={{ color: "#999", fontSize: "14px", textAlign: "center", marginTop: "20px" }}>
            No conversations yet
          </div>
        ) : (
          conversations.map((chat) => (
            <div
              key={chat.id}
              onMouseEnter={() => setHoveredId(chat.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: "10px",
                marginBottom: "5px",
                background: currentChat?.id === chat.id ? "#e3f2fd" : "#f5f5f5",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.2s"
              }}
              onClick={() => onSelect(chat)}
            >
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {chat.title}
              </span>
              {hoveredId === chat.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ff6b6b",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "0 5px"
                  }}
                  title="Delete this chat"
                >
                  ✕
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;