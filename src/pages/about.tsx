import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/about.module.scss";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";

const About: NextPage = () => {
	const { t } = i18n.useTranslation("about");

	return (
		<Page>
			<div className={styles.container}>
				<motion.div
					initial="hidden"
					animate="visible"
					className={styles.side}
					variants={TEXT_VARIANTS}
				>
					<motion.h1
						className={styles.title}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("title")}
					</motion.h1>

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("firstParagraph")}
					</motion.p>

					<br />

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("secondParagraph")}
					</motion.p>

					<br />

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("thirdParagraph")}
					</motion.p>

					<br />

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("fourthParagraph")}
					</motion.p>
				</motion.div>

				<div className={styles.side}>
					<motion.div
						initial="hidden"
						animate="visible"
						className={styles.portrait}
						variants={PORTRAIT_VARIANTS}
					/>
				</div>
			</div>
		</Page>
	);
};

About.getInitialProps = () => ({
	namespacesRequired: ["about"],
});

export default About;

const TEXT_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const SINGLE_TEXT_VARIANT: Variants = {
	hidden: {
		opacity: 0,
		translateX: -50,
	},
	visible: {
		opacity: 1,
		translateX: 0,
	},
};

const PORTRAIT_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		translateX: 50,
	},
	visible: {
		opacity: 1,
		translateX: 0,
	},
};
