import React, { useState, useEffect } from 'react'; // Import useEffect
import './conversation.css'; // Import the CSS file

// Import the GoogleGenerativeAI class (will be used later for API integration)
import { GoogleGenerativeAI } from "@google/generative-ai";

const ConversationDialogue: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Example breakpoint

  // Basic state for input
  const [inputText, setInputText] = useState('');

  // Handle window resize to determine mobile/desktop view
  useEffect(() => { // Use useEffect here
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Example breakpoint
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle text input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Handle sending message (text or voice)
  const handleSendMessage = () => {
    if (inputText.trim()) {
      console.log("Sending message:", inputText);
      // TODO: Implement sending message to Gemini API
      setInputText(''); // Clear input after sending
    }
  };

  // Handle microphone button click
  const handleMicrophoneClick = () => {
    console.log("Microphone clicked");
    // TODO: Implement voice input logic using useMicrophoneState hook
  };

  // Handle image attachment (placeholder)
  const handleAttachImage = () => {
    console.log("Attach image clicked");
    // TODO: Implement image attachment logic
  };

  return (
    <div className={`conversation-dialogue ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Component content will go here */}
      {/* You'll add the conversation display area here later */}

      {isMobile ? (
        // Mobile Microphone Button Area
        <div className="mobile-input-area">
          <button className="mobile-microphone-button" onClick={handleMicrophoneClick}>
            {/* Large microphone icon will go here */}
            🎙️
          </button>
          {/* TODO: Add image attachment icon for mobile if needed */}
        </div>
      ) : (
        // Desktop Input Area
        <div className="desktop-input-area">
          <input
            type="text"
            placeholder="Type your message or click the mic to speak..."
            className="message-input"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
           {/* TODO: Add image attachment icon for desktop */}
          <button className="microphone-button" onClick={handleMicrophoneClick}>
            {/* Microphone icon will go here */}
            🎤
          </button>
        </div>
      )}

    </div>
  );
};

export default ConversationDialogue;
