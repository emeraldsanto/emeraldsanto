import { useTheme } from '@contexts/theme/theme-context';
import { Fragment, PropsWithChildren } from 'react';

export function Application(props: PropsWithChildren<{}>) {
	const { children } = props;
	const { theme } = useTheme();

	return (
    <Fragment>
      <main className="root-component">{children}</main>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: ${theme.colors.backgroundColor};
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        #__next {
          width: 100%;
          height: 100%;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: ${theme.colors.headingColor};
          font-family: "Roboto Slab", serif;
        }

        p,
        span {
          color: ${theme.colors.textColor};
          font-family: "Poppins", sans-serif;
        }

        h1 {
          font-size: 3em;
        }

        a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }

        a:hover {
          color: ${theme.colors.accentColor};
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @media only screen and (min-width: 625px) {
          .root-component {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </Fragment>
  );
}