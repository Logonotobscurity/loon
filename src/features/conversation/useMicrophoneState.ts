import { useState } from 'react';

type MicrophoneState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

const useMicrophoneState = () => {
  const [microphoneState, setMicrophoneState] = useState<MicrophoneState>('idle');

  // Functions to update the state
  const setIdle = () => setMicrophoneState('idle');
  const setListening = () => setMicrophoneState('listening');
  const setProcessing = () => setMicrophoneState('processing');
  const setSuccess = () => setMicrophoneState('success');
  const setError = () => setMicrophoneState('error'); // You might want to add an error state

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