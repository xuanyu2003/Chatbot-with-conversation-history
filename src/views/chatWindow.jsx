import MessageList from "./MessageList";
import InputBox from "./InputBox";

function ChatWindow({ chat, onSend, isLoading }) {
  if (!chat) return <div style={{ flex: 1 }}>Select a chat</div>;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MessageList messages={chat.messages} isLoading={isLoading} />
      <InputBox onSend={onSend} isLoading={isLoading} />
    </div>
  );
}

export default ChatWindow;