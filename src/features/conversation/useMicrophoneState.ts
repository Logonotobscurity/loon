// src/features/conversation/useMicrophoneState.ts

import { useState } from 'react';

// Define the possible states of the microphone
export type MicrophoneState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

const useMicrophoneState = () => {
  const [microphoneState, setMicrophoneState] = useState<MicrophoneState>('idle');

  // Function to set the microphone to 'idle' state
  const setIdle = () => setMicrophoneState('idle');

  // Function to set the microphone to 'listening' state
  const setListening = () => setMicrophoneState('listening');

  // Function to set the microphone to 'processing' state
  const setProcessing = () => setMicrophoneState('processing');

  // Function to set the microphone to 'success' state (e.g., after transcription)
  const setSuccess = () => {
    setMicrophoneState('success');
    // Optionally revert to idle after a short delay
    setTimeout(() => setMicrophoneState('idle'), 1000); // Revert after 1 second
  };

  // Function to set the microphone to 'error' state
  const setError = () => {
    setMicrophoneState('error');
    // Optionally revert to idle after a short delay
    setTimeout(() => setMicrophoneState('idle'), 2000); // Revert after 2 seconds
  };

  return {
    microphoneState,
    setIdle,
    setListening,
    setProcessing,
    setSuccess,
    setError,
  };
};

export default useMicrophoneState;


