
const environment = {
  services: {
    emailjs: {
      userId: process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID!,
      serviceId: process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
      templateId: process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
		},
		ga: {
			trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID!,
		},
    storyblock: {
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
    }
  },
};

export default environment;