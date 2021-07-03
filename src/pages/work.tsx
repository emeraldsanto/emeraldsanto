import { Page } from "@components/page/page.component";
import { PeriodLink } from "@components/period-link/period-link.component";
import { CMS, ExperienceBlock, StoryPageProps, withEditable } from '@lib/storyblok';
import { motion, Variants } from "framer-motion";
import { Fragment } from "react";
import styled from 'styled-components';

function formatPeriod(experience: ExperienceBlock) {
  const start = new Date(experience.periodStart);
  const end = experience.periodEnd ? new Date(experience.periodEnd) : '...';

  return `${start.getMonth() + 1}/${start.getFullYear()} - ${typeof end === 'string' ? end : `${end.getMonth() + 1}/${end.getFullYear()}`}`
}

type WorkProps = StoryPageProps<{
  title: string
  presentation: string
  experiences: Array<ExperienceBlock>
}>

function Work({ story }: WorkProps) {
	return (
		<Page title={story.content.title}>
			<Container
				initial="hidden"
				animate="visible"
				variants={TEXT_VARIANTS}
			>
				<Title variants={SINGLE_TEXT_VARIANT}>
					{story.content.title} 🔨
				</Title>

				<Description variants={SINGLE_TEXT_VARIANT}>
					{story.content.presentation}
				</Description>

				{story.content.experiences.map((e, i) => (
					<Fragment key={e.employer}>
						<Experience variants={SINGLE_TEXT_VARIANT}>
							<div>
								<ExperienceTitle>
									<a href={e.url} target="_blank" rel="noopener">
										{e.employer}
									</a>
								</ExperienceTitle>
								
								{" "}

								<ExperienceLocation>
									{formatPeriod(e)}
								</ExperienceLocation>
							</div>

							<WorkTitle>
								{e.jobTitle}
								
								{" "}

								<ExperienceLocation>
									{e.location}
								</ExperienceLocation>
							</WorkTitle>

							<WorkDescription>
								{e.description}
							</WorkDescription>

							<hr />

							<Technologies>
								{e.tags.map((t) => (
									<Technology key={t.text}>
										{t.text}
									</Technology>
								))}
							</Technologies>
						</Experience>

						{i !== story.content.experiences.length - 1 && (
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

export const getStaticProps = CMS.getStaticProps('work');

export default withEditable(Work);

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
