import React, { RefObject } from 'react';
import { MicrophoneState } from './useMicrophoneState';
import { IconButton } from '../../components/Global/IconButton';

interface MobileInputAreaProps {
  microphoneState: MicrophoneState;
  onMicrophoneClick: () => void;
  onAttachImageClick: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingAIResponse: boolean;
  getMicrophoneIcon: () => string;
}

export const MobileInputArea: React.FC<MobileInputAreaProps> = ({
  microphoneState,
  onMicrophoneClick,
  onAttachImageClick,
  fileInputRef,
  onFileChange,
  isLoadingAIResponse,
  getMicrophoneIcon,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-2xl backdrop-blur-xl">
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
        className="p-3 text-text-white-60 hover:text-primary hover:bg-bg-white-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        onClick={onAttachImageClick}
        disabled={isLoadingAIResponse}
        aria-label="Attach image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </IconButton>
      
      {/* Microphone button - larger on mobile */}
      <button
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          microphoneState === 'listening' 
            ? 'bg-primary text-text-white shadow-glow animate-pulse' 
            : microphoneState === 'processing'
            ? 'bg-accent-orange text-text-white animate-spin'
            : microphoneState === 'success'
            ? 'bg-green-500 text-text-white'
            : 'bg-primary hover:bg-primary-hover text-text-white'
        }`}
        onClick={onMicrophoneClick}
        disabled={isLoadingAIResponse}
        aria-label={microphoneState === 'listening' ? 'Stop recording' : 'Start recording'}
      >
        {microphoneState === 'processing' ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : microphoneState === 'success' ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
        
        {/* Ripple effect for listening state */}
        {microphoneState === 'listening' && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" style={{ animationDelay: '0.1s' }}></span>
          </>
        )}
      </button>
    </div>
  );
};
