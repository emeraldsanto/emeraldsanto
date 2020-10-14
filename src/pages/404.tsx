import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/404.module.scss";
import { NextPage } from "next";

const NotFound: NextPage = () => {
	const { t } = i18n.useTranslation("404");

	return (
		<Page>
			<div className={styles.container}>
				<h1 className={styles.status}>404</h1>
				<p className={styles.title}>{t("title")}</p>
				<p className={styles.catch}>{t("catch")}</p>

				<Button
					className={styles.button}
					onClick={() => i18n.Router.push("/")}
				>
					<p>{t("cta")}</p>
				</Button>
			</div>
		</Page>
	);
};

export default NotFound;
