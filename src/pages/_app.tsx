import { SideBar } from "@components/sidebar/sidebar.component";
import "@styles/globals.scss";
import { default as NextApp } from "next/app";
import { AppContextType } from "next/dist/next-server/lib/utils";
import { Router } from "next/router";
import React from "react";

class App extends NextApp {
	// Odd but required, see: https://github.com/isaachinman/next-i18next#3-project-setup
	static async getInitialProps(context: AppContextType<Router>) {
		return { ...(await NextApp.getInitialProps(context)) };
	}

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

export default App;
