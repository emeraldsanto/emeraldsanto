import { Button } from '@components/button/button.component';
import { Page } from '@components/page/page.component';
import { CMS, StoryPageProps, withEditable } from '@lib/storyblok';
import Link from 'next/link';
import styled from 'styled-components';

type NotFoundProps = StoryPageProps<{
  title: string;
  catch: string;
  buttonCTA: string;
}>;

function NotFound({ story }: NotFoundProps) {
  return (
    <Page>
      <Container>
        <Status>404</Status>
        <Title>{story.content.title}</Title>
        <Catch>{story.content.catch}</Catch>

        <Link href="/">
          <StyledButton>
            <p>{story.content.buttonCTA}</p>
          </StyledButton>
        </Link>
      </Container>
    </Page>
  );
}

export const getStaticProps = CMS.getStaticProps('not-found');

export default withEditable(NotFound);

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
