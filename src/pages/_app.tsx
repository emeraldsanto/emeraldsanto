import { SideBar } from "@components/sidebar/sidebar.component";
import "@styles/globals.scss";
import "@styles/toasts.scss";
import { logPageView } from "@lib/analytics";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeComplete", logPageView);
		return () => router.events.off("routeChangeComplete", logPageView);
	}, [router.events]);

	return (
		<Fragment>
			<SideBar />

			<main className="root_component">
				<Component {...pageProps} />
			</main>

			<ToastContainer />
		</Fragment>
	);
};
