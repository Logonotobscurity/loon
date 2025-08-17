import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { VoiceHandler } from './VoiceHandler';
import { ImageHandler } from './ImageHandler';
import { MobileInputArea } from '../MobileInputArea';
import { DesktopInputArea } from '../DesktopInputArea';

interface InputSectionProps {
  inputText: string;
  attachedImage: File | null;
  isLoadingAIResponse: boolean;
  isListening: boolean;
  onInputChange: (text: string) => void;
  onImageChange: (image: File | null) => void;
  onImageRemove: () => void;
  onSendMessage: () => void;
  onMicrophoneClick: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  attachedImage,
  isLoadingAIResponse,
  isMobile,
  isListening,
  onInputChange,
  onImageChange,
  onImageRemove,
  onSendMessage,
  onMicrophoneClick,
  fileInputRef,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoadingAIResponse) {
      event.preventDefault();
      onSendMessage();
    }
  };

  const handleSendClick = () => {
    if (!isLoadingAIResponse) {
      onSendMessage();
    }
  };

  const handleImageAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    }
  };

  return (
    <div className="input-section">
      {/* Unified responsive input area */}
      <div className="flex flex-col gap-2">
        <textarea
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything about your business..."
          className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg text-text-white placeholder-text-white-40 focus:outline-none focus:border-primary resize-none"
          rows={3}
          disabled={isLoadingAIResponse}
        />
        
        {attachedImage && (
          <div className="relative p-2 bg-bg-white-5 border border-border-white-10 rounded-lg">
            <img 
              src={URL.createObjectURL(attachedImage)} 
              alt="Attached preview" 
              className="max-h-20 max-w-full rounded object-contain mx-auto"
            />
            <button 
              className="absolute top-1 right-1 w-5 h-5 bg-bg-dark-90 hover:bg-accent-red text-text-white rounded-full flex items-center justify-center transition-colors duration-200"
              onClick={onImageRemove}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="input-controls flex items-center justify-between mt-3 space-x-2">
        <button
          onClick={onMicrophoneClick}
          className={`microphone-btn p-2 rounded-full transition-colors ${
            isListening 
              ? 'bg-accent-red text-text-white' 
              : 'bg-bg-white-10 text-text-white-60 hover:bg-bg-white-20'
          }`}
          aria-label={isListening ? 'Stop recording' : 'Start voice input'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageAttach}
          accept="image/*"
          className="hidden"
          aria-label="Attach image"
        />
        
        <button
          onClick={() => fileInputRef?.current?.click()}
          className="image-btn p-2 rounded-full bg-bg-white-10 text-text-white-60 hover:bg-bg-white-20 transition-colors"
          aria-label="Attach image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        <button
          onClick={handleSendClick}
          disabled={isLoadingAIResponse || (!inputText?.trim() && !attachedImage)}
          className="send-btn p-2 rounded-full bg-primary text-text-white hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};