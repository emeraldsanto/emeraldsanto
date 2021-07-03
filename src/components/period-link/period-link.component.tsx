import { FC } from 'react';
import styled from 'styled-components';

export const PeriodLink: FC = () => {
  return (
    <Container>
      <Bullet />
      <Line />
      <Bullet />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px auto 10px auto;
`;

const Bullet = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.textColor};
`;

const Line = styled.div`
  width: 4px;
  height: 75px;
  margin: -4px 0 -4px 0;
  background-color: ${(props) => props.theme.colors.textColor};
`;
