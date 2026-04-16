import { useChatViewModel } from "./viewmodels/useChatViewModel";
import Sidebar from "./views/Sidebar";
import ChatWindow from "./views/ChatWindow";

function App() {
  const vm = useChatViewModel();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        conversations={vm.conversations}
        currentChat={vm.currentChat}
        onSelect={vm.setCurrentChat}
        onNewChat={vm.createChat}
        onDeleteChat={vm.deleteChat}
        onDeleteAll={vm.deleteAllChats}
      />

      <ChatWindow
        chat={vm.currentChat}
        onSend={vm.sendMessage}
        isLoading={vm.isLoading}
      />
    </div>
  );
}

export default App;