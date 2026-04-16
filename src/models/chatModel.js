export async function sendMessageApi({ messages }) {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    
    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to get response from chatbot");
    }

    const data = await response.json();
    return { reply: data.reply };
  } catch (error) {
    console.error("Chat API Error:", error);
    return { reply: "Sorry, I encountered an error. Please try again." };
  }
}