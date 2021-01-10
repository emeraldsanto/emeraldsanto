import css from "styled-jsx/css";
import { Theme, useTheme } from '@contexts/theme/theme-context';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, Fragment } from "react";

function getChildrenStyles(theme: Theme) {
	return css.resolve`
    button p {
      font-size: 14px;
      text-align: center;
      color: ${theme.colors.backgroundColor};
    }
  `;
}

export const Button: FC<DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>> = (props) => {
	const { theme } = useTheme();
	const childrenStyles = getChildrenStyles(theme);

	return (
    <Fragment>
      <button {...props} />

      <style jsx>{`
        button {
          margin: 0;
          border: none;
          outline: none;
          cursor: pointer;
          min-height: 52px;
          min-width: 120px;
          border-radius: 6px;
          padding: 15px 10px;
          transition: all 0.2s ease 0s;
          background-color: ${theme.colors.buttonColor};
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          background-color: ${theme.colors.buttonColorSecondary};
          box-shadow: 0px 15px 20px rgba(54, 38, 167, 0.4);
        }

        button > :global(p) {
          font-size: 14px;
          text-align: center;
          color: ${theme.colors.backgroundColor};
        }
      `}</style>
    </Fragment>
  );
};
