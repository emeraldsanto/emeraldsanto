import NextI18Next from "next-i18next";
import path from "path";

export const i18n = new NextI18Next({
	defaultLanguage: "en",
	otherLanguages: ["fr"],
	localePath: path.resolve("../public/static/locales"),
	localeSubpaths: {
		en: "en",
		fr: "fr",
	},
});
