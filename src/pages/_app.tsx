import { SideBar } from "@components/sidebar/sidebar.component";
import i18n from "@localization/i18n";
import "@styles/globals.scss";
import { default as NextApp } from "next/app";
import React from "react";

class App extends NextApp {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<div className="app">
				<SideBar />

				<Component {...pageProps} />
			</div>
		);
	}
}

export default i18n.appWithTranslation(App);
