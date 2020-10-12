import styles from "@styles/home.module.scss";
import Head from "next/head";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<img src="/static/assets/portrait.jpg" />
			</main>

			<footer className={styles.footer}>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
				>
					Powered by{" "}
					<img
						alt="Vercel Logo"
						src="/vercel.svg"
						className={styles.logo}
					/>
				</a>
			</footer>
		</div>
	);
}
