export interface EnvironmentConfig {
  googleGenerativeAIApiKey: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

const requiredEnvVars = {
  VITE_GOOGLE_GENERATIVE_AI_API_KEY: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
};

// Validate all required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const environment: EnvironmentConfig = {
  googleGenerativeAIApiKey: requiredEnvVars.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};