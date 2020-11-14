import { Page } from "@components/page/page.component";
import { PeriodLink } from "@components/period-link/period-link.component";
import i18n from "@localization/i18n";
import styles from "@styles/work.module.scss";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import { Fragment } from "react";

const Work: NextPage = () => {
	const { t } = i18n.useTranslation("work");

	return (
		<Page title={t("title")}>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={TEXT_VARIANTS}
				className={styles.container}
			>
				<motion.h1
					className={styles.title}
					variants={SINGLE_TEXT_VARIANT}
				>
					{t("title")} 🔨
				</motion.h1>

				<motion.p
					className={styles.description}
					variants={SINGLE_TEXT_VARIANT}
				>
					{t("description")}
				</motion.p>

				{EXPERIENCES.map((e, i) => (
					<Fragment key={e.name}>
						<motion.div
							className={styles.experience}
							variants={SINGLE_TEXT_VARIANT}
						>
							<div>
								<h4>
									<a
										href={e.url}
										target="_blank"
										rel="noopener"
									>
										{t(e.name)}
									</a>
								</h4>{" "}
								<span className={styles.location}>
									{t(e.period)}
								</span>
							</div>

							<p className={styles.work_title}>
								{t(e.title)}{" "}
								<span className={styles.location}>
									{t(e.location)}
								</span>
							</p>

							<p className={styles.work_description}>
								{t(e.description)}
							</p>
							<hr />
							<div className={styles.tech_container}>
								{e.technologies.map((t) => (
									<span key={t} className={styles.tech}>
										{t}
									</span>
								))}
							</div>
						</motion.div>

						{i !== EXPERIENCES.length - 1 && (
							<motion.div variants={SINGLE_TEXT_VARIANT}>
								<PeriodLink />
							</motion.div>
						)}
					</Fragment>
				))}
			</motion.div>
		</Page>
	);
};

Work.getInitialProps = () => ({ namespacesRequired: ["work"] });

export default Work;

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

const EXPERIENCES = [
	{
		name: "moka.name",
		title: "moka.title",
		period: "moka.period",
		location: "moka.location",
		url: "https://www.moka.ai",
		description: "moka.description",
		technologies: ["Node.JS", "MongoDB", "PostgreSQL", "React Native"],
	},
	{
		name: "alithya.name",
		title: "alithya.title",
		period: "alithya.period",
		location: "alithya.location",
		url: "https://www.alithya.com",
		description: "alithya.description",
		technologies: ["React Native", "TypeScript", "Node.JS"],
	},
	{
		name: "nightborn.name",
		title: "nightborn.title",
		period: "nightborn.period",
		location: "nightborn.location",
		url: "https://www.nightborn.be",
		description: "nightborn.description",
		technologies: ["React Native", "React.JS", "TypeScript", "C#", "T-SQL"],
	},
	{
		name: "narcitymedia.name",
		title: "narcitymedia.title",
		period: "narcitymedia.period",
		location: "narcitymedia.location",
		url: "https://www.narcitymedia.com",
		description: "narcitymedia.description",
		technologies: [
			"React Native",
			"React.JS",
			"TypeScript",
			"Node.JS",
			"MongoDB",
		],
	},
	{
		name: "levelapp.name",
		title: "levelapp.title",
		period: "levelapp.period",
		location: "levelapp.location",
		url: "https://www.levelapp.be",
		description: "levelapp.description",
		technologies: ["React Native", "TypeScript"],
	},
];
