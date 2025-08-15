// src/features/conversation/useGeminiApi.ts

import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface UseGeminiApiReturn {
  sendMessage: (text: string, image?: File | null) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
  console.warn("Google Generative AI API key is not configured. Please set VITE_GOOGLE_GENERATIVE_AI_API_KEY in your environment variables.");
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY || "placeholder-key-if-missing"); // Use a placeholder to avoid crashing if key is missing immediately
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Choose your model

// Function to convert File to GenerativeContent part for image
async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
  const base64EncodedDataOrUri = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedDataOrUri.split(',')[1],
      mimeType: file.type
    },
  };
}


const useGeminiApi = (): UseGeminiApiReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(async (text: string, image?: File | null): Promise<string | null> => {
    if (!API_KEY || API_KEY === "placeholder-key-if-missing") {
      const apiKeyError = "AI API key is not configured. Please check your environment variables.";
      setError(apiKeyError);
      console.error(apiKeyError);
      return null;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const parts = [];
      if (text) {
        parts.push({ text: text });
      }
      if (image) {
        const imagePart = await fileToGenerativePart(image);
        parts.push(imagePart);
      }

      if (parts.length === 0) {
          setError("Cannot send an empty message.");
          return null;
      }


      const result = await model.generateContent({
        contents: [{ role: "user", parts: parts }],
      });

      const response = result.response;
      const aiText = response.text();

      return aiText;

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