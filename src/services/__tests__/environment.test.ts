import { EnvironmentService } from '../config/environment';

describe('EnvironmentService', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getGeminiApiKey', () => {
    it('should return API key from environment', () => {
      process.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY = 'test-key-123';
      const service = new EnvironmentService();
      expect(service.getGeminiApiKey()).toBe('test-key-123');
    });

    it('should throw error when API key is missing', () => {
      delete process.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;
      const service = new EnvironmentService();
      expect(() => service.getGeminiApiKey()).toThrow('VITE_GOOGLE_GENERATIVE_AI_API_KEY is required');
    });
  });

  describe('isProduction', () => {
    it('should return true in production', () => {
      process.env.NODE_ENV = 'production';
      const service = new EnvironmentService();
      expect(service.isProduction()).toBe(true);
    });

    it('should return false in development', () => {
      process.env.NODE_ENV = 'development';
      const service = new EnvironmentService();
      expect(service.isProduction()).toBe(false);
    });
  });

  describe('getApiTimeout', () => {
    it('should return default timeout', () => {
      const service = new EnvironmentService();
      expect(service.getApiTimeout()).toBe(30000);
    });

    it('should return custom timeout', () => {
      process.env.API_TIMEOUT = '60000';
      const service = new EnvironmentService();
      expect(service.getApiTimeout()).toBe(60000);
    });
  });
});