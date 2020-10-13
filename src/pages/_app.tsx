import { SideBar } from "@components/sidebar/sidebar.component";
import i18n from "@localization/i18n";
import "@styles/globals.scss";
import "@styles/toasts.scss";
import { default as NextApp } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";

class App extends NextApp {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<div className="app">
				<SideBar />

				<Component {...pageProps} />

				<ToastContainer />
			</div>
		);
	}
}

export default i18n.appWithTranslation(App);
