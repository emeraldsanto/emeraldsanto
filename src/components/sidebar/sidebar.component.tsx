import { LanguageSwitcher } from '@components/language-switcher/language-switcher.component';
import { useTheme } from '@contexts/theme/theme-context';
import {
	faGithubSquare,
	faLinkedin,
	faTwitterSquare
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from '@lib/design';
import Link from "next/link";
import { FC, Fragment } from "react";
import css from 'styled-jsx/css';

const SOCIALS = [
	{
		name: "GitHub",
		icon: faGithubSquare,
		url: "https://www.github.com/emeraldsanto",
	},
	{
		name: "LinkedIn",
		icon: faLinkedin,
		url: "https://www.linkedin.com/in/yanick-belanger-dev",
	},
	{
		name: "Twitter",
		icon: faTwitterSquare,
		url: "https://www.twitter.com/yanthedev",
	},
];

export const SideBar: FC = () => {
	const { theme } = useTheme();
	const switcherStyles = getSwitcherStyles();

	return (
    <Fragment>
      <aside className="sidebar">
        <Link href="/">
          <div className="initial">
            <h3>Y</h3>
          </div>
        </Link>

        <LanguageSwitcher className={switcherStyles.className} />

        <div className="routes-container">{/* TODO: ? */}</div>

        <div className="icons-container">
          {SOCIALS.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener"
              aria-label={s.name}
            >
              <FontAwesomeIcon size="lg" icon={s.icon} className="icon" />
            </a>
          ))}
        </div>
      </aside>

      <style jsx>{`
        .sidebar {
          width: 70px;
          height: 100%;
          display: flex;
          position: fixed;
          align-items: center;
          flex-direction: column;
          padding: 20px 0 20px 0;
          justify-content: space-between;
        }

        .sidebar .initial {
          width: 30px;
          height: 30px;
          display: flex;
          cursor: pointer;
          border-radius: 6px;
          align-items: center;
          transition: all 0.2s;
          justify-content: center;
          border: 1px solid ${Colors.SepiaBlack};
        }

        .sidebar .initial h3 {
          color: ${Colors.SepiaBlack};
        }

        .sidebar .initial:hover {
          border-color: ${theme.colors.accentColor};
        }

        .sidebar .initial:hover h3 {
          color: ${theme.colors.accentColor};
        }

        .sidebar .routes-container {
          flex: 1;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        }

        .sidebar .icons-container {
          display: flex;
          flex-direction: column;
        }

        .sidebar .icons-container .icon {
          margin-top: 15px;
          color: ${Colors.SepiaBlack};
          transition: color 0.2s;
        }

        .sidebar .icons-container .icon:hover {
          color: ${theme.colors.accentColor};
        }

        @media only screen and (max-width: 625px) {
          .sidebar {
            width: 100%;
            height: 70px;
            padding: 20px;
            position: static;
            flex-direction: row;
          }

          .sidebar .icons-container {
            flex-direction: row;
          }

          .sidebar .icons-container .icon {
            margin-top: 0;
            margin-left: 15px;
          }
        }
      `}</style>

      {switcherStyles.styles}
    </Fragment>
  );
};

function getSwitcherStyles() {
  return css.resolve`
    div {
      margin: 10px 0;
    }

    @media only screen and (max-width: 625px) {
      div {
        margin: 0 10px;
      }
    }
  `;
}
