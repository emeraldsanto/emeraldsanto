const { locales, defaultLocale } = require('./i18n.json')

const localeSubpaths = {
	en: "en",
	fr: "fr",
};

module.exports = {
	i18n: { locales, defaultLocale },
	publicRuntimeConfig: { localeSubpaths }
};
