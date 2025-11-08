export interface EnvironmentConfig {
  googleGenerativeAIApiKey: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

/**
 * The environment configuration for the application.
 */
export const environment: EnvironmentConfig = {
  googleGenerativeAIApiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};