import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import { combineClassNames } from '@lib/design';
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Fragment } from 'react';
import css from 'styled-jsx/css';

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
	const buttonStyles = getButtonStyles();

	return (
    <Fragment>
      <Page>
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={TEXT_VARIANTS}
          >
            <h1 className="greeting">{t("home:greeting")}</h1>

            <h1 className="presentation">{t("home:presentation")}</h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={BUTTON_VARIANTS}
            className={combineClassNames("buttons", buttonStyles)}
          >
            {PAGES.map((p) => (
              <div key={p.url} className={combineClassNames("button-wrapper", buttonStyles)}>
                <motion.div variants={SINGLE_BUTTON_VARIANTS}>
                  <Link href={p.url}>
                    <Button type="button" className={combineClassNames("button", buttonStyles)}>
                      <p>{t(p.text)}</p>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </Page>

      <style jsx>{`
        .greeting {
          font-size: 3em;
        }

        .presentation {
          font-size: 4em;
        }
      `}</style>

			{buttonStyles.styles}
    </Fragment>
  );
};

export default Index;

function getButtonStyles() {
	return css.resolve`
    .buttons {
      display: flex;
      margin-top: 35px;
      justify-content: space-between;
    }

    .buttons .button-wrapper:not(:first-child) {
      margin-left: 15px;
    }

    @media only screen and (max-width: 625px) {
      .buttons {
        margin-top: 20px;
        flex-direction: column;
      }

      .buttons .button-wrapper:not(:first-child) {
        margin-left: 0;
        margin-top: 15px;
      }

      .buttons .button-wrapper .button {
        width: 100%;
      }
    }
  `;
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
