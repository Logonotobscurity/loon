import React from 'react';
import { MessageList } from '../MessageList';
import { useConversationStore } from '../../../store/conversationStore';

interface MessageRendererProps {
  isLoadingAIResponse: boolean;
  conversationEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({
  isLoadingAIResponse,
  conversationEndRef,
}) => {
  const { messages } = useConversationStore();

  return (
    <div className="message-renderer flex-grow flex flex-col">
      {messages.length === 0 && !isLoadingAIResponse ? (
        <div className="empty-state flex flex-col items-center justify-center flex-grow text-center">
          <div className="empty-icon mb-4">
            <svg
              className="w-16 h-16 text-text-white-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-white mb-2">
            Start a conversation
          </h3>
          <p className="text-text-white-60 text-sm max-w-xs">
            Ask anything about business intelligence, market analysis, or get help with your data strategy.
          </p>
        </div>
      ) : (
        <MessageList
          messages={messages}
          conversationEndRef={conversationEndRef}
          isLoadingAIResponse={isLoadingAIResponse}
        />
      )}
    </div>
  );
};