export interface SpeechRecognitionConfig {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  timeout?: number;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface ISpeechRecognitionService {
  startRecognition(config?: SpeechRecognitionConfig): Promise<void>;
  stopRecognition(): void;
  isSupported(): boolean;
  isListening(): boolean;
  getTranscript(): string;
}

export class SpeechRecognitionService implements ISpeechRecognitionService {
  private static instance: SpeechRecognitionService;
  private recognition: SpeechRecognition | null = null;
  private isCurrentlyListening = false;
  private currentTranscript = '';
  private timeoutId: NodeJS.Timeout | null = null;

  public static getInstance(): SpeechRecognitionService {
    if (!SpeechRecognitionService.instance) {
      SpeechRecognitionService.instance = new SpeechRecognitionService();
    }
    return SpeechRecognitionService.instance;
  }

  constructor() {
    this.initializeRecognition();
  }

  private initializeRecognition(): void {
    if (!this.isSupported()) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
  }

  isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  isListening(): boolean {
    return this.isCurrentlyListening;
  }

  getTranscript(): string {
    return this.currentTranscript;
  }

  async startRecognition(config: SpeechRecognitionConfig = {}): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Speech recognition is not supported in this browser');
    }

    if (!this.recognition) {
      this.initializeRecognition();
    }

    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not initialized'));
        return;
      }

      this.recognition.continuous = config.continuous ?? false;
      this.recognition.interimResults = config.interimResults ?? true;
      this.recognition.lang = config.lang ?? 'en-US';

      this.recognition.onstart = () => {
        this.isCurrentlyListening = true;
        this.currentTranscript = '';
        resolve();
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        this.currentTranscript = finalTranscript || interimTranscript;
        
        // Reset timeout for auto-stop
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        
        if (config.timeout) {
          this.timeoutId = setTimeout(() => {
            this.stopRecognition();
          }, config.timeout);
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.isCurrentlyListening = false;
        reject(new Error(event.error));
      };

      this.recognition.onend = () => {
        this.isCurrentlyListening = false;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
      };

      this.recognition.start();
    });
  }

  stopRecognition(): void {
    if (this.recognition && this.isCurrentlyListening) {
      this.recognition.stop();
      this.isCurrentlyListening = false;
    }
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  clearTranscript(): void {
    this.currentTranscript = '';
  }
}

export const speechRecognitionService = SpeechRecognitionService.getInstance();