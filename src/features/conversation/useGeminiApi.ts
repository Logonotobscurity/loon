// src/features/conversation/useGeminiApi.ts

import { useState, useCallback } from 'react';
import { geminiApiService } from '../../services/api/GeminiApiService';

interface UseGeminiApiReturn {
  sendMessage: (text: string, image?: File | null) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Hook for interacting with the Gemini AI API.
 * 
 * @deprecated Use the conversation store (useConversationStore) instead,
 * which includes integrated AI functionality.
 */
const useGeminiApi = (): UseGeminiApiReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(async (text: string, image?: File | null): Promise<string | null> => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await geminiApiService.sendMessage(text, image);
      
      if (!response.success) {
        setError(response.error || 'Failed to get AI response');
        return null;
      }

      return response.data?.text || null;

    } catch (err) {
      console.error("Error calling Gemini API:", err);
      const errorMessage = `Failed to get a response from the AI. Error: ${(err as Error).message}.`;
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencies for useCallback

  return {
    sendMessage,
    isLoading,
    error,
    clearError,
  };
};

export default useGeminiApi;