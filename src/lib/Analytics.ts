export class Analytics {
	static readonly TRACKING_ID = "G-WTWWD80C1D";

	/**
	 * Logs a manual page view for the provided URL.
	 * See https://developers.google.com/analytics/devguides/collection/gtagjs/pages.
	 * @param url
	 */
	static logPageView(url: string) {
		window.gtag("config", Analytics.TRACKING_ID, { page_path: url });
	}
}
