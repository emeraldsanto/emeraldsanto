import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import { client } from '@lib/storyblok';
import { motion, Variants } from "framer-motion";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Story } from 'storyblok-js-client';
import styled from 'styled-components';
import i18n from '../../i18n';

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

export interface StoryProps {
  story: Story['data']['story']
  preview: boolean
}

export default function Index({ story }: StoryProps) {
  const { t } = useTranslation();

	return (
    <Page>
      <div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={TEXT_VARIANTS}
        >
          <Greeting>{story.content.greeting}</Greeting>

          <Presentation>{story.content.presentation}</Presentation>
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

export const getStaticProps: GetStaticProps<StoryProps> = async (context) => {
  const response = await client.getStory("home", {
    version: context.preview ? "draft" : "published",
    cv: context.preview ? Date.now() : undefined,
    language: context.locale,
  });
  
  return {
    props: {
      story: response.data.story,
      preview: context.preview ?? false
    },
    revalidate: 10
  }
}

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
    margin-top: 20px;
    flex-direction: column;
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
  }
`;

const StyledButton = styled(Button)`
  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;
