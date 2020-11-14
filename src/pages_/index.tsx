import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import styles from "@styles/index.module.scss";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Index: NextPage = () => {
	const { t } = useTranslation();

	return (
		<Page>
			<div>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={TEXT_VARIANTS}
				>
					<h1 className={styles.greeting}>{t("home:greeting")}</h1>

					<h1 className={styles.presentation}>{t("home:presentation")}</h1>
				</motion.div>

				<motion.div
					initial="hidden"
					animate="visible"
					className={styles.buttons}
					variants={BUTTON_VARIANTS}
				>
					{PAGES.map((p) => (
						<div key={p.url} className={styles.button_wrapper}>
							<motion.div variants={SINGLE_BUTTON_VARIANTS}>
								<Link href={p.url}>
									<Button
										type="button"
										className={styles.button}
									>
										<p>{t(p.text)}</p>
									</Button>
								</Link>
							</motion.div>
						</div>
					))}
				</motion.div>
			</div>
		</Page>
	);
};

export default Index;

const TEXT_VARIANTS: Variants = {
	hidden: {
		scale: 0.65,
		opacity: 0,
	},
	visible: {
		scale: 1,
		opacity: 1,
	},
};

const BUTTON_VARIANTS: Variants = {
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

const SINGLE_BUTTON_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		translateY: 50,
	},
	visible: {
		opacity: 1,
		translateY: 0,
	},
};

const PAGES = [
	{
		text: "home:aboutMe",
		url: "/about",
	},
	{
		text: "home:myWork",
		url: "/work",
	},
	{
		text: "home:contactMe",
		url: "/contact",
	},
];
