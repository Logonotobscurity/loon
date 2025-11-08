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

/**
 * A service for tracking analytics events.
 */
export class AnalyticsService implements IAnalyticsService {
  private static instance: AnalyticsService;

  /**
   * Gets the singleton instance of the AnalyticsService.
   *
   * @returns {AnalyticsService} The singleton instance.
   */
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Tracks a custom event.
   *
   * @param {string} event - The name of the event.
   * @param {Record<string, any>} [properties] - The properties of the event.
   */
  trackEvent(event: string, properties?: Record<string, any>): void {
    try {
      analyticsTrackEvent(event, properties);
    } catch (error) {
      console.warn('Failed to track event:', error);
    }
  }

  /**
   * Tracks a page view event.
   *
   * @param {string} pathname - The pathname of the page.
   */
  trackPageView(pathname: string): void {
    this.trackEvent('page_view', { pathname });
  }

  /**
   * Tracks a user action event.
   *
   * @param {string} action - The name of the action.
   * @param {Record<string, any>} [properties] - The properties of the action.
   */
  trackUserAction(action: string, properties?: Record<string, any>): void {
    this.trackEvent('user_action', { action, ...properties });
  }

  /**
   * Tracks an error event.
   *
   * @param {Error} error - The error to track.
   * @param {Record<string, any>} [context] - Additional context for the error.
   */
  trackError(error: Error, context?: Record<string, any>): void {
    this.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      ...context
    });
  }
}

export const analyticsService = AnalyticsService.getInstance();