import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Get backend URL from environment or default to localhost:5000
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: userMessage
      });

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.message,
        sender: 'ai',
        timestamp: response.data.timestamp
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message === 'Network Error') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running.';
      }

      // Add error message to chat
      const errorMsg = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'error',
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="app">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <h1>ChargeNet AI Chat</h1>
          <p>Powered by Google Gemini</p>
          {messages.length > 0 && (
            <button className="clear-button" onClick={handleClearChat}>
              Clear Chat
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>👋 Welcome to ChargeNet AI Chat!</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'user' ? 'user-message' : msg.sender === 'error' ? 'error-message' : 'ai-message'}`}
              >
                <div className="message-header">
                  <span className="message-sender">
                    {msg.sender === 'user' ? '👤 You' : msg.sender === 'error' ? '⚠️ Error' : '🤖 AI'}
                  </span>
                  <span className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message ai-message loading">
              <div className="message-header">
                <span className="message-sender">🤖 AI</span>
              </div>
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form className="input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="message-input"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="send-button"
          >
            {isLoading ? '⏳' : '📤'} Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
