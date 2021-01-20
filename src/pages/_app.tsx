import { SideBar } from "@components/sidebar/sidebar.component";
import "@styles/toasts.scss";
import { logPageView } from "@lib/analytics";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'contexts/theme/theme-provider';
import { Themes } from '@lib/design';
import styled, { createGlobalStyle } from 'styled-components';

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const router = useRouter();

	useEffect(
		() => {
			router.events.on("routeChangeComplete", logPageView);
			return () => router.events.off("routeChangeComplete", logPageView);
		},
		[router.events]
	);

	return (
		<ThemeProvider
			themes={[Themes.light, Themes.dark]}
			defaults={{ light: Themes.light, dark: Themes.dark }}
		>
			<GlobalStyle />

			<Fragment>
				<SideBar />

				<Main>
					<Component {...pageProps} />
				</Main>
			<ToastContainer />

			</Fragment>
		</ThemeProvider>
	);
};

const Main = styled.main`
  @media only screen and (min-width: 625px) {
		height: 100%;
		display: flex;
		flex-direction: column;
  }
`;

const GlobalStyle = createGlobalStyle`
	* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: ${(props) => props.theme.colors.backgroundColor};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Roboto Slab", serif;
    color: ${(props) => props.theme.colors.headingColor};
  }

  p,
  span {
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.colors.textColor};
  }

  h1 {
    font-size: 3em;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: ${(props) => props.theme.colors.accentColor};
  }
`;