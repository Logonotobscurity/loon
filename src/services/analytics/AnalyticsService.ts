import { trackEvent as analyticsTrackEvent } from '../../analytics/analytics';

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export interface IAnalyticsService {
  trackEvent(event: string, properties?: Record<string, any>): void;
  trackPageView(pathname: string): void;
  trackUserAction(action: string, properties?: Record<string, any>): void;
  trackError(error: Error, context?: Record<string, any>): void;
}

export class AnalyticsService implements IAnalyticsService {
  private static instance: AnalyticsService;

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  trackEvent(event: string, properties?: Record<string, any>): void {
    try {
      analyticsTrackEvent(event, properties);
    } catch (error) {
      console.warn('Failed to track event:', error);
    }
  }

  trackPageView(pathname: string): void {
    this.trackEvent('page_view', { pathname });
  }

  trackUserAction(action: string, properties?: Record<string, any>): void {
    this.trackEvent('user_action', { action, ...properties });
  }

  trackError(error: Error, context?: Record<string, any>): void {
    this.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      ...context
    });
  }
}

export const analyticsService = AnalyticsService.getInstance();