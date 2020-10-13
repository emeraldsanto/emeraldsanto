import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/index.module.scss";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";

const Index: NextPage = () => {
	const { t } = i18n.useTranslation("home");

	return (
		<Page>
			<div>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={TEXT_VARIANTS}
				>
					<h1 className={styles.greeting}>{t("greeting")}</h1>

					<h1 className={styles.presentation}>{t("presentation")}</h1>
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
								<Button
									type="button"
									className={styles.button}
									onClick={() => i18n.Router.push(p.url)}
								>
									<p>{t(p.text)}</p>
								</Button>
							</motion.div>
						</div>
					))}
				</motion.div>
			</div>
		</Page>
	);
};

Index.getInitialProps = () => ({ namespacesRequired: ["home"] });

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
		text: "aboutMe",
		url: "/about",
	},
	{
		text: "myWork",
		url: "/work",
	},
	{
		text: "contactMe",
		url: "/contact",
	},
];
