import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/home.module.scss";
import { motion } from "framer-motion";
import { NextPage } from "next";

const Home: NextPage = (props) => {
	const { t } = i18n.useTranslation("home");

	return (
		<Page>
			<motion.div
				initial={{
					scale: 0.5,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
			>
				<h1 className={styles.greeting}>{t("greeting")}</h1>

				<h1 className={styles.presentation}>{t("presentation")}</h1>
			</motion.div>
		</Page>
	);
};

Home.getInitialProps = () => ({ namespacesRequired: ["home"] });

export default Home;
