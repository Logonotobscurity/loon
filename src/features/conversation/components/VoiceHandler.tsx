import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';

interface VoiceHandlerProps {
  onTranscriptChange: (transcript: string) => void;
  onListeningStateChange: (isListening: boolean) => void;
}

export const VoiceHandler: React.FC<VoiceHandlerProps> = ({ 
  onTranscriptChange, 
  onListeningStateChange 
}) => {
  const {
    transcript,
    listening: isListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update parent components with transcript changes
  React.useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  React.useEffect(() => {
    onListeningStateChange(isListening);
  }, [isListening, onListeningStateChange]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="voice-handler">
        <button
          disabled
          className="voice-start-btn p-2 rounded-full opacity-50 cursor-not-allowed"
          aria-label="Speech recognition not supported"
        >
          <MicrophoneIcon className="w-5 h-5 text-text-white-40" />
        </button>
      </div>
    );
  }

  const handleVoiceStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const handleVoiceStop = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="voice-handler">
      {!isListening ? (
        <button
          onClick={handleVoiceStart}
          className="voice-start-btn p-2 rounded-full hover:bg-bg-white-5 transition-colors"
          aria-label="Start voice input"
        >
          <MicrophoneIcon className="w-5 h-5 text-primary" />
        </button>
      ) : (
        <button
          onClick={handleVoiceStop}
          className="voice-stop-btn p-2 rounded-full hover:bg-bg-white-5 transition-colors animate-pulse"
          aria-label="Stop voice input"
        >
          <StopIcon className="w-5 h-5 text-red-400" />
        </button>
      )}
    </div>
  );
};