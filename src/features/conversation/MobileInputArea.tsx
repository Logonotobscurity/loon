import React, { RefObject } from 'react';
import { MicrophoneState } from '../useMicrophoneState';

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
    <div className="flex justify-center">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <button className="image-attach-button" onClick={onAttachImageClick}>
        🖼️ {/* Image attach icon */}
      </button>
      <button
        className={`w-15 h-15 rounded-full border-none bg-blue-500 text-white text-2xl flex justify-center items-center cursor-pointer ${microphoneState}`}
        onClick={onMicrophoneClick}
        disabled={isLoadingAIResponse}
      >
        {getMicrophoneIcon()} {/* Use the helper function to get the icon */}
      </button>
    </div>
  );
};