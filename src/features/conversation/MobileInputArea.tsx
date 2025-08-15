import React, { RefObject, useState } from 'react';
import { MicrophoneState } from './useMicrophoneState';
import { IconButton } from '../../components/Global/IconButton';

interface MobileInputAreaProps {
  microphoneState: MicrophoneState;
  onMicrophoneClick: () => void;
  onAttachImageClick: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingAIResponse: boolean;
  getMicrophoneIcon: () => string;
  inputText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

export const MobileInputArea: React.FC<MobileInputAreaProps> = ({
  microphoneState,
  onMicrophoneClick,
  onAttachImageClick,
  fileInputRef,
  onFileChange,
  isLoadingAIResponse,
  getMicrophoneIcon,
  inputText,
  onInputChange,
  onSendMessage,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1); // 0: file, 1: voice, 2: text
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  return (
    <div className="relative">
      {/* Carousel container */}
      <div 
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 0: File attachment */}
          <div className="w-full flex-shrink-0 flex items-center justify-center px-4 py-3">
            <div className="bg-bg-white-5 border border-border-white-10 rounded-2xl backdrop-blur-xl p-6">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
              />
              <IconButton
                className="p-4 text-text-white-60 hover:text-primary hover:bg-bg-white-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                onClick={onAttachImageClick}
                disabled={isLoadingAIResponse}
                aria-label="Attach image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </IconButton>
              <p className="text-xs text-text-white-60 mt-2">Attach file</p>
            </div>
          </div>

          {/* Slide 1: Voice input (default) */}
          <div className="w-full flex-shrink-0 flex items-center justify-center px-4 py-3">
            <button
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                microphoneState === 'listening' 
                  ? 'bg-primary text-text-white shadow-glow animate-pulse' 
                  : microphoneState === 'processing'
                  ? 'bg-accent-orange text-text-white animate-spin'
                  : microphoneState === 'success'
                  ? 'bg-green-500 text-text-white'
                  : 'bg-primary hover:bg-primary-hover text-text-white'
              }`}
              onClick={onMicrophoneClick}
              disabled={isLoadingAIResponse}
              aria-label={microphoneState === 'listening' ? 'Stop recording' : 'Start recording'}
            >
              {microphoneState === 'processing' ? (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : microphoneState === 'success' ? (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
              
              {/* Ripple effect for listening state */}
              {microphoneState === 'listening' && (
                <>
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" style={{ animationDelay: '0.1s' }}></span>
                </>
              )}
            </button>
          </div>

          {/* Slide 2: Text input */}
          <div className="w-full flex-shrink-0 px-4 py-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-bg-white-5 border border-border-white-10 rounded-2xl">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow bg-transparent text-text-white placeholder:text-text-white-40 font-inter text-sm outline-none"
                value={inputText}
                onChange={onInputChange}
                disabled={isLoadingAIResponse}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSendMessage();
                  }
                }}
              />
              <IconButton
                className="p-2 text-text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                onClick={onSendMessage}
                disabled={isLoadingAIResponse || !inputText.trim()}
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-primary w-4' 
                : 'bg-text-white-20 hover:bg-text-white-40'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div className="text-center mt-2">
        <span className="text-xs text-text-white-40">Swipe for more options</span>
      </div>
    </div>
  );
};
