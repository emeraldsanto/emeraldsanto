import Head from 'next/head';
import { FC } from 'react';
import styled from 'styled-components';
import { PageProps } from './page.props';

export const Page: FC<PageProps> = (props) => {
  const { title = 'Portfolio', children, ...rest } = props;
  return (
    <Container {...rest}>
      <Head>
        <title key="title">Yanick Bélanger - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  padding: 20px 100px 20px 100px;

  @media only screen and (max-width: 625px) {
    padding: 20px;
  }
`;


