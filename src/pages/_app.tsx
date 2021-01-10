import { SideBar } from "@components/sidebar/sidebar.component";
import "@styles/toasts.scss";
import { logPageView } from "@lib/analytics";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'contexts/theme/theme-provider';
import { Themes } from '@lib/design';
import { Application } from '@components/application/application.component';

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeComplete", logPageView);
		return () => router.events.off("routeChangeComplete", logPageView);
	}, [router.events]);

	return (
		<ThemeProvider
			themes={[Themes.light, Themes.dark]}
			defaults={{ light: Themes.light, dark: Themes.dark }}
		>
			<SideBar />

			<Application>
				<Component {...pageProps} />
			</Application>

			<ToastContainer />
		</ThemeProvider>
	);
};
