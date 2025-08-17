import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MessageList } from '../components/MessageList';

// Mock the store
vi.mock('../../../store/conversationStore');

// Mock the copy-to-clipboard functionality
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('MessageList Component', () => {
  const mockMessages = [
    {
      id: '1',
      text: 'Hello, how can I help you today?',
      role: 'assistant',
      timestamp: new Date('2024-01-01T10:00:00Z'),
    },
    {
      id: '2',
      text: 'I need help with my project',
      role: 'user',
      timestamp: new Date('2024-01-01T10:01:00Z'),
    },
    {
      id: '3',
      text: 'Sure, what kind of project are you working on?',
      role: 'assistant',
      timestamp: new Date('2024-01-01T10:02:00Z'),
    },
    {
      id: '4',
      text: 'A React application with AI integration',
      role: 'user',
      timestamp: new Date('2024-01-01T10:03:00Z'),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
  });

  it('should render empty state when no messages', () => {
    render(<MessageList messages={[]} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render all messages in correct order', () => {
    render(<MessageList messages={mockMessages} />);

    const messages = screen.getAllByRole('listitem');
    expect(messages).toHaveLength(4);
    
    // Check that messages are rendered in order
    expect(messages[0]).toHaveTextContent('Hello, how can I help you today?');
    expect(messages[1]).toHaveTextContent('I need help with my project');
    expect(messages[2]).toHaveTextContent('Sure, what kind of project are you working on?');
    expect(messages[3]).toHaveTextContent('A React application with AI integration');
  });

  it('should apply correct styling for user messages', () => {
    render(<MessageList messages={[mockMessages[1]]} />);

    const userMessage = screen.getByText('I need help with my project');
    const messageContainer = userMessage.closest('.message-item');
    
    expect(messageContainer).toHaveClass('message-user');
  });

  it('should apply correct styling for assistant messages', () => {
    render(<MessageList messages={[mockMessages[0]]} />);

    const assistantMessage = screen.getByText('Hello, how can I help you today?');
    const messageContainer = assistantMessage.closest('.message-item');
    
    expect(messageContainer).toHaveClass('message-assistant');
  });

  it('should display timestamps for each message', () => {
    render(<MessageList messages={mockMessages} />);

    const timestamps = screen.getAllByRole('time');
    expect(timestamps).toHaveLength(4);
    
    // Check that timestamps are properly formatted
    expect(timestamps[0]).toHaveTextContent('10:00 AM');
    expect(timestamps[1]).toHaveTextContent('10:01 AM');
  });

  it('should handle message with image content', () => {
    const messagesWithImage = [
      {
        id: '5',
        text: 'Here is an image',
        role: 'user',
        timestamp: new Date(),
        imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...',
      },
    ];

    render(<MessageList messages={messagesWithImage} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', messagesWithImage[0].imageUrl);
    expect(image).toHaveAttribute('alt', 'User uploaded image');
  });

  it('should handle message with code blocks', () => {
    const messagesWithCode = [
      {
        id: '6',
        text: '```javascript\nconsole.log("Hello World");\n```',
        role: 'assistant',
        timestamp: new Date(),
      },
    ];

    render(<MessageList messages={messagesWithCode} />);

    const codeBlock = screen.getByRole('code');
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock).toHaveTextContent('console.log("Hello World");');
  });

  it('should provide copy functionality for messages', async () => {
    const singleMessage = [mockMessages[0]];
    render(<MessageList messages={singleMessage} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello, how can I help you today?');
  });

  it('should auto-scroll to the latest message', () => {
    const { container } = render(<MessageList messages={mockMessages} />);
    
    const messageList = container.querySelector('.message-list');
    expect(messageList).toBeInTheDocument();
    
    // In a real test, we would check scroll behavior
    // This is a placeholder for scroll-to-bottom functionality
  });

  it('should handle very long messages', () => {
    const longMessage = {
      id: '7',
      text: 'This is a very long message that contains a lot of text to test how the component handles extremely long content. '.repeat(20),
      role: 'assistant',
      timestamp: new Date(),
    };

    render(<MessageList messages={[longMessage]} />);

    const messageElement = screen.getByText(/This is a very long message/);
    expect(messageElement).toBeInTheDocument();
    
    // Check that long messages are properly wrapped
    const messageContainer = messageElement.closest('.message-content');
    expect(messageContainer).toHaveStyle('word-wrap: break-word');
  });

  it('should handle messages with markdown formatting', () => {
    const markdownMessage = {
      id: '8',
      text: '**Bold text** and *italic text* and [link](https://example.com)',
      role: 'assistant',
      timestamp: new Date(),
    };

    render(<MessageList messages={[markdownMessage]} />);

    const boldText = screen.getByText('Bold text');
    expect(boldText).toBeInTheDocument();
    expect(boldText.tagName).toBe('STRONG');

    const italicText = screen.getByText('italic text');
    expect(italicText).toBeInTheDocument();
    expect(italicText.tagName).toBe('EM');

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});