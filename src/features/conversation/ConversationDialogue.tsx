import React, { useState, useEffect, useRef, useCallback } from 'react';
import './conversation.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2, Maximize2, X } from 'lucide-react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { MessageRenderer } from './components/MessageRenderer';
import { InputSection } from './components/InputSection';
import { useConversationStore } from '../../store/conversationStore';
import { useConversation } from './hooks/useConversation';
import { Message } from '../../types';

interface ConversationDialogueProps {
  startInHero?: boolean;
  className?: string;
}

const ConversationDialogue: React.FC<ConversationDialogueProps> = ({ 
  startInHero = false,
  className = '' 
}) => {

  const [isExpanded, setIsExpanded] = useState(startInHero);
  const [showChat, setShowChat] = useState(true);
  
  const {
    inputText,
    attachedImage,
    isLoading: isLoadingAIResponse,
    error,
    isListening,
    setInputText,
    setAttachedImage,
    clearImage,
    sendMessage,
    clearError,
    startListening,
    stopListening,
    fileInputRef,
  } = useConversation({
    onError: (err) => {}, // Handled by useConversation internally
    onSuccess: () => {}, // Handled by useConversation internally
  });

  const { messages, clearConversation } = useConversationStore();
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const conversationDialogueRef = useRef<HTMLDivElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const ERROR_DISPLAY_DURATION = 5000;

  // Handle sending message
  const handleSendMessage = useCallback(async () => {
    await sendMessage();
  }, [sendMessage]);



  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const imageFile = Array.from(files).find(file => file.type.startsWith('image/'));
      if (imageFile) {
        setAttachedImage(imageFile);

      } else {
        console.error('Only image files are allowed.');
        // The error will be handled by the useConversation hook's error state
      }
    }
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };



  // Mobile-first responsive container styles
  const getContainerStyles = () => {
    if (!showChat) return 'hidden';
    
    if (startInHero) {
      return `relative w-full max-w-4xl mx-auto ${className}`;
    }
    
    return `fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 z-[9999] 
      w-full md:w-[440px] lg:w-[600px] 
      h-[60vh] md:h-[550px] lg:h-[700px]
      rounded-t-3xl md:rounded-3xl
      transition-all duration-300`;
  };



  return (
    <ErrorBoundary>
      <AnimatePresence>
        <motion.div
          ref={conversationDialogueRef}
          initial={startInHero ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`${getContainerStyles()} bg-bg-dark-95 backdrop-blur-2xl border border-border-white-10 ${
            startInHero ? 'rounded-2xl' : 'rounded-3xl'
          } shadow-glass hover:border-border-white-20 ${isDraggingOver ? 'border-primary shadow-glow' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border-white-5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-satoshi font-medium text-text-white">Business Intelligent Agent</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => clearConversation()}
                className="px-2 py-1 text-xs border border-border-white-10 rounded-lg text-text-white-60 hover:text-text-white hover:border-border-white-20 transition-colors"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                Clear
              </button>
              {!startInHero && (
                <>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 hover:bg-bg-white-10 rounded-lg transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <Minimize2 className="w-4 h-4 text-text-white-60" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-text-white-60" />
                    )}
                  </button>

                  <button
                    onClick={() => setShowChat(false)}
                    className="p-1.5 hover:bg-bg-white-10 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-text-white-60" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <MessageRenderer
            isLoadingAIResponse={isLoadingAIResponse}
            conversationEndRef={conversationEndRef}
          />

          {/* Error Message */}
          {error && (
            <div className="mx-4 mb-3 px-3 py-2 bg-accent-red/10 border border-accent-red/20 rounded-lg 
              text-accent-red text-sm cursor-pointer transition-opacity duration-200 hover:opacity-80"
              onClick={clearError}
            >
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {attachedImage && (
            <div className="mx-4 mb-3 relative">
              <div className="relative p-2 bg-bg-white-5 border border-border-white-10 rounded-lg">
                <img 
                  src={URL.createObjectURL(attachedImage)} 
                  alt="Attached preview" 
                  className="max-h-32 max-w-full rounded object-contain mx-auto"
                />
                <button 
                  className="absolute top-1 right-1 w-6 h-6 bg-bg-dark-90 hover:bg-accent-red 
                    text-text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  onClick={() => setAttachedImage(null)}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border-white-5">
            <InputSection
            inputText={inputText}
            attachedImage={attachedImage}
            isLoadingAIResponse={isLoadingAIResponse}
            isListening={isListening}
            onInputChange={setInputText}
            onImageChange={setAttachedImage}
            onImageRemove={() => setAttachedImage(null)}
            onSendMessage={handleSendMessage}
            onMicrophoneClick={startListening}
            fileInputRef={fileInputRef}
          />
          </div>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default ConversationDialogue;
