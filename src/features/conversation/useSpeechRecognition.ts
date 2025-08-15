// src/features/conversation/useSpeechRecognition.ts

import { useState, useEffect, useRef, useCallback } from 'react';

// Declare the SpeechRecognition and webkitSpeechRecognition types (keep this for broader compatibility)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface UseSpeechRecognitionOptions {
  onResult?: (transcript: string) => void;
  onEnd?: (finalTranscript: string) => void;
  onError?: (error: any) => void;
  onStart?: () => void;
  timeout?: number; // Timeout for speech pause
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  error: string | null;
  startRecognition: () => void;
  stopRecognition: () => void;
}

const useSpeechRecognition = (options?: UseSpeechRecognitionOptions): UseSpeechRecognitionReturn => {
  const { onResult, onEnd, onError, onStart, timeout = 3000 } = options || {};

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startRecognition = useCallback(async () => {
    setError(null); // Clear previous errors
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech Recognition API not supported in this browser.');
      if (onError) onError(new Error('Speech Recognition API not supported.'));
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new (SpeechRecognition as any)();
      (recognitionRef.current as any).continuous = true;
      (recognitionRef.current as any).interimResults = true;
      (recognitionRef.current as any).lang = 'en-US'; // Set language

      // Event handlers
      (recognitionRef.current as any).onstart = () => {
        setIsListening(true);
        setTranscript('');
        if (onStart) onStart();
      };

      (recognitionRef.current as any).onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (onResult) onResult(currentTranscript);

        // Clear any existing timeout
        if (listeningTimeoutRef.current) {
          clearTimeout(listeningTimeoutRef.current);
        }

        // Set a new timeout to stop listening after a pause
        listeningTimeoutRef.current = setTimeout(() => {
          recognitionRef.current?.stop(); // Stop recognition after timeout
        }, timeout);
      };

      (recognitionRef.current as any).onend = () => {
        setIsListening(false);
        // Get the final transcript from the accumulated interim results
        let finalTranscript = transcript; // Use the latest transcript state
        if (onEnd) onEnd(finalTranscript);
        setTranscript(''); // Clear transcript after ending
      };

      (recognitionRef.current as any).onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}.`);
        setIsListening(false);
        setTranscript(''); // Clear transcript on error
        if (onError) onError(event);
      };
    }

    // Request microphone permissions before starting
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Start recognition if permissions granted and not already listening
      if (!isListening) {
         (recognitionRef.current as any).start();
      }
    } catch (err: any) {
      console.error('Microphone permission denied:', err);
      setError(`Microphone permission denied: ${err.message}. Please allow access to use voice input.`);
      if (onError) onError(err);
      setIsListening(false);
      setTranscript('');
    }

  }, [onResult, onEnd, onError, onStart, timeout, transcript, isListening]); // Add dependencies

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current && isListening) {
      (recognitionRef.current as any).stop();
    }
    if (listeningTimeoutRef.current) {
      clearTimeout(listeningTimeoutRef.current);
    }
  }, [isListening]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        (recognitionRef.current as any).stop();
      }
      if (listeningTimeoutRef.current) {
        clearTimeout(listeningTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return {
    isListening,
    transcript,
    error,
    startRecognition,
    stopRecognition,
  };
};

export default useSpeechRecognition;
