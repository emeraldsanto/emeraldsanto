import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styled from 'styled-components';

export const Button: FC<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref'>> = (
  props
) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button`
  margin: 0;
  border: none;
  outline: none;
  display: flex;
  cursor: pointer;
  min-height: 52px;
  min-width: 120px;
  border-radius: 6px;
  padding: 15px 10px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease 0s;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.colors.buttonColor};

  &:hover {
    box-shadow: 0px 15px 20px rgba(54, 38, 167, 0.4);
    background-color: ${(props) => props.theme.colors.buttonColorSecondary};
  }

  p {
    font-size: 14px;
    text-align: center;
    color: ${(props) => props.theme.colors.buttonTextColor};
  }
`;
