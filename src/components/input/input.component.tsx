import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes
} from "react";
import styled from 'styled-components';

export const Input: FC<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">> = (props) => {
	return <StyledInput {...props} />
};

export const TextArea: FC<Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref">> = (props) => {
	return <StyledTextArea {...props} />
};

const StyledInput = styled.input`
  height: 45px;
  outline: none;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 5px 10px 5px 10px;
  border: 1px solid lightgray;
  color: ${(props) => props.theme.colors.textColor};
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  outline: none;
  display: block;
  resize: vertical;
  min-height: 150px;
  border-radius: 6px;
  margin-bottom: 25px;
  font: 400 13.333333px Arial;
  border: 1px solid lightgray;
  color: ${(props) => props.theme.colors.textColor};
`;
