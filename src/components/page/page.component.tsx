import Head from "next/head";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import styles from "./page.style.module.scss";

export const Page: FC<DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>> = (props) => {
	const { className = "", children, ...rest } = props;
	return (
		<main className={`${styles.page} ${className}`} {...rest}>
			<Head>
				<title key="title">Yanick Bélanger - Portfolio</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}
		</main>
	);
};
