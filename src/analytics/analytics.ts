import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

let analytics: import('firebase/analytics').Analytics | null = null;

// Analytics batching and debouncing
interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
  timestamp: number;
}

const eventQueue: AnalyticsEvent[] = [];
let batchTimer: NodeJS.Timeout | null = null;
let lastEventTime = 0;
const BATCH_DELAY = 1000; // 1 second batching
const RATE_LIMIT_DELAY = 5000; // 5 seconds rate limiting

function getConfig() {
  const cfg = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  } as Record<string, string | undefined>;
  const ok = Object.values(cfg).some(Boolean);
  return ok ? (cfg as any) : null;
}

export async function initAnalytics() {
  try {
    const cfg = getConfig();
    if (!cfg) return;
    const app = initializeApp(cfg);
    if (await isSupported()) {
      analytics = getAnalytics(app);
    }
  } catch {
    analytics = null;
  }
}

function processEventQueue() {
  if (eventQueue.length === 0) return;

  const now = Date.now();
  if (now - lastEventTime < RATE_LIMIT_DELAY) {
    // Rate limit hit, reschedule
    scheduleBatchProcessing();
    return;
  }

  // Process batched events
  const events = [...eventQueue];
  eventQueue.length = 0;

  events.forEach(event => {
    try {
      if (analytics) logEvent(analytics, event.name as any, event.params as any);
    } catch {
      // no-op
    }
  });

  lastEventTime = now;
  batchTimer = null;
}

function scheduleBatchProcessing() {
  if (batchTimer) return;
  batchTimer = setTimeout(processEventQueue, BATCH_DELAY);
}

export function trackEvent(name: string, params?: Record<string, any>) {
  // Add to queue for batching
  eventQueue.push({
    name,
    params,
    timestamp: Date.now()
  });

  scheduleBatchProcessing();
}

export function trackPageView(path: string) {
  trackEvent('page_view', { page_path: path });
}

