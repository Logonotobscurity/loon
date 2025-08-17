import React from 'react';
import { Message } from '../../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageListProps {
  messages: Message[];
  conversationEndRef: React.RefObject<HTMLDivElement>;
  isLoadingAIResponse: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, conversationEndRef, isLoadingAIResponse }) => {
  // Hide the message area entirely until there is content or loading
  if (messages.length === 0 && !isLoadingAIResponse) {
    return null;
  }
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
              message.sender === 'ai' ? (
                <div className="markdown-content text-sm md:text-base leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h3: ({ children }) => <h3 className="font-bold text-base mt-4 mb-2 text-text-white">{children}</h3>,
                      ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="text-text-white-90">{children}</li>,
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-3">
                          <table className="min-w-full border border-border-white-10 rounded-lg">{children}</table>
                        </div>
                      ),
                      thead: ({ children }) => <thead className="bg-bg-white-5 border-b border-border-white-10">{children}</thead>,
                      th: ({ children }) => <th className="px-4 py-2 text-left text-sm font-medium text-text-white">{children}</th>,
                      td: ({ children }) => <td className="px-4 py-2 text-sm text-text-white-90 border-t border-border-white-5">{children}</td>,
                      code: ({ inline, children }: { inline?: boolean; children: React.ReactNode }) => 
                        inline ? (
                          <code className="px-1.5 py-0.5 bg-bg-white-10 text-primary rounded text-sm">{children}</code>
                        ) : (
                          <pre className="my-3 p-4 bg-bg-dark-90 border border-border-white-10 rounded-lg overflow-x-auto">
                            <code className="text-sm text-text-white-90">{children}</code>
                          </pre>
                        ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 my-3 text-text-white-80 italic">
                          {children}
                        </blockquote>
                      ),
                      details: ({ children }) => (
                        <details className="my-3 p-3 bg-bg-white-5 border border-border-white-10 rounded-lg">
                          {children}
                        </details>
                      ),
                      summary: ({ children }) => (
                        <summary className="cursor-pointer font-medium text-text-white hover:text-primary transition-colors">
                          {children}
                        </summary>
                      ),
                      p: ({ children }) => <p className="my-2">{children}</p>,
                      a: ({ children, href }) => (
                        <a href={href} className="text-primary hover:text-primary-light underline transition-colors" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
              )
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
              <span className="text-sm">Analyzing...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={conversationEndRef} /> {/* Empty div at the end for scrolling */}
    </div>
  );
};

