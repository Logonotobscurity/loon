import React from 'react';
import { MicrophoneState } from './useMicrophoneState';
import { IconButton } from '../../components/Global/IconButton';

interface DesktopInputAreaProps {
  microphoneState: MicrophoneState;
  onMicrophoneClick: () => void;
  onAttachImageClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingAIResponse: boolean;
  getMicrophoneIcon: () => string;
  inputText: string;
  transcript: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

export const DesktopInputArea: React.FC<DesktopInputAreaProps> = ({
  microphoneState,
  onMicrophoneClick,
  onAttachImageClick,
  fileInputRef,
  onFileChange,
  isLoadingAIResponse,
  getMicrophoneIcon,
  inputText,
  transcript,
  onInputChange,
  onSendMessage,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };

  const hasContent = (inputText || transcript).trim().length > 0;

  return (
    <div className="relative flex items-center gap-3 px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-2xl transition-all duration-300 hover:bg-bg-white-10 focus-within:border-primary focus-within:shadow-glow">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />
      
      {/* Attach button */}
      <IconButton
        className="p-2 text-text-white-60 hover:text-primary hover:bg-bg-white-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        onClick={onAttachImageClick}
        disabled={isLoadingAIResponse}
        aria-label="Attach image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </IconButton>
      
      {/* Input field */}
      <input
        type="text"
        placeholder="Ask me anything about business strategy, automation, or share your ideas..."
        className="flex-grow bg-transparent text-text-white placeholder:text-text-white-40 font-inter text-base outline-none transition-colors duration-200"
        value={inputText || transcript}
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        disabled={isLoadingAIResponse}
      />
      
      {/* Action buttons container */}
      <div className="flex items-center gap-2">
        {/* Microphone button */}
        <IconButton
          className={`p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            microphoneState === 'listening' 
              ? 'text-primary bg-primary/10 animate-pulse' 
              : microphoneState === 'processing'
              ? 'text-accent-orange bg-accent-orange/10 animate-spin'
              : microphoneState === 'success'
              ? 'text-green-500 bg-green-500/10'
              : 'text-text-white-60 hover:text-primary hover:bg-bg-white-10'
          }`}
          onClick={onMicrophoneClick}
          disabled={isLoadingAIResponse}
          aria-label={microphoneState === 'listening' ? 'Stop recording' : 'Start recording'}
        >
          {microphoneState === 'processing' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </IconButton>
        
        {/* Send button - only show when there's content */}
        {hasContent && (
          <IconButton
            className="p-2 text-text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            onClick={onSendMessage}
            disabled={isLoadingAIResponse}
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </IconButton>
        )}
      </div>
    </div>
  );
};
