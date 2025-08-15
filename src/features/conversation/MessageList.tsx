import React from 'react';
import { Message } from './useConversationState';

interface MessageListProps {
  messages: Message[];
  conversationEndRef: React.RefObject<HTMLDivElement>;
  isLoadingAIResponse: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, conversationEndRef, isLoadingAIResponse }) => {
  return (
    <div className="flex-grow overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] min-h-[150px] sm:min-h-[200px] custom-scrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in`}
        >
          <div
            className={`max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-200 ${
              message.sender === 'user'
                ? 'bg-primary text-text-white rounded-br-md shadow-glow-sm'
                : 'glass-light border border-border-white-10 text-text-white-90 rounded-bl-md'
            }`}
          >
            {message.text && (
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>
            )}
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                alt="Attached"
                className="mt-2 max-w-full rounded-lg"
              />
            )}
            <span
              className={`block text-xs mt-2 ${message.sender === 'user' ? 'text-text-white-70' : 'text-text-white-60'
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}
      
      {/* Loading indicator */}
      {isLoadingAIResponse && (
        <div className="flex justify-start animate-in">
          <div className="glass-light border border-border-white-10 text-text-white-60 px-4 py-3 rounded-2xl rounded-bl-md">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-text-white-40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-text-white-40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-text-white-40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-sm">Agent is thinking</span>
            </div>
          </div>
        </div>
      )}
      <div ref={conversationEndRef} /> {/* Empty div at the end for scrolling */}
    </div>
  );
};

