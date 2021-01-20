import { LanguageSwitcher } from '@components/language-switcher/language-switcher.component';
import { faGithubSquare, faLinkedin, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from '@lib/design';
import Link from "next/link";
import { FC } from "react";
import styled from 'styled-components';

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
	return (
    <Aside>
      <Link href="/">
        <InitialWrapper>
          <Initial>Y</Initial>
        </InitialWrapper>
      </Link>

      <Switcher />

      <Routes>{/* TODO: ? */}</Routes>

      <Icons>
        {SOCIALS.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener"
            aria-label={s.name}
          >
            <FAIcon size="lg" icon={s.icon} />
          </a>
        ))}
      </Icons>
    </Aside>
  );
};

const Aside = styled.aside`
  width: 70px;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  padding: 20px 0 20px 0;
  justify-content: space-between;

  @media only screen and (max-width: 625px) {
    width: 100%;
    height: 70px;
    padding: 20px;
    position: static;
    flex-direction: row;
  }
`;

const InitialWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  cursor: pointer;
  border-radius: 6px;
  align-items: center;
  transition: all 0.2s;
  justify-content: center;
  border: 1px solid ${Colors.SepiaBlack};

  &:hover {
    border-color: ${(props) => props.theme.colors.accentColor};
  }
`;

const Initial = styled.h3`
  color: ${Colors.SepiaBlack};

  &:hover {
    color: ${(props) => props.theme.colors.accentColor};
  }
`;

const Switcher = styled(LanguageSwitcher)`
  margin: 10px 0;

  @media only screen and (max-width: 625px) {
    margin: 0 10px;
  }
`;

const Routes = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 625px) {
    flex-direction: row;
  }
`;

const FAIcon = styled(FontAwesomeIcon)`
  margin-top: 15px;
  transition: color 0.2s;
  color: ${Colors.SepiaBlack};

  @media only screen and (max-width: 625px) {
    margin-top: 0;
    margin-left: 15px;
  }
`;