import { Page } from "@components/page/page.component";
import { motion, Variants } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import styled from 'styled-components';

export default function About() {
	const { t } = useTranslation();

	return (
		<Page title={t("about:title")}>
			<Container>
				<Side
					initial="hidden"
					animate="visible"
					variants={TEXT_VARIANTS}
				>
					<Title variants={SINGLE_TEXT_VARIANT}>
						{t("about:title")} 🤔
					</Title>

					<Description variants={SINGLE_TEXT_VARIANT}>
						{t("about:firstParagraph")}
					</Description>

					<br />

					<Description variants={SINGLE_TEXT_VARIANT}>
						{t("about:secondParagraph")}
					</Description>

					<br />

					<Description variants={SINGLE_TEXT_VARIANT}>
						{t("about:thirdParagraph")}
					</Description>

					<br />

					<Description variants={SINGLE_TEXT_VARIANT}>
						{t("about:fourthParagraph")}
					</Description>
				</Side>

				<Side>
					<Portrait
						initial="hidden"
						animate="visible"
						variants={PORTRAIT_VARIANTS}
					>
						<Image
							width={350}
							height={350}
							objectFit="cover"
							src="/static/assets/portrait-min.jpg"
						/>
					</Portrait>
				</Side>
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  @media only screen and (max-width: 1000px) {
		flex-direction: column-reverse;
  }
`;

const Side = styled(motion.div)`
  display: flex;
  max-width: 500px;
  flex-direction: column;

  &:first-child {
    margin-right: 100px;
  }

  @media only screen and (max-width: 1000px) {
		&:first-child {
			margin-right: 0;
			margin-top: 25px;
		}
  }
`;

const Title = styled(motion.h1)`
  margin-bottom: 50px;

  @media only screen and (max-width: 1000px) {
		margin-bottom: 25px;
  }
`;

const Description = styled(motion.p)`
  line-height: 22px;
  text-align: justify;
`;

const Portrait = styled(motion.div)`
  width: 350px;
  height: 350px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 625px) {
		width: 150px;
		height: 150px;
  }
`;
