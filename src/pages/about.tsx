import { Page } from "@components/page/page.component";
import styles from "@styles/about.module.scss";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const About: NextPage = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("about:title")}>
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
						{t("about:title")} 🤔
					</motion.h1>

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("about:firstParagraph")}
					</motion.p>

					<br />

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("about:secondParagraph")}
					</motion.p>

					<br />

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("about:thirdParagraph")}
					</motion.p>

					<br />

					<motion.p
						className={styles.description}
						variants={SINGLE_TEXT_VARIANT}
					>
						{t("about:fourthParagraph")}
					</motion.p>
				</motion.div>

				<div className={styles.side}>
					<motion.div
						initial="hidden"
						animate="visible"
						className={styles.portrait}
						variants={PORTRAIT_VARIANTS}
					>
						<Image
							width={350}
							height={350}
							objectFit="cover"
							src="/static/assets/portrait-min.jpg"
						/>
					</motion.div>
				</div>
			</div>
		</Page>
	);
};

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
