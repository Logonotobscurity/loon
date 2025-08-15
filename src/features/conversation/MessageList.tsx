import React from 'react';
import { Message } from './useConversationState'; // Import the Message type

interface MessageListProps {
  messages: Message[];
  conversationEndRef: React.RefObject<HTMLDivElement>;
  isLoadingAIResponse: boolean; // Assuming you want to pass this down for the loading indicator
}

const MessageList: React.FC<MessageListProps> = ({ messages, conversationEndRef, isLoadingAIResponse }) => {
  return (
    <div className="flex-grow overflow-y-auto p-2.5 flex flex-col gap-2.5 max-h-[300px]">
      {messages.map(message => (
        <div key={message.id} className={`message-bubble ${message.sender}`}>
        <div key={message.id} className={`max-w-[80%] py-2 px-3 rounded-xl relative break-words ${message.sender}`}>
          {message.text && <p>{message.text}</p>}
          {message.imageUrl && <img src={message.imageUrl} alt="attached" />}
          <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
      {/* Loading indicator */}
      {isLoadingAIResponse && (
        <div className="message-bubble ai loading">
          <div className="loading-indicator-animation">AI is thinking...</div> {/* Replace with a loading animation */}
        </div>
      )}
      <div ref={conversationEndRef} /> {/* Empty div at the end for scrolling */}
    </div>
  );
};

export default MessageList;