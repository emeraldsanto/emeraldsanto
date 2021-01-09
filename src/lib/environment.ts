
const environment = {
  services: {
    emailjs: {
      userId: process.env.EMAIL_JS_USER_ID!,
      serviceId: process.env.EMAIL_JS_SERVICE_ID!,
      templateId: process.env.EMAIL_JS_TEMPLATE_ID!,
		},
		ga: {
			trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID!,
		}
  },
};

export default environment;