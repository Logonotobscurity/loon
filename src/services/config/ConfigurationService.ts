export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  features: {
    speechRecognition: boolean;
    marketplace: boolean;
    conversationHistory: boolean;
  };
  storage: {
    prefix: string;
    encryption: boolean;
  };
}

export interface IConfigurationService {
  getConfig(): AppConfig;
  get<T extends keyof AppConfig>(key: T): AppConfig[T];
  isFeatureEnabled(feature: keyof AppConfig['features']): boolean;
  getApiUrl(endpoint?: string): string;
}

export class ConfigurationService implements IConfigurationService {
  private static instance: ConfigurationService;
  private config: AppConfig;

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }
    return ConfigurationService.instance;
  }

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    const env = import.meta.env;

    return {
      api: {
        baseUrl: env.VITE_API_BASE_URL || 'https://api.log-on.io',
        timeout: parseInt(env.VITE_API_TIMEOUT || '30000', 10),
        retries: parseInt(env.VITE_API_RETRIES || '3', 10),
      },
      analytics: {
        enabled: env.VITE_ANALYTICS_ENABLED === 'true',
        trackingId: env.VITE_ANALYTICS_TRACKING_ID,
      },
      features: {
        speechRecognition: env.VITE_FEATURE_SPEECH_RECOGNITION !== 'false',
        marketplace: env.VITE_FEATURE_MARKETPLACE !== 'false',
        conversationHistory: env.VITE_FEATURE_CONVERSATION_HISTORY !== 'false',
      },
      storage: {
        prefix: env.VITE_STORAGE_PREFIX || 'log_on',
        encryption: env.VITE_STORAGE_ENCRYPTION === 'true',
      },
    };
  }

  getConfig(): AppConfig {
    return this.config;
  }

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.config[key];
  }

  isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  getApiUrl(endpoint?: string): string {
    const baseUrl = this.config.api.baseUrl;
    return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
  }

  reloadConfig(): void {
    this.config = this.loadConfig();
  }
}

export const configurationService = ConfigurationService.getInstance();