import React, { useState, useEffect, useRef } from 'react';
import './conversation.css'; // Import the CSS file
import useMicrophoneState from './useMicrophoneState'; // Import the custom microphone hook
import useConversationState, { Message } from './useConversationState'; // Import the custom conversation hook and Message type

import useSpeechRecognition from '/home/user/loon/src/features/conversation/useSpeechRecognition'; // Import the speech recognition hook
import MobileInputArea from '/home/user/loon/src/features/conversation/MobileInputArea.tsx';
import MessageList from '/home/user/loon/src/features/conversation/MessageList.tsx';
import DesktopInputArea from '/home/user/loon/src/features/conversation/DesktopInputArea.tsx';
// Import the GoogleGenerativeAI class
import { GoogleGenerativeAI } from "@google/generative-ai";

// Declare the SpeechRecognition and webkitSpeechRecognition types (keep this for broader compatibility)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Initialize the Gemini API using the environment variable
const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Choose your model

const ConversationDialogue: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Example breakpoint
  const { microphoneState, setIdle, setListening, setProcessing, setSuccess } = useMicrophoneState(); // Use the microphone hook
  const { messages, addMessage } = useConversationState(); // Use the conversation hook

  // Use the speech recognition hook
  const { isListening: isHookListening, transcript, error: speechError, startRecognition, stopRecognition } = useSpeechRecognition();

  // State for input
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<File | null>(null); // State for attached image
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false); // State to indicate if waiting for AI response
  const [generalError, setGeneralError] = useState<string | null>(null); // State to hold general error messages

  // Ref for SpeechRecognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for the timeout
  const conversationEndRef = useRef<HTMLDivElement>(null); // Ref for the end of the conversation for scrolling
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input
  const conversationDialogueRef = useRef<HTMLDivElement>(null); // Ref for the main container div
  const [isDraggingOver, setIsDraggingOver] = useState(false); // State for drag-over effect for drag and drop

  const ERROR_DISPLAY_DURATION = 5000; // milliseconds to display error messages

  // Function to clear the error message
  const clearError = () => {
    setGeneralError(null);
  };


   // Handle sending message (text or voice) - MOVED ABOVE useEffect
  const handleSendMessage = async () => { // Make function async
    const messageToSend = inputText.trim() || transcript.trim(); // Use input text or final transcript
    if (messageToSend || attachedImage) { // Allow sending if there's text OR an image
      if (!API_KEY) { // Assuming API_KEY is still needed here for the AI call
        setError("AI API key is not configured. Please check your environment variables.");
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
        setIsLoadingAIResponse(false);
        return; // Stop if API key is missing
      }
      console.log("Sending message:", messageToSend);
      console.log("Attached image:", attachedImage);

      setIsLoadingAIResponse(true); // Set loading state

      // Create a message object for the user's message
      const userMessage: Message = {
        id: Date.now().toString(), // Simple ID
        text: messageToSend,
        imageUrl: attachedImage ? URL.createObjectURL(attachedImage) : undefined,
        sender: 'user',
        timestamp: Date.now(),
      };
      addMessage(userMessage); // Add user message to conversation history

        // Scroll to the bottom after adding the user message
      try {
        // Prepare content for the API
        const parts = [];
        if (messageToSend) {
          parts.push({ text: messageToSend });
        }
        if (attachedImage) {
          const imagePart = await fileToGenerativePart(attachedImage);
          parts.push(imagePart);
        }

        // Send the message to the Gemini API
        const result = await model.generateContent({
          contents: [{ role: "user", parts: parts }],
        });

        const response = result.response;
        const aiText = response.text();
        console.log("Received AI response:", aiText);

        // Create a message object for the AI's response
        const aiMessage: Message = {
          id: Date.now().toString() + '_ai', // Simple AI ID
          text: aiText,
          sender: 'ai',
          timestamp: Date.now(),
        };
        addMessage(aiMessage); // Add AI message to conversation history

        setSuccess(); // Indicate success after receiving AI response

      } catch (error) {
        console.error("Error sending message to Gemini API:", error);
        setError(`Failed to get a response from the AI. Error: ${(error as Error).message}. Please try again.`);
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
      } finally {
         setIsLoadingAIResponse(false); // Clear loading state
      }

      setInputText(''); // Clear input after sending
      setTranscript(''); // Clear transcript after sending
      setAttachedImage(null); // Clear attached image after sending
    }
  };


  // Handle window resize to determine mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Example breakpoint
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
      // Explicitly cast to any if TypeScript still complains after tsconfig update
      recognitionRef.current = new (SpeechRecognition as any)();
      (recognitionRef.current as any).continuous = true; // Listen continuously for pauses
      (recognitionRef.current as any).interimResults = true; // Get interim results
      (recognitionRef.current as any).lang = 'en-US'; // Set language

      // Event handlers for recognition
      (recognitionRef.current as any).onstart = () => {
        setListening();
        console.log('Speech recognition started');
        setTranscript(''); // Clear transcript on start
      };

      (recognitionRef.current as any).onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }

        setTranscript(currentTranscript); // Update transcript state with current result

        // Clear any existing timeout
        if (listeningTimeoutRef.current) {
          clearTimeout(listeningTimeoutRef.current);
        }

        // Set a new timeout to stop listening after a pause
        listeningTimeoutRef.current = setTimeout(() => {
          recognitionRef.current?.stop(); // Stop recognition after timeout
          setProcessing(); // Move to processing state
        }, SPEECH_TIMEOUT);
      };

      (recognitionRef.current as any).onend = () => {
        console.log('Speech recognition ended');
        // Use the final transcript to send the message
        let finalTranscript = '';
        // Iterate through all results to get the final transcript
        // The event object from onend might not have the results property directly in some implementations
        // We rely on the transcript state being updated by onresult for simplicity here, but a more robust approach might store final results during onresult
         if (transcript.trim()) {
           // Call handleSendMessage directly with the current transcript state
           handleSendMessage(transcript); // Pass transcript directly
        }
        setIdle(); // Revert to idle after processing (or after sending message)
        setTranscript(''); // Clear interim transcript state
      };
      (recognitionRef.current as any).onerror = (event: any) => {
        setTimeout(clearError, ERROR_DISPLAY_DURATION);
        setError(`Speech recognition error: ${event.error}. Please try again.`);
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
      // You might want to disable the microphone button or show a message
    }

    return () => {
      // Clean up recognition instance and timeout on component unmount
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (listeningTimeoutRef.current) {
        clearTimeout(listeningTimeoutRef.current);
      }
    };
  }, [setIdle, setListening, setProcessing, handleSendMessage, transcript, clearError, setError]); // Added handleSendMessage and transcript to dependencies

  // Effect for drag and drop functionality
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default to allow drop
    setIsDraggingOver(true);
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default browser behavior
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



  // Handle text input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Function to convert File to GenerativeContent part for image
  async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> { // Add return type
    const base64EncodedDataOrUri = await new Promise<string>((resolve) => { // Explicitly type as string
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string); // Cast to string
      reader.readAsDataURL(file);
    });

    return {
      inlineData: {
        data: base64EncodedDataOrUri.split(',')[1],
        mimeType: file.type
      },
    };
  }

  // Handle microphone button click
  const handleMicrophoneClick = () => {
    // Check if Speech Recognition API is available
    if (recognitionRef.current) {
      // If currently idle, start listening
      if (microphoneState === 'idle') {
        // Request microphone permissions before starting
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            try {
              (recognitionRef.current as any).start(); // Cast to any
            } catch (error) {
              console.error('Error starting speech recognition:', error);
              setError('Error starting microphone. Please try again.');
              setTimeout(clearError, ERROR_DISPLAY_DURATION);
              setIdle(); // Revert to idle on error
            }
          })
          .catch((error) => {
            console.error('Microphone permission denied:', error);
            setError('Microphone permission denied. Please allow access to use voice input.');
            setTimeout(clearError, ERROR_DISPLAY_DURATION);
          });
      } else {
        // If not idle, stop listening
        (recognitionRef.current as any).stop(); // Cast to any
    }
  };
};
  // Handle image attachment button click
  const handleAttachImageClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden file input
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic file type validation (optional)
      if (file.type.startsWith('image/')) {
        setAttachedImage(file);
        console.log("Image attached:", file.name);
        // TODO: Show thumbnail preview (the image-preview div handles this currently)
      } else {
        console.warn("Only image files are allowed.");
        // TODO: Show an error message to the user
      }
    }
    // Clear the file input value to allow selecting the same file again
    if (event.target) {
      event.target.value = '';
    }
  };

  // Function to get the appropriate microphone icon based on state
  const getMicrophoneIcon = () => {
    switch (microphoneState) {
      case 'idle':
        return '🎤'; // Idle icon (replace with your actual icon)
      case 'listening':
        return '🔊'; // Listening icon (replace with your actual icon and add animation in CSS)
      case 'processing':
        return '🧠'; // Processing icon (replace with your actual icon and add animation in CSS)
      case 'success':
        return '✅'; // Success icon (replace with your actual icon and add animation in CSS)
      default:
        return '🎤';
    }
  };

  return (
    <div ref={conversationDialogueRef}
      className={
        `fixed bottom-5 left-1/2 -translate-x-1/2 z-[1000] p-2.5 bg-white border border-gray-300 rounded-lg shadow-md
        ${isMobile ? 'sm:bottom-2.5' : ''}
        ${isDraggingOver ? 'border-blue-500 shadow-blue-500' : ''}
        `
      }
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={conversationDialogueRef}
      className={`conversation-dialogue ${isMobile ? 'mobile' : 'desktop'} ${isDraggingOver ? 'dragging-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      {/* Conversation Display Area */}
      <div className="conversation-display">
        {messages.map(message => (
          <div key={message.id} className={`message-bubble ${message.sender}`}>
            {message.text && <p>{message.text}</p>}
            {message.imageUrl && <img src={message.imageUrl} alt="attached" />}
            <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
         {/* Loading indicator */}
         {isLoadingAIResponse && (
            <div className="message-bubble ai loading">
               <div className="loading-indicator-animation">AI is thinking...</div> {/* Replace with a loading animation */}
            </div>
         )}
      </div>
      <div ref={conversationEndRef} /> {/* Empty div at the end for scrolling */}

      {/* Display attached image preview */}
      {error && (
        <div className="error-message" onClick={clearError} style={{ cursor: 'pointer', color: 'red', marginBottom: '10px' }}>
          {error} (Click to dismiss)
        </div>
      )}

      {/* Display attached image preview */}
      {attachedImage && (
         <div className="image-preview">
           <img src={URL.createObjectURL(attachedImage)} alt="Attached preview" />
           <button className="remove-image-button" onClick={() => setAttachedImage(null)}>X</button>
         </div>
       )}

      {isMobile ? (
        // Mobile Input Area (can have both mic and image)
        <div className="mobile-input-area">
           {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button className="image-attach-button" onClick={handleAttachImageClick}>
             🖼️ {/* Image attach icon */}
          </button>
          <button className={`mobile-microphone-button ${microphoneState}`} onClick={handleMicrophoneClick} disabled={isLoadingAIResponse}>
            {getMicrophoneIcon()} {/* Use the helper function to get the icon */}
          </button>
        </div>
      ) : (
        // Desktop Input Area (can have both text, mic, and image)
        <div className="desktop-input-area">
           {/* Hidden file input */}
           <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
           <button className="image-attach-button" onClick={handleAttachImageClick} disabled={isLoadingAIResponse}>
             🖼️ {/* Image attach icon */}
           </button>
          <input
            type="text"
            placeholder="Type your message or click the mic to speak..."
            className="message-input"
            value={inputText || transcript} // Display interim transcript while listening
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage();
              }
            }}
             disabled={isLoadingAIResponse} // Disable input while loading
          />
          <button className={`microphone-button ${microphoneState}`} onClick={handleMicrophoneClick} disabled={isLoadingAIResponse}>
            {getMicrophoneIcon()} {/* Use the helper function to get the icon */}
          </button>
        </div>
      )}

    </div>
  );
};

export default ConversationDialogue;
