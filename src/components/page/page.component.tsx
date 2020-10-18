import Head from "next/head";
import { FC } from "react";
import { PageProps } from "./page.props";
import styles from "./page.style.module.scss";

export const Page: FC<PageProps> = (props) => {
	const { title = "Portfolio", className = "", children, ...rest } = props;
	return (
		<main className={`${styles.page} ${className}`} {...rest}>
			<Head>
				<title key="title">Yanick Bélanger - {title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}
		</main>
	);
};
