import React, { useState, useEffect, useRef, useCallback } from 'react';
import './conversation.css';
import { useConversationStore } from '../../store/conversationStore';
import { Message } from '../../types';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2, Maximize2, X } from 'lucide-react';
import { BI_GPT_IDENTITY_PROMPT } from './bigptconfig';
import { trackEvent } from '../../analytics/analytics';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { MessageRenderer } from './components/MessageRenderer';
import { InputSection } from './components/InputSection';

// Declare the SpeechRecognition and webkitSpeechRecognition types for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Initialize the Gemini API using validated environment configuration
import { environment } from '../../services/config/environment';
const genAI = new GoogleGenerativeAI(environment.googleGenerativeAIApiKey);

// BI-GPT system instruction is provided centrally via biGptConfig

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: BI_GPT_IDENTITY_PROMPT
});

interface ConversationDialogueProps {
  startInHero?: boolean;
  className?: string;
}

const ConversationDialogue: React.FC<ConversationDialogueProps> = ({ 
  startInHero = false,
  className = '' 
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMinimized, setIsMinimized] = useState(false);
  const isSticky = false;
  const [isExpanded, setIsExpanded] = useState(startInHero);
  const [showChat, setShowChat] = useState(true);
  
  // Fix microphone state - use useState instead of custom hook
  const [microphoneState, setMicrophoneState] = useState<'idle' | 'listening' | 'processing' | 'success'>('idle');
  const { messages, addMessage, clearConversation } = useConversationStore();

  // State for input
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<File | null>(null);
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  // Ref for SpeechRecognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const conversationDialogueRef = useRef<HTMLDivElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const ERROR_DISPLAY_DURATION = 5000;
  const SPEECH_TIMEOUT = 2000;
  const [error, setError] = useState<string | null>(null);

  // Function to clear the error message
  const clearError = () => {
    setError(null);
  };

  // Handle sending message (text or voice)
  const handleSendMessage = useCallback(async () => {
    const messageToSend = inputText?.trim() || '';
    if (messageToSend || attachedImage) {
      if (!environment.googleGenerativeAIApiKey) {
        setError("AI API key is not configured. Please check your environment variables.");
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
        setIsLoadingAIResponse(false);
        return;
      }
      console.log("Sending message:", messageToSend);
      console.log("Attached image:", attachedImage);

      setIsLoadingAIResponse(true);

      try { trackEvent('ai_message_send', { source: startInHero ? 'hero' : 'floating', hasImage: !!attachedImage }); } catch {}
      
      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageToSend,
        sender: 'user',
        timestamp: Date.now(),
        ...(attachedImage && { imageUrl: URL.createObjectURL(attachedImage) }),
      };
      addMessage(userMessage);

      try {
        const parts = [];
        try {
          const { retrieveContext } = await import('./rag');
          const ctxSnippets = retrieveContext(messageToSend, 3);
          if (ctxSnippets.length) {
            const ragContext = `Context (top matches):\n${ctxSnippets.map((c, i) => `(${i+1}) ${c}`).join('\n---\n')}`;
            parts.push({ text: ragContext });
          }
        } catch (e) {
          console.warn('RAG retrieval unavailable:', e);
        }
        if (messageToSend) {
          parts.push({ text: messageToSend });
        }
        if (attachedImage) {
          const imagePart = await fileToGenerativePart(attachedImage);
          parts.push(imagePart);
        }

        const result = await model.generateContent({
          contents: [{ role: "user", parts: parts }],
        });

        try {
          const { recordInteraction } = await import('./rag');
          recordInteraction(messageToSend);
        } catch (e) {
          console.warn('RAG record unavailable:', e);
        }

        const response = result.response;
        const aiText = response.text();
        try { trackEvent('ai_message_receive', { source: startInHero ? 'hero' : 'floating', length: aiText.length }); } catch {}
        console.log("Received AI response:", aiText);

        const aiMessage: Message = {
          id: Date.now().toString() + '_ai',
          text: aiText,
          sender: 'ai',
          timestamp: Date.now(),
        };
        addMessage(aiMessage);

        try {
          const { upsertDocuments } = await import('./rag');
          upsertDocuments([{ id: `resp_${Date.now()}`, text: aiText }]);
        } catch (e) {
          console.warn('RAG upsert unavailable:', e);
        }

        setMicrophoneState('success');

      } catch (error) {
        console.error("Error sending message to Gemini API:", error);
        setError(`Failed to get a response from the AI. Error: ${(error as Error).message}. Please try again.`);
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
      } finally {
        setIsLoadingAIResponse(false);
      }

      setInputText('');
      setAttachedImage(null);
    }
  }, [inputText, attachedImage, addMessage, startInHero, setMicrophoneState]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new (SpeechRecognition as any)();
      (recognitionRef.current as any).continuous = true;
      (recognitionRef.current as any).interimResults = true;
      (recognitionRef.current as any).lang = 'en-US';

      (recognitionRef.current as any).onstart = () => {
        setMicrophoneState('listening');
        console.log('[Voice Debug] Speech recognition started');
      };

      (recognitionRef.current as any).onresult = (event: Event) => {
        const speechEvent = event as SpeechRecognitionEvent;
        let currentTranscript = '';
        for (let i = speechEvent.resultIndex; i < speechEvent.results.length; ++i) {
          currentTranscript += speechEvent.results[i][0].transcript;
        }

        if (listeningTimeoutRef.current) {
          clearTimeout(listeningTimeoutRef.current);
        }

        listeningTimeoutRef.current = setTimeout(() => {
          recognitionRef.current?.stop();
          setMicrophoneState('processing');
        }, SPEECH_TIMEOUT);
      };

      (recognitionRef.current as any).onend = () => {
        console.log('Speech recognition ended');
        if (inputText && inputText.trim()) {
          handleSendMessage();
        }
        setMicrophoneState('idle');
      };

      (recognitionRef.current as any).onerror = (event: any) => {
        console.error('[Voice Debug] Speech recognition error:', event);
        setError(`Speech recognition error: ${event.error}. Please try again.`);
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
        setMicrophoneState('idle');
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (listeningTimeoutRef.current) {
        clearTimeout(listeningTimeoutRef.current);
      }
    };
  }, [setMicrophoneState, inputText, handleSendMessage]);

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const imageFile = Array.from(files).find(file => file.type.startsWith('image/'));
      if (imageFile) {
        setAttachedImage(imageFile);
        console.log("Image attached via drag and drop:", imageFile.name);
      } else {
        setError('Only image files are allowed.');
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
      }
    }
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  // Function to convert File to GenerativeContent part for image
  async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
    const base64EncodedDataOrUri = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (result && result.startsWith('data:')) {
          resolve(result);
        } else {
          throw new Error('Failed to generate image data');
        }
      };
      reader.onerror = () => {
        throw new Error('Failed to read file');
      };
      reader.readAsDataURL(file);
    });

    if (!base64EncodedDataOrUri) {
      throw new Error('Failed to generate image data');
    }

    return {
      inlineData: {
        data: base64EncodedDataOrUri.split(',')[1],
        mimeType: file.type
      },
    };
  }

  // Determine container position and size based on state
  const getContainerStyles = () => {
    if (!showChat) return 'hidden';
    
    if (startInHero && !isSticky) {
      return `relative ${isMobile ? 'w-full' : 'w-full max-w-4xl mx-auto'} ${className}`;
    }
    
    if (isMinimized) {
      return `fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} z-[9999]`;
    }
    
    return `fixed z-[9999] ${
      isMobile 
        ? 'bottom-0 left-0 right-0 rounded-t-3xl' 
        : isExpanded 
          ? 'bottom-6 right-6 w-[600px] h-[700px]'
          : 'bottom-6 right-6 w-[440px] h-[550px]'
    } transition-all duration-300`;
  };

  // Render minimized button
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-primary hover:bg-primary-hover text-text-white rounded-full shadow-glow flex items-center justify-center transition-all duration-300"
      >
        <span className="text-2xl">🤖</span>
      </motion.button>
    );
  }

  return (
    <ErrorBoundary>
      <AnimatePresence>
        <motion.div
          ref={conversationDialogueRef}
          initial={isSticky ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`${getContainerStyles()} bg-bg-dark-95 backdrop-blur-2xl border border-border-white-10 ${
            startInHero && !isSticky ? 'rounded-2xl' : 'rounded-3xl'
          } shadow-glass hover:border-border-white-20 ${isDraggingOver ? 'border-primary shadow-glow' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border-white-5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-satoshi font-medium text-text-white">Business Intelligent Agent</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => clearConversation()}
                className="px-2 py-1 text-xs border border-border-white-10 rounded-lg text-text-white-60 hover:text-text-white hover:border-border-white-20 transition-colors"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                Clear
              </button>
              {isSticky && (
                <>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 hover:bg-bg-white-10 rounded-lg transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <Minimize2 className="w-4 h-4 text-text-white-60" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-text-white-60" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 hover:bg-bg-white-10 rounded-lg transition-colors"
                    aria-label="Minimize"
                  >
                    <Minimize2 className="w-4 h-4 text-text-white-60" />
                  </button>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-1.5 hover:bg-bg-white-10 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-text-white-60" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <MessageRenderer
            isLoadingAIResponse={isLoadingAIResponse}
            conversationEndRef={conversationEndRef}
          />

          {/* Error Message */}
          {error && (
            <div className="mx-4 mb-3 px-3 py-2 bg-accent-red/10 border border-accent-red/20 rounded-lg 
              text-accent-red text-sm cursor-pointer transition-opacity duration-200 hover:opacity-80"
              onClick={clearError}
            >
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {attachedImage && (
            <div className="mx-4 mb-3 relative">
              <div className="relative p-2 bg-bg-white-5 border border-border-white-10 rounded-lg">
                <img 
                  src={URL.createObjectURL(attachedImage)} 
                  alt="Attached preview" 
                  className="max-h-32 max-w-full rounded object-contain mx-auto"
                />
                <button 
                  className="absolute top-1 right-1 w-6 h-6 bg-bg-dark-90 hover:bg-accent-red 
                    text-text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  onClick={() => setAttachedImage(null)}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border-white-5">
            <InputSection
              inputText={inputText}
              attachedImage={attachedImage}
              isLoadingAIResponse={isLoadingAIResponse}
              isMobile={isMobile}
              onInputChange={setInputText}
              onImageChange={setAttachedImage}
              onImageRemove={() => setAttachedImage(null)}
              onSendMessage={handleSendMessage}
              onTranscriptChange={setInputText}
              onListeningStateChange={() => {}}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default ConversationDialogue;
