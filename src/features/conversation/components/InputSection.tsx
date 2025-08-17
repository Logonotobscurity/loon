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
  isMobile: boolean;
  onInputChange: (text: string) => void;
  onImageChange: (image: File | null) => void;
  onImageRemove: () => void;
  onSendMessage: () => void;
  onTranscriptChange: (transcript: string) => void;
  onListeningStateChange: (isListening: boolean) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  attachedImage,
  isLoadingAIResponse,
  isMobile,
  onInputChange,
  onImageChange,
  onImageRemove,
  onSendMessage,
  onTranscriptChange,
  onListeningStateChange,
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

  return (
    <div className="input-section">
      {isMobile ? (
        <MobileInputArea
          inputText={inputText}
          setInputText={onInputChange}
          attachedImage={attachedImage}
          setAttachedImage={onImageChange}
          handleSendMessage={onSendMessage}
          isLoadingAIResponse={isLoadingAIResponse}
          onTranscriptChange={onTranscriptChange}
        />
      ) : (
        <DesktopInputArea
          inputText={inputText}
          setInputText={onInputChange}
          attachedImage={attachedImage}
          setAttachedImage={onImageChange}
          handleSendMessage={onSendMessage}
          isLoadingAIResponse={isLoadingAIResponse}
          onTranscriptChange={onTranscriptChange}
        />
      )}

      <div className="input-controls flex items-center space-x-2">
        <VoiceHandler
          onTranscriptChange={onTranscriptChange}
          onListeningStateChange={onListeningStateChange}
        />
        
        <ImageHandler
          attachedImage={attachedImage}
          onImageChange={onImageChange}
          onImageRemove={onImageRemove}
        />

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