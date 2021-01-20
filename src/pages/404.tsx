import { Button } from "@components/button/button.component";
import { Page } from "@components/page/page.component";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styled from 'styled-components';

export default function NotFound() {
	const { t } = useTranslation();

	return (
    <Page>
      <Container>
        <Status>404</Status>
        <Title>{t("404:title")}</Title>
        <Catch>{t("404:catch")}</Catch>

        <Link href="/">
          <StyledButton>
            <p>{t("404:cta")}</p>
          </StyledButton>
        </Link>
      </Container>
    </Page>
  );
};

const Container = styled.div`
  width: 500px;

  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;

const Status = styled.h1`
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-size: 1.5em;
`;

const Catch = styled.p`
  margin: 20px 0 30px 0;
  text-align: justify;
`;

const StyledButton = styled(Button)`
  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;