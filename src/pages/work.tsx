import { Page } from "@components/page/page.component";
import { PeriodLink } from "@components/period-link/period-link.component";
import { motion, Variants } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { Fragment } from "react";
import styled from 'styled-components';

function makei18nKey(experienceName: string, suffix: string) {
  return `work:${experienceName}.${suffix}`;
}

const EXPERIENCES = [
  {
    name: "moka",
    url: "https://www.moka.ai",
    technologies: ["Node.JS", "MongoDB", "PostgreSQL", "React Native"],
  },
  {
    name: "nightborn",
    url: "https://www.nightborn.be",
    technologies: ["React Native", "React.JS", "TypeScript", "C#", "T-SQL"],
  },
  {
    name: "alithya",
    url: "https://www.alithya.com",
    technologies: ["React Native", "TypeScript", "Node.JS"],
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
    ],
  },
  {
    name: "levelapp",
    url: "https://www.levelapp.be",
    technologies: ["React Native", "TypeScript"],
  },
].map((e) => ({
  ...e,
  name: makei18nKey(e.name, "name"),
  title: makei18nKey(e.name, "title"),
  period: makei18nKey(e.name, "period"),
  location: makei18nKey(e.name, "location"),
  description: makei18nKey(e.name, "description"),
}));

export default function Work() {
	const { t } = useTranslation();

	return (
		<Page title={t("work:title")}>
			<Container
				initial="hidden"
				animate="visible"
				variants={TEXT_VARIANTS}
			>
				<Title variants={SINGLE_TEXT_VARIANT}>
					{t("work:title")} 🔨
				</Title>

				<Description variants={SINGLE_TEXT_VARIANT}>
					{t("work:description")}
				</Description>

				{EXPERIENCES.map((e, i) => (
					<Fragment key={e.name}>
						<Experience variants={SINGLE_TEXT_VARIANT}>
							<div>
								<ExperienceTitle>
									<a
										href={e.url}
										target="_blank"
										rel="noopener"
									>
										{t(e.name)}
									</a>
								</ExperienceTitle>
								
								{" "}

								<ExperienceLocation>
									{t(e.period)}
								</ExperienceLocation>
							</div>

							<WorkTitle>
								{t(e.title)}
								
								{" "}

								<ExperienceLocation>
									{t(e.location)}
								</ExperienceLocation>
							</WorkTitle>

							<WorkDescription>
								{t(e.description)}
							</WorkDescription>

							<hr />

							<Technologies>
								{e.technologies.map((t) => (
									<Technology key={t}>
										{t}
									</Technology>
								))}
							</Technologies>
						</Experience>

						{i !== EXPERIENCES.length - 1 && (
							<motion.div variants={SINGLE_TEXT_VARIANT}>
								<PeriodLink />
							</motion.div>
						)}
					</Fragment>
				))}
			</Container>
		</Page>
	);
};

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

const Container = styled(motion.div)`
  width: 500px;

  @media only screen and (max-width: 625px) {
		width: 100%;
  }
`;

const Title = styled(motion.h1)`
  margin-bottom: 25px;
`;

const Description = styled(motion.p)`
  margin-bottom: 25px;
  text-align: justify;
`;

const Experience = styled(motion.div)`
  padding: 20px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.cardColor};
  box-shadow: ${(props) => !props.theme.dark && "0px 8px 15px rgba(0, 0, 0, 0.1)"};
`;

const ExperienceTitle = styled.h4`
  display: inline-block;
`;

const ExperienceLocation = styled.span`
  opacity: 0.75;
  font-size: 14px;
  font-weight: normal;
`;

const WorkTitle = styled.p`
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.headingColor};
`;

const WorkDescription = styled.p`
  margin: 15px 0;
  font-size: 14px;
  line-height: 22px;
  text-align: justify;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Technology = styled.span`
  opacity: 0.75;
  font-size: 14px;
  margin-top: 5px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
