import { useState, useCallback, useRef, useEffect } from 'react';
import { useConversationStore } from '../../../store/conversationStore';
import { conversationService } from '../../../services/conversation/ConversationService';
import { speechRecognitionService } from '../../../services/conversation/SpeechRecognitionService';
import { analyticsService } from '../../../services/analytics/AnalyticsService';
import { Message } from '../../../types';

export interface UseConversationOptions {
  onError?: (error: string) => void;
  onSuccess?: (response: string) => void;
}

export interface UseConversationReturn {
  // State
  inputText: string;
  attachedImage: File | null;
  isLoading: boolean;
  error: string | null;
  isListening: boolean;
  
  // Actions
  setInputText: (text: string) => void;
  setAttachedImage: (file: File | null) => void;
  clearImage: () => void;
  sendMessage: () => Promise<void>;
  clearError: () => void;
  startListening: () => void;
  stopListening: () => void;
  
  // Refs
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const useConversation = (options: UseConversationOptions = {}): UseConversationReturn => {
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<File | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const { messages, addMessage, isLoading, error, setError: setStoreError, clearConversation } = useConversationStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize speech recognition support check
  useEffect(() => {
    if (!speechRecognitionService.isSupported()) {
      console.warn('Speech recognition not supported in this browser');
    }
  }, []);

  const clearError = useCallback(() => {
    setStoreError(null);
  }, [setStoreError]);

  const clearImage = useCallback(() => {
    setAttachedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputText.trim() && !attachedImage) return;

    try {
      clearError();
      
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: inputText.trim(),
        timestamp: new Date(),
        imageUrl: attachedImage ? URL.createObjectURL(attachedImage) : undefined,
      };

      await addMessage(userMessage);
      setInputText('');
      clearImage();

      analyticsService.trackUserAction('message_sent', {
        hasImage: !!attachedImage,
        messageLength: inputText.length
      });

      const result = await conversationService.sendMessage({
        text: inputText.trim(),
        image: attachedImage || undefined,
        conversationHistory: messages,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
      };

      await addMessage(aiMessage);
      analyticsService.trackUserAction('ai_response_received', {
        responseLength: result.response.length
      });
      options.onSuccess?.(result.response);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      setStoreError(errorMessage);
      analyticsService.trackError(error instanceof Error ? error : new Error(errorMessage), {
        action: 'send_message',
        hasImage: !!attachedImage
      });
      options.onError?.(errorMessage);
    }
  }, [inputText, attachedImage, messages, addMessage, clearError, clearImage, setStoreError, options]);

  const startListening = useCallback(async () => {
    if (!speechRecognitionService.isSupported()) {
      setStoreError('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    try {
      await speechRecognitionService.startRecognition({
        continuous: false,
        interimResults: false,
        lang: 'en-US',
        timeout: 10000
      });
      setIsListening(true);
      analyticsService.trackUserAction('voice_recording_started');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setStoreError('Failed to start voice recording');
      analyticsService.trackError(error instanceof Error ? error : new Error('Speech recognition error'));
    }
  }, [isListening, setStoreError]);

  const stopListening = useCallback(() => {
    speechRecognitionService.stopRecognition();
    setIsListening(false);
    analyticsService.trackUserAction('voice_recording_stopped');
  }, []);

  return {
    // State
    inputText,
    attachedImage,
    isLoading,
    error,
    isListening,
    
    // Actions
    setInputText,
    setAttachedImage,
    clearImage,
    sendMessage,
    clearError,
    startListening,
    stopListening,
    
    // Refs
    fileInputRef,
  };
};