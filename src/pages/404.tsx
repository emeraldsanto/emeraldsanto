import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import styles from "@styles/404.module.scss";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const NotFound: NextPage = () => {
	const { t } = useTranslation();

	return (
		<Page>
			<div className={styles.container}>
				<h1 className={styles.status}>404</h1>
				<p className={styles.title}>{t("404:title")}</p>
				<p className={styles.catch}>{t("404:catch")}</p>

				<Link href="/">
					<Button className={styles.button}>
						<p>{t("404:cta")}</p>
					</Button>
				</Link>
			</div>
		</Page>
	);
};

export default NotFound;
