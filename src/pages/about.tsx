import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/about.module.scss";
import { NextPage } from "next";

const About: NextPage = () => {
	const { t } = i18n.useTranslation("about");

	return (
		<Page>
			<div className={styles.container}>
				<div className={styles.side}>
					<h1 className={styles.title}>{t("title")}</h1>

					<p className={styles.description}>{t("firstParagraph")}</p>

					<br />

					<p className={styles.description}>{t("secondParagraph")}</p>

					<br />

					<p className={styles.description}>{t("thirdParagraph")}</p>

					<br />

					<p className={styles.description}>{t("fourthParagraph")}</p>
				</div>

				<div className={styles.side}>
					<div className={styles.portrait} />
				</div>
			</div>
		</Page>
	);
};

About.getInitialProps = () => ({
	namespacesRequired: ["about"],
});

export default About;
