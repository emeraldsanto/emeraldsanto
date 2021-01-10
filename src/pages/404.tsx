import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import { combineClassNames } from '@lib/design';
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Fragment } from 'react';
import css from 'styled-jsx/css';

const NotFound: NextPage = () => {
	const { t } = useTranslation();
	const buttonStyles = getButtonStyles();

	return (
    <Fragment>
      <Page>
        <div className="container">
          <h1 className="status">404</h1>
          <p className="title">{t("404:title")}</p>
          <p className="catch">{t("404:catch")}</p>

          <Link href="/">
            <Button className={combineClassNames("button", buttonStyles)}>
              <p>{t("404:cta")}</p>
            </Button>
          </Link>
        </div>
      </Page>

      <style jsx>{`
        .container {
          width: 500px;
        }

        .status {
          margin-bottom: 10px;
        }

        .title {
          font-size: 1.5em;
        }

        .catch {
          margin: 20px 0 30px 0;
          text-align: justify;
        }

        @media only screen and (max-width: 625px) {
          .container {
            width: 100%;
          }
        }
      `}</style>

			{buttonStyles.styles}
    </Fragment>
  );
};

export default NotFound;

function getButtonStyles() {
	return css.resolve`
    @media only screen and (max-width: 625px) {
      .button {
        width: 100%;
      }
    }
  `;
}
