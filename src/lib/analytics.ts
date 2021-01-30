import environment from './environment';

/**
 * Logs a manual page view for the provided URL.
 * See https://developers.google.com/analytics/devguides/collection/gtagjs/pages.
 * 
 * @param url The URL of the page to track.
 */
export function logPageView(url: string) {
	return window.gtag("config", environment.services.ga.trackingId, { page_path: url });
}
