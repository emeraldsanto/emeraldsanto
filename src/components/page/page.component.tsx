import Head from "next/head";
import { FC } from "react";
import { PageProps } from "./page.props";

export const Page: FC<PageProps> = (props) => {
	const { title = "Portfolio", className = "", children, ...rest } = props;
	return (
    <div className={`page ${className}`} {...rest}>
      <Head>
        <title key="title">Yanick Bélanger - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <style jsx>{`
        .page {
          margin: auto;
          padding: 20px 100px 20px 100px;
        }

        @media only screen and (max-width: 625px) {
          .page {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};


