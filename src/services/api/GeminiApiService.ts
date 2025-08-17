import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../config/environment';
import { ApiResponse, ApiError } from '../../types';

export interface GeminiApiResponse {
  text: string;
  timestamp: number;
}

export class GeminiApiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (!environment.googleGenerativeAIApiKey) {
      console.warn('Google Generative AI API key is not configured');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(environment.googleGenerativeAIApiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error);
    }
  }

  public isConfigured(): boolean {
    return Boolean(environment.googleGenerativeAIApiKey) && this.genAI !== null;
  }

  private async fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async sendMessage(text: string, image?: File): Promise<ApiResponse<GeminiApiResponse>> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'AI API is not configured. Please check your environment variables.',
      };
    }

    try {
      const parts = [];
      
      if (text && text.trim()) {
        parts.push({ text });
      }
      
      if (image) {
        const imagePart = await this.fileToGenerativePart(image);
        parts.push(imagePart);
      }

      if (parts.length === 0) {
        return {
          success: false,
          error: 'Cannot send an empty message',
        };
      }

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts }],
      });

      const response = result.response;
      const aiText = response.text();

      return {
        success: true,
        data: {
          text: aiText,
          timestamp: Date.now(),
        },
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'API_ERROR',
        details: error,
      };

      console.error('Error calling Gemini API:', apiError);
      
      return {
        success: false,
        error: `Failed to get a response from the AI: ${apiError.message}`,
      };
    }
  }

  async sendTextMessage(text: string): Promise<ApiResponse<GeminiApiResponse>> {
    return this.sendMessage(text);
  }

  async sendImageMessage(text: string, image: File): Promise<ApiResponse<GeminiApiResponse>> {
    return this.sendMessage(text, image);
  }
}

export const geminiApiService = new GeminiApiService();