import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import { trackEvent } from '../analytics/analytics';

interface WebVitalsReport {
  name: string;
  value: number;
  delta?: number;
  id: string;
  navigationType?: string;
}

/**
 * A class to track web vitals and custom performance metrics.
 */
class WebVitalsTracker {
  private isInitialized = false;
  private vitals: WebVitalsReport[] = [];

  init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    
    this.isInitialized = true;
    
    // Track all web vitals
    getCLS(this.reportVital.bind(this));
    getFID(this.reportVital.bind(this));
    getFCP(this.reportVital.bind(this));
    getLCP(this.reportVital.bind(this));
    getTTFB(this.reportVital.bind(this));
  }

  private reportVital(metric: WebVitalsReport) {
    this.vitals.push(metric);
    
    // Send to analytics
    trackEvent('web_vital', {
      metric_name: metric.name,
      value: Math.round(metric.value * 100) / 100,
      delta: metric.delta ? Math.round(metric.delta * 100) / 100 : undefined,
      navigation_type: metric.navigationType || 'unknown',
    });

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`Web Vital: ${metric.name} = ${metric.value}`);
    }
  }

  getVitalsSummary() {
    return this.vitals.reduce((summary, vital) => {
      summary[vital.name] = {
        value: vital.value,
        delta: vital.delta,
      };
      return summary;
    }, {} as Record<string, { value: number; delta?: number }>);
  }

  // Performance monitoring utilities
  measureCustomMetric(name: string, startMark?: string, endMark?: string) {
    if (typeof window === 'undefined') return;

    try {
      let value: number;
      
      if (startMark && endMark) {
        const start = performance.getEntriesByName(startMark)[0]?.startTime || 0;
        const end = performance.getEntriesByName(endMark)[0]?.startTime || 0;
        value = end - start;
      } else {
        value = performance.now();
      }

      trackEvent('custom_performance_metric', {
        metric_name: name,
        value: Math.round(value * 100) / 100,
      });

      if (import.meta.env.DEV) {
        console.log(`Custom Metric: ${name} = ${value}ms`);
      }
    } catch (error) {
      console.error('Error measuring custom metric:', error);
    }
  }

  // Track user interaction performance
  trackInteraction(interactionType: string, callback: () => void) {
    const startTime = performance.now();
    
    try {
      callback();
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      trackEvent('user_interaction', {
        interaction_type: interactionType,
        duration: Math.round(duration * 100) / 100,
      });

      if (import.meta.env.DEV) {
        console.log(`Interaction: ${interactionType} took ${duration}ms`);
      }
    } catch (error) {
      trackEvent('user_interaction_error', {
        interaction_type: interactionType,
        error: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  // Check if Core Web Vitals are good
  areCoreWebVitalsGood() {
    const summary = this.getVitalsSummary();
    
    const thresholds = {
      CLS: 0.1,
      LCP: 2500,
      FID: 100,
    };

    return Object.entries(thresholds).every(([metric, threshold]) => {
      const value = summary[metric]?.value;
      return value !== undefined && value <= threshold;
    });
  }

  // Get performance recommendations
  getRecommendations() {
    const summary = this.getVitalsSummary();
    const recommendations: string[] = [];

    if (summary.LCP && summary.LCP.value > 2500) {
      recommendations.push('Optimize images and consider lazy loading');
    }

    if (summary.CLS && summary.CLS.value > 0.1) {
      recommendations.push('Reserve space for dynamic content to reduce layout shifts');
    }

    if (summary.FID && summary.FID.value > 100) {
      recommendations.push('Reduce JavaScript execution time and consider code splitting');
    }

    return recommendations;
  }
}

export const webVitalsTracker = new WebVitalsTracker();

// Initialize web vitals tracking
if (typeof window !== 'undefined') {
  webVitalsTracker.init();
}

/**
 * A React hook for using web vitals in components.
 *
 * @returns {object} An object with functions to get web vitals summary, check if core web vitals are good, get recommendations, measure custom metrics, and track interactions.
 */
// React hook for using web vitals in components
export const useWebVitals = () => {
  return {
    getVitalsSummary: () => webVitalsTracker.getVitalsSummary(),
    areCoreWebVitalsGood: () => webVitalsTracker.areCoreWebVitalsGood(),
    getRecommendations: () => webVitalsTracker.getRecommendations(),
    measureCustomMetric: webVitalsTracker.measureCustomMetric.bind(webVitalsTracker),
    trackInteraction: webVitalsTracker.trackInteraction.bind(webVitalsTracker),
  };
};