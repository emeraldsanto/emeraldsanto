import { useTheme } from '@contexts/theme/theme-context';
import { FC, Fragment } from "react";

export const PeriodLink: FC = () => {
	const { theme } = useTheme();

	return (
    <Fragment>
      <div className="container">
        <span className="bullet" />
        <div className="line" />
        <span className="bullet" />
      </div>

      <style jsx>{`
				.container {
					display: flex;
					align-items: center;
					flex-direction: column;
					margin: 10px auto 10px auto;
				}

				.bullet {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: ${theme.colors.textColor};
				}

				.line {
					width: 4px;
					height: 75px;
					margin: -4px 0 -4px 0;
					background-color: ${theme.colors.textColor};
				}
			`}</style>
    </Fragment>
  );
};
