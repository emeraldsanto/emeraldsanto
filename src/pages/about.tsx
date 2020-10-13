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
					<h1 className={styles.title}>À propos de moi 🤔</h1>

					<p className={styles.description}>
						I'm Yanick Bélanger, a mobile developer and freelancer
						based in Montreal, Canada. I specialize in
						cross-platform development using technologies such as
						React Native, Flutter, Kotlin, Swift and TypeScript.
					</p>

					<br />

					<p className={styles.description}>
						With that in mind, I also have a full-stack background
						from working on the web as well as on the back-end,
						primarily using C#, T-SQL, Node.JS, MongoDB and of
						course React.
					</p>

					<br />

					<p className={styles.description}>
						This is all very helpful when I find myself working
						alone on a project, which unfortunately happens more
						often than not.
					</p>

					<br />

					<p className={styles.description}>
						In my free time I enjoy photography, mountain biking,
						contributing to open-source software as well as watching
						macabre TV shows with my significant other.
					</p>
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
