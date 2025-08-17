import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConversationDialogue } from '../ConversationDialogue';
import { useConversationStore } from '../../../store/conversationStore';
import { useConversation } from '../hooks/useConversation';

// Mock the store and hook
vi.mock('../../../store/conversationStore');
vi.mock('../hooks/useConversation');

// Mock the child components
jest.mock('../components/MessageList', () => ({
  MessageList: ({ messages }: { messages: any[] }) => (
    <div data-testid="message-list">
      {messages.map((msg, index) => (
        <div key={index} data-testid={`message-${index}`}>
          {msg.text}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('../components/InputSection', () => ({
  InputSection: ({ inputText, onInputChange, onSendMessage }: any) => (
    <div data-testid="input-section">
      <textarea 
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        data-testid="input-textarea"
      />
      <button onClick={onSendMessage} data-testid="send-btn">Send</button>
    </div>
  ),
}));

describe('ConversationDialogue Component', () => {
  const mockMessages = [
    { id: '1', text: 'Hello', role: 'user', timestamp: new Date() },
    { id: '2', text: 'Hi there!', role: 'assistant', timestamp: new Date() },
  ];

  const mockConversationHook = {
    inputText: '',
    setInputText: jest.fn(),
    attachedImage: null,
    setAttachedImage: jest.fn(),
    isLoading: false,
    error: null,
    isListening: false,
    startListening: jest.fn(),
    stopListening: jest.fn(),
    sendMessage: jest.fn(),
    clearImage: jest.fn(),
    clearError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useConversationStore as jest.Mock).mockReturnValue({
      messages: mockMessages,
      isLoading: false,
      error: null,
      clearConversation: jest.fn(),
    });

    (useConversation as jest.Mock).mockReturnValue(mockConversationHook);
  });

  it('should render the conversation dialogue with messages', () => {
    render(<ConversationDialogue />);

    expect(screen.getByTestId('message-list')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('should render desktop input area by default', () => {
    // Mock window.innerWidth to simulate desktop
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    
    render(<ConversationDialogue />);

    expect(screen.getByTestId('desktop-input')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-input')).not.toBeInTheDocument();
  });

  it('should render mobile input area on small screens', () => {
    // Mock window.innerWidth to simulate mobile
    Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
    
    render(<ConversationDialogue />);

    expect(screen.getByTestId('mobile-input')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-input')).not.toBeInTheDocument();
  });

  it('should handle input text changes', () => {
    render(<ConversationDialogue />);

    const input = screen.getByTestId('input-textarea');
    fireEvent.change(input, { target: { value: 'New message' } });

    expect(mockConversationHook.setInputText).toHaveBeenCalledWith('New message');
  });

  it('should handle send message', () => {
    render(<ConversationDialogue />);

    const sendBtn = screen.getByTestId('send-btn');
    fireEvent.click(sendBtn);

    expect(mockConversationHook.sendMessage).toHaveBeenCalled();
  });



  it('should handle empty messages array', () => {
    (useConversationStore as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      error: null,
      clearConversation: jest.fn(),
    });

    render(<ConversationDialogue />);

    expect(screen.getByTestId('message-list')).toBeInTheDocument();
  });
});