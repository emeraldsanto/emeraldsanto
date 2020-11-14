import { Page } from "@components/page/page.component";
import { PeriodLink } from "@components/period-link/period-link.component";
import styles from "@styles/work.module.scss";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { Fragment } from "react";

const Work: NextPage = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("work:title")}>
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
					{t("work:title")} 🔨
				</motion.h1>

				<motion.p
					className={styles.description}
					variants={SINGLE_TEXT_VARIANT}
				>
					{t("work:description")}
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
		name: "moka",
		url: "https://www.moka.ai",
		technologies: ["Node.JS", "MongoDB", "PostgreSQL", "React Native"]
	},
	{
		name: "nightborn",
		url: "https://www.nightborn.be",
		technologies: ["React Native", "React.JS", "TypeScript", "C#", "T-SQL"]
	},
	{
		name: "alithya",
		url: "https://www.alithya.com",
		technologies: ["React Native", "TypeScript", "Node.JS"]
	},
	{
		name: "narcitymedia",
		url: "https://www.narcitymedia.com",
		technologies: [
			"React Native",
			"React.JS",
			"TypeScript",
			"Node.JS",
			"MongoDB",
		]
	},
	{
		name: "levelapp",
		url: "https://www.levelapp.be",
		technologies: ["React Native", "TypeScript"]
	},
].map(e => ({
	...e,
	name: makei18nKey(e.name, "name"),
	title: makei18nKey(e.name, "title"),
	period: makei18nKey(e.name, "period"),
	location: makei18nKey(e.name, "location"),
	description: makei18nKey(e.name, "description")
}));

function makei18nKey(experienceName: string, suffix: string) {
	return `work:${experienceName}.${suffix}`;
}