import "@styles/globals.css";
import { AppProps } from "next/app";
import { FC } from "react";

const App: FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	return <Component {...pageProps} />;
};

export default App;
