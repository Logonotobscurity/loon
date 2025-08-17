import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useSpeechRecognition from '../useSpeechRecognition';

describe('useSpeechRecognition Hook', () => {
  let mockRecognition: any;
  let mockWebkitRecognition: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock SpeechRecognition
    mockRecognition = {
      start: vi.fn(),
      stop: vi.fn(),
      abort: vi.fn(),
      continuous: false,
      interimResults: false,
      lang: 'en-US',
      onresult: null,
      onerror: null,
      onend: null,
    };

    mockWebkitRecognition = {
      start: vi.fn(),
      stop: vi.fn(),
      abort: vi.fn(),
      continuous: false,
      interimResults: false,
      lang: 'en-US',
      onresult: null,
      onerror: null,
      onend: null,
    };

    // Set up window mocks
    Object.defineProperty(window, 'SpeechRecognition', {
      value: vi.fn().mockImplementation(() => mockRecognition),
      writable: true,
    });

    Object.defineProperty(window, 'webkitSpeechRecognition', {
      value: vi.fn().mockImplementation(() => mockWebkitRecognition),
      writable: true,
    });
  });

  afterEach(() => {
    // Clean up
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.isListening).toBe(false);
    expect(result.current.transcript).toBe('');
    expect(result.current.error).toBe(null);
  });

  it('should detect when SpeechRecognition is not supported', () => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;

    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.error).toBe('Speech Recognition API not supported in this browser.');
  });

  it('should use webkitSpeechRecognition when available', () => {
    delete (window as any).SpeechRecognition;

    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.error).toBe(null); // Should not have error
  });

  it('should start listening successfully', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    expect(result.current.isListening).toBe(true);
    expect(mockRecognition.start).toHaveBeenCalled();
  });

  it('should stop listening successfully', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // Start listening first
    act(() => {
      result.current.startListening();
    });

    expect(result.current.isListening).toBe(true);

    act(() => {
      result.current.stopListening();
    });

    expect(result.current.isListening).toBe(false);
    expect(mockRecognition.stop).toHaveBeenCalled();
  });

  it('should handle speech recognition results', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    // Simulate speech recognition result
    const mockEvent = {
      results: [
        [
          {
            transcript: 'Hello world',
            confidence: 0.95,
          },
        ],
      ],
    };

    act(() => {
      if (mockRecognition.onresult) {
        mockRecognition.onresult(mockEvent);
      }
    });

    expect(result.current.transcript).toBe('Hello world');
  });

  it('should handle interim results', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    // Simulate interim results
    const mockEvent = {
      results: [
        [
          {
            transcript: 'Hello',
            confidence: 0.8,
          },
        ],
        [
          {
            transcript: 'Hello world',
            confidence: 0.9,
          },
        ],
      ],
    };

    act(() => {
      if (mockRecognition.onresult) {
        mockRecognition.onresult(mockEvent);
      }
    });

    expect(result.current.transcript).toBe('Hello world');
  });

  it('should handle speech recognition errors', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    // Simulate error
    const mockError = {
      error: 'no-speech',
    };

    act(() => {
      if (mockRecognition.onerror) {
        mockRecognition.onerror(mockError);
      }
    });

    expect(result.current.error).toBe('No speech was detected');
    expect(result.current.isListening).toBe(false);
  });

  it('should handle network errors', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    const mockError = {
      error: 'network',
    };

    act(() => {
      if (mockRecognition.onerror) {
        mockRecognition.onerror(mockError);
      }
    });

    expect(result.current.error).toBe('Network error occurred');
  });

  it('should handle permission denied errors', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    const mockError = {
      error: 'not-allowed',
    };

    act(() => {
      if (mockRecognition.onerror) {
        mockRecognition.onerror(mockError);
      }
    });

    expect(result.current.error).toBe('Microphone access denied');
  });

  it('should reset transcript after stopping', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // Start and get some transcript
    act(() => {
      result.current.startListening();
    });

    const mockEvent = {
      results: [
        [
          {
            transcript: 'Test transcript',
            confidence: 0.9,
          },
        ],
      ],
    };

    act(() => {
      if (mockRecognition.onresult) {
        mockRecognition.onresult(mockEvent);
      }
    });

    expect(result.current.transcript).toBe('Test transcript');

    act(() => {
      result.current.stopListening();
    });

    expect(result.current.transcript).toBe('');
  });

  it('should handle speech recognition end event', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    expect(result.current.isListening).toBe(true);

    act(() => {
      if (mockRecognition.onend) {
        mockRecognition.onend();
      }
    });

    expect(result.current.isListening).toBe(false);
  });

  it('should not start listening when already listening', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    const initialCallCount = mockRecognition.start.mock.calls.length;

    act(() => {
      result.current.startListening();
    });

    expect(mockRecognition.start.mock.calls.length).toBe(initialCallCount);
  });

  it('should configure language correctly', () => {
    const { result } = renderHook(() => useSpeechRecognition('es-ES'));

    act(() => {
      result.current.startListening();
    });

    expect(mockRecognition.lang).toBe('es-ES');
  });

  it('should handle continuous recognition', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening(true); // continuous = true
    });

    expect(mockRecognition.continuous).toBe(true);
  });
});