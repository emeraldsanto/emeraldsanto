import NextI18Next from "next-i18next";
import config from "next/config";
import path from "path";

export default new NextI18Next({
	defaultNS: "common",
	defaultLanguage: "en",
	otherLanguages: ["fr"],
	// The path is weird, not sure why but this works
	localePath: path.resolve("./public/static/locales"),
	localeSubpaths: config().publicRuntimeConfig.localeSubpaths,
});
