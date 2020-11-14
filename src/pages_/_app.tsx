import { SideBar } from "@components/sidebar/sidebar.component";
import "@styles/globals.scss";
import "@styles/toasts.scss";
import { Analytics } from "lib/Analytics";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { FC, Fragment, useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const App: FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	const router = useRouter();

	const onRouteChange = useCallback(
		(url: string) => Analytics.logPageView(url),
		[]
	);

	useEffect(() => {
		router.events.on("routeChangeComplete", onRouteChange);
		return () => router.events.off("routeChangeComplete", onRouteChange);
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

export default App;
