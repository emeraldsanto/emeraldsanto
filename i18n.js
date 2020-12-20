module.exports = {
	locales: ["en", "fr"],
	defaultLocale: "en",
	pages: {
	  "*": ["404"],
	  "/": ["home"],
	  "/about": ["about"],
	  "/work": ["work"],
	  "/contact": ["contact"]
	},
	loadLocaleFrom: async (lang, ns) => {
    const module = await import(`./public/static/locales/${lang}/${ns}.json`);
		return module.default;
	}
}