type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params: {
        event_category: string;
        event_label?: string;
        value?: number;
      }
    ) => void;
  }
}

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}
