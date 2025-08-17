import { renderHook, act } from '@testing-library/react';
import { useConversationStore } from '../../../store/conversationStore';
import { useConversation } from '../hooks/useConversation';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock SpeechRecognition API
class MockSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = 'en-US';
  onresult: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onend: (() => void) | null = null;
  
  start = vi.fn();
  stop = vi.fn();
  
  triggerResult = (transcript: string) => {
    if (this.onresult) {
      this.onresult({
        results: [[{ transcript }]]
      });
    }
  };
  
  triggerError = (error: string) => {
    if (this.onerror) {
      this.onerror({ error });
    }
  };
}

// Mock the conversation store
vi.mock('../../../store/conversationStore');

// Mock the conversation service
vi.mock('../../../services/conversation/ConversationService', () => ({
  conversationService: {
    sendMessage: vi.fn(),
  },
}));

// Mock analytics
vi.mock('../../../analytics/analytics', () => ({
  trackEvent: vi.fn(),
}));

describe('useConversation Hook', () => {
  const mockAddMessage = vi.fn();
  const mockSetError = vi.fn();
  const mockClearConversation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset the store mock
    (useConversationStore as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [],
      isLoading: false,
      error: null,
      addMessage: mockAddMessage,
      setError: mockSetError,
      clearConversation: mockClearConversation,
    });

    // Setup SpeechRecognition mock
    Object.defineProperty(window, 'SpeechRecognition', {
      value: MockSpeechRecognition,
      writable: true,
    });

    Object.defineProperty(window, 'webkitSpeechRecognition', {
      value: MockSpeechRecognition,
      writable: true,
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConversation());

    expect(result.current.inputText).toBe('');
    expect(result.current.attachedImage).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isListening).toBe(false);
  });

  it('should update input text', () => {
    const { result } = renderHook(() => useConversation());

    act(() => {
      result.current.setInputText('Hello AI');
    });

    expect(result.current.inputText).toBe('Hello AI');
  });

  it('should set and clear attached image', () => {
    const { result } = renderHook(() => useConversation());
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.setAttachedImage(mockFile);
    });

    expect(result.current.attachedImage).toBe(mockFile);

    act(() => {
      result.current.clearImage();
    });

    expect(result.current.attachedImage).toBeNull();
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useConversation());

    act(() => {
      result.current.clearError();
    });

    expect(mockSetError).toHaveBeenCalledWith(null);
  });

  it('should start and stop listening', () => {
    const { result } = renderHook(() => useConversation());

    act(() => {
      result.current.startListening();
    });

    expect(result.current.isListening).toBe(true);

    act(() => {
      result.current.stopListening();
    });

    expect(result.current.isListening).toBe(false);
  });

  it('should not send empty messages', async () => {
    const { result } = renderHook(() => useConversation());

    await act(async () => {
      await result.current.sendMessage();
    });

    expect(mockAddMessage).not.toHaveBeenCalled();
  });

  it('should handle speech recognition not supported', () => {
    // Mock SpeechRecognition to be undefined
    Object.defineProperty(window, 'SpeechRecognition', { value: undefined, writable: true });
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, writable: true });
    
    // Create a new hook instance with no SpeechRecognition
    const { result } = renderHook(() => useConversation());

    act(() => {
      result.current.startListening();
    });

    expect(mockSetError).toHaveBeenCalledWith('Speech recognition not supported in this browser');
  });

  it('should toggle listening when already listening', () => {
    const { result } = renderHook(() => useConversation());

    act(() => {
      result.current.startListening();
    });

    act(() => {
      result.current.startListening(); // Should stop listening
    });

    expect(result.current.isListening).toBe(false);
  });
});