import { useTheme } from '@contexts/theme/theme-context';
import {
	DetailedHTMLProps,
	FC,
	Fragment,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from "react";

export const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
	const { theme } = useTheme();

	return (
    <Fragment>
      <input {...props} />

      <style jsx>{`
        input {
          height: 45px;
          outline: none;
          border-radius: 6px;
          margin-bottom: 20px;
          padding: 5px 10px 5px 10px;
          border: 1px solid lightgray;
          color: ${theme.colors.textColor};
        }
      `}</style>
    </Fragment>
  );
};

export const TextArea: FC<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = (props) => {
	const { theme } = useTheme();

	return (
    <Fragment>
      <textarea {...props} />

      <style jsx>{`
        textarea {
          padding: 10px;
          outline: none;
          display: block;
          resize: vertical;
          min-height: 150px;
          border-radius: 6px;
          margin-bottom: 25px;
          font: 400 13.333333px Arial;
          border: 1px solid lightgray;
          color: ${theme.colors.textColor};
        }
      `}</style>
    </Fragment>
  );
};
