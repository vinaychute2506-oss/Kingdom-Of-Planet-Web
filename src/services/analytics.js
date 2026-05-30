/**
 * Kingdom of Learning Preschool — Lightweight Clicks & Engagement Analytics Tracking
 */

/**
 * Tracks custom user actions and triggers custom Google Analytics events
 * 
 * @param {string} action - The action description (e.g. 'click', 'submit', 'filter')
 * @param {string} category - Category grouping (e.g. 'Inquiry', 'WhatsApp', 'Gallery')
 * @param {string} label - Context label description
 * @param {number} [value=null] - Optional numerical value
 */
export const trackEvent = (action, category, label, value = null) => {
  // Graceful local logging for development and debugging
  console.log(`[Analytics Trigger] Action: ${action} | Category: ${category} | Label: ${label}${value !== null ? ` | Value: ${value}` : ''}`);

  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    } catch (err) {
      console.warn('[Analytics] GA event dispatch failed:', err);
    }
  }
};
