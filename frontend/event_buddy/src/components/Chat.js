import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'; // Import the CSS file

const socket = io('http://localhost:5000'); // WebSocket backend URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up when the component unmounts
    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message); // Send message via socket
      setMessages((prevMessages) => [...prevMessages, message]); // Update local state
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>EventBuddy Chat</h3>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Send message on Enter key
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
