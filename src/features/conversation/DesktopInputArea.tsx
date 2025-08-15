import React, { useRef } from 'react';
import { MicrophoneState } from './useMicrophoneState'; // Assuming MicrophoneState is exported from here

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
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <button
        className="image-attach-button"
        onClick={onAttachImageClick}
        disabled={isLoadingAIResponse}
      >
        🖼️ {/* Image attach icon */}
      </button>
      <input
        type="text"
        placeholder="Type your message or click the mic to speak..."
        className="flex-grow p-2 border border-gray-300 rounded message-input"
        value={inputText || transcript} // Display interim transcript while listening
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        disabled={isLoadingAIResponse} // Disable input while loading
      />
      <button
        className={`microphone-button ${microphoneState}`}
        onClick={onMicrophoneClick} // Styling for this button's states (idle, listening, etc.) will be handled separately, likely in global CSS or by migrating to Tailwind equivalents if possible.
        disabled={isLoadingAIResponse}
      >
        {getMicrophoneIcon()} {/* Use the helper function to get the icon */}
      </button>
    </div>
  );
};