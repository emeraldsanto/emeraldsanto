import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styled from 'styled-components';

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
          <Greeting>{t("home:greeting")}</Greeting>

          <Presentation>{t("home:presentation")}</Presentation>
        </motion.div>

        <Buttons
          initial="hidden"
          animate="visible"
          variants={BUTTON_VARIANTS}
        >
          {PAGES.map((p) => (
            <ButtonContainer key={p.url}>
              <motion.div variants={SINGLE_BUTTON_VARIANTS}>
                <Link href={p.url}>
                  <StyledButton type="button">
                    <p>{t(p.text)}</p>
                  </StyledButton>
                </Link>
              </motion.div>
            </ButtonContainer>
          ))}
        </Buttons>
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

const Greeting = styled.h1`
  font-size: 3em;
`;

const Presentation = styled.h1`
  font-size: 4em;
`;

const Buttons = styled(motion.div)`
  display: flex;
  margin-top: 35px;
  justify-content: space-between;

  @media only screen and (max-width: 625px) {
    .buttons {
      margin-top: 20px;
      flex-direction: column;
    }
  }
`;

const ButtonContainer = styled.div`
  &:not(:first-child) {
    margin-left: 15px;
  }

  @media only screen and (max-width: 625px) {
    &:not(:first-child) {
      margin-left: 0;
      margin-top: 15px;
    }

    &.button {
      width: 100%;
    }
  }
`;

const StyledButton = styled(Button)`
  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;
