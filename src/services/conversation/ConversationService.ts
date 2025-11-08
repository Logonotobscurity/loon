import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../../types';
import { environment } from '../config/environment';
import { BI_GPT_IDENTITY_PROMPT } from '../../features/conversation/bigptconfig';
import { trackEvent } from '../../analytics/analytics';

export interface ConversationServiceConfig {
  modelName?: string;
  maxOutputTokens?: number;
  temperature?: number;
}

export interface SendMessageParams {
  text: string;
  image?: File;
  conversationHistory?: Message[];
  useRag?: boolean;
}

export interface SendMessageResult {
  response: string;
  usage?: any;
}

/**
 * A service for managing conversations with the AI.
 */
export class ConversationService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private config: ConversationServiceConfig;
  private conversationCache: Map<string, { response: string; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes TTL

  constructor(config: ConversationServiceConfig = {}) {
    this.config = {
      modelName: 'gemini-1.5-flash',
      maxOutputTokens: 2048,
      temperature: 0.7,
      ...config
    };

    // Initialize genAI safely - will be null if no API key
    this.genAI = environment.googleGenerativeAIApiKey ? new GoogleGenerativeAI(environment.googleGenerativeAIApiKey) : null;
    this.model = this.genAI ? this.genAI.getGenerativeModel({
      model: this.config.modelName,
      systemInstruction: BI_GPT_IDENTITY_PROMPT,
      generationConfig: {
        maxOutputTokens: this.config.maxOutputTokens,
        temperature: this.config.temperature,
      },
    }) : null;

    // Clean cache every 5 minutes
    setInterval(() => this.cleanCache(), this.CACHE_TTL);
  }

  /**
   * Checks if the AI service is configured.
   *
   * @returns {boolean} True if the service is configured, false otherwise.
   */
  public isConfigured(): boolean {
    return !!environment.googleGenerativeAIApiKey && this.genAI !== null && this.model !== null;
  }

  /**
   * Sends a message to the AI.
   *
   * @param {SendMessageParams} params - The parameters for sending the message.
   * @returns {Promise<SendMessageResult>} A promise that resolves with the AI's response.
   */
  public async sendMessage(params: SendMessageParams): Promise<SendMessageResult> {
    const { text, image, conversationHistory = [], useRag = false } = params;

    if (!this.isConfigured()) {
      throw new Error('AI service is not configured. Please check your VITE_GOOGLE_GENERATIVE_AI_API_KEY environment variable.');
    }

    try {
      trackEvent('conversation_message_sent', {
        has_image: !!image,
        message_length: text.length,
        conversation_length: conversationHistory.length,
        use_rag: useRag
      });

      let enhancedPrompt = text;
      
      // Add conversation context if available
      if (conversationHistory.length > 0) {
        const context = this.buildConversationContext(conversationHistory);
        enhancedPrompt = `${context}\n\nUser: ${text}`;
      }

      let result;
      if (image) {
        const imagePart = await this.fileToGenerativePart(image);
        result = await this.model.generateContent([enhancedPrompt, imagePart]);
      } else {
        result = await this.model.generateContent(enhancedPrompt);
      }

      const response = await result.response;
      const textResponse = response.text();

      // Cache the response
      const cacheKey = this.generateCacheKey(text, conversationHistory, !!image, useRag);
      this.conversationCache.set(cacheKey, {
        response: textResponse,
        timestamp: Date.now()
      });

      trackEvent('conversation_response_received', {
        response_length: textResponse.length,
        has_image: !!image
      });

      return {
        response: textResponse,
        usage: response.usageMetadata
      };

    } catch (error) {
      console.error('Error sending message to AI:', error);
      trackEvent('conversation_error', {
        error_type: error instanceof Error ? error.message : 'unknown_error'
      });
      throw this.handleError(error);
    }
  }

  /**
   * Generates a title from a message.
   *
   * @param {string} message - The message to generate a title from.
   * @returns {Promise<string>} A promise that resolves with the generated title.
   */
  public async generateTitleFromMessage(message: string): Promise<string> {
    try {
      const prompt = `Generate a concise, descriptive title (max 50 characters) for this conversation based on the first message: "${message}"`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim() || 'New Conversation';
    } catch (error) {
      console.error('Error generating title:', error);
      return 'New Conversation';
    }
  }

  private buildConversationContext(history: Message[]): string {
    const recentMessages = history.slice(-10); // Last 10 messages for context
    return recentMessages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }

  private async fileToGenerativePart(file: File): Promise<any> {
    const base64 = await this.fileToBase64(file);
    return {
      inlineData: {
        data: base64,
        mimeType: file.type,
      },
    };
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  }

  private generateCacheKey(text: string, history: Message[], hasImage: boolean, useRag: boolean): string {
    const historyHash = history.slice(-5).map(m => m.content.substring(0, 50)).join('|');
    return `${text.substring(0, 100)}|${historyHash}|${hasImage}|${useRag}`;
  }

  private cleanCache(): void {
    const now = Date.now();
    for (const [key, value] of this.conversationCache.entries()) {
      if (now - value.timestamp >= this.CACHE_TTL) {
        this.conversationCache.delete(key);
      }
    }
  }

  private handleError(error: any): Error {
    if (error.message?.includes('API key')) {
      return new Error('AI service configuration error. Please check your API key.');
    }
    if (error.message?.includes('quota')) {
      return new Error('Service temporarily unavailable. Please try again later.');
    }
    if (error.message?.includes('network')) {
      return new Error('Network error. Please check your connection.');
    }
    return new Error('Failed to process your message. Please try again.');
  }
}

export const conversationService = new ConversationService();