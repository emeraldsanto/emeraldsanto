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
		<Page>
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
					Mes projets 🔨
				</motion.h1>

				<motion.p
					className={styles.description}
					variants={SINGLE_TEXT_VARIANT}
				>
					Je suis généralement assez occupé car je dois gérer mon
					travail à temps plein, mes contrats de consultation ainsi
					que le developpement "open-source" et autres loisirs. Voici
					donc une liste non-exhaustive de mes expériences
					professionnelles depuis quelques années.
				</motion.p>

				{EXPERIENCES.map((e, i) => (
					<Fragment>
						<motion.div
							className={styles.experience}
							variants={SINGLE_TEXT_VARIANT}
						>
							<div>
								<h4>{e.name}</h4>{" "}
								<span className={styles.location}>
									{e.period}
								</span>
							</div>

							<p className={styles.work_title}>
								{e.title}{" "}
								<span className={styles.location}>
									{e.location}
								</span>
							</p>

							<p className={styles.work_description}>
								{e.description}
							</p>
							<hr />
							<div className={styles.tech_container}>
								{e.technologies.map((t) => (
									<span className={styles.tech}>{t}</span>
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
		name: "Alithya",
		title: "Mobile Developer",
		period: "08/2020 - Present",
		location: "Montréal, Canada",
		description:
			"Worked on full-stack contracts within the mobile team while mentoring and coaching other developers transitioning to React Native. My teachings included end-to-end testing with Detox, TypeScript fundamentals, targeting the browser with React Native Web, etc.",
		technologies: ["React Native", "TypeScript", "Node.JS"],
	},
	{
		name: "Nightborn",
		title: "Mobile Developer",
		period: "10/2019 - Present",
		location: "Brussels, Belgium",
		description:
			"Worked on many full-stack projects including payment systems, both web and mobile, for clients in the medical, real estate and financial sectors. All projects were built using React/React Native, TypeScript and .NET Core (C#).",
		technologies: ["React Native", "React.JS", "TypeScript", "C#", "T-SQL"],
	},
	{
		name: "Narcity Media",
		title: "Mobile Developer",
		period: "05/2019 - 08/2020",
		location: "Montréal, Canada",
		description:
			"Developed, deployed and maintained the Narcity mobile application from scratch, as the only mobile developer in an Agile (SCRUM) environment. This includes both front-end (React Native, TypeScript) and back-end (NodeJS, MongoDB). Contributed heavily to the Narcity website as well as the the in-house CMS (Preact, MongoDB) as well as collaborated with and challenged the design team to create an engaging user experience.",
		technologies: [
			"React Native",
			"React.JS",
			"TypeScript",
			"Node.JS",
			"MongoDB",
		],
	},
	{
		name: "Levelapp",
		period: "03/2019 - 05/2019",
		location: "Brussels, Belgium",
		title: "Mobile Developer (Intern)",
		description:
			"Rewrote an existing Xamarin application in React Native and TypeScript as a first experiment with this new framework within the agency, in an Agile (SCRUM) environment.",
		technologies: ["React Native", "TypeScript"],
	},
];
