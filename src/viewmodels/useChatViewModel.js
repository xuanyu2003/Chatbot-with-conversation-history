import { useState, useEffect } from "react";
import { sendMessageApi } from "../models/chatModel";

export function useChatViewModel() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      const convs = JSON.parse(savedConversations);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConversations(convs);
      if (convs.length > 0) {
        setCurrentChat(convs[0]);
      }
    }

    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("deviceId", id);
    }
  }, []);

  const saveConversations = (convs) => {
    localStorage.setItem("conversations", JSON.stringify(convs));
  };

  const createChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };
    const updated = [newChat, ...conversations];
    setConversations(updated);
    setCurrentChat(newChat);
    saveConversations(updated);
  };

  const sendMessage = async (text) => {
    if (!currentChat) return;

    setIsLoading(true);
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...currentChat.messages, userMsg];

    const updatedChat = { ...currentChat, messages: updatedMessages };
    if (currentChat.messages.length === 0) {
      updatedChat.title = text.slice(0, 30) + (text.length > 30 ? "..." : "");
    }
    setCurrentChat(updatedChat);

    const data = await sendMessageApi({ messages: updatedMessages });

    const aiMsg = {
      role: "assistant",
      content: data.reply
    };

    const finalMessages = [...updatedMessages, aiMsg];
    const finalChat = { ...updatedChat, messages: finalMessages };
    setCurrentChat(finalChat);

    // Update conversations
    const updatedConversations = conversations.map(c => c.id === currentChat.id ? finalChat : c);
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    setIsLoading(false);
  };

  const deleteChat = (chatId) => {
    const updated = conversations.filter(c => c.id !== chatId);
    setConversations(updated);
    saveConversations(updated);
    
    // If deleted chat was the current one, switch to first remaining or null
    if (currentChat?.id === chatId) {
      setCurrentChat(updated.length > 0 ? updated[0] : null);
    }
  };

  const deleteAllChats = () => {
    if (window.confirm("Are you sure you want to delete all chats? This cannot be undone.")) {
      setConversations([]);
      setCurrentChat(null);
      saveConversations([]);
    }
  };

  return {
    conversations,
    currentChat,
    createChat,
    setCurrentChat,
    sendMessage,
    deleteChat,
    deleteAllChats,
    isLoading
  };
}