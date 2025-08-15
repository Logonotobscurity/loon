import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

let analytics: import('firebase/analytics').Analytics | null = null;

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

export function trackEvent(name: string, params?: Record<string, any>) {
  try {
    if (analytics) logEvent(analytics, name as any, params as any);
  } catch {
    // no-op
  }
}

export function trackPageView(path: string) {
  trackEvent('page_view', { page_path: path });
}

