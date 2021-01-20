import environment from '@lib/environment';
import Document, {
	DocumentContext,
	DocumentProps,
	Head,
	Html,
	Main,
	NextScript
} from "next/document";
import { ServerStyleSheet } from 'styled-components';

export default class LocalizedDocument extends Document<DocumentProps> {
	
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () => originalRenderPage({
				enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
			});

      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
		} finally {
			sheet.seal();
		}
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Website showcasing the work and experience of Yanick Bélanger"
          />

          <meta property="og:image" content="/static/assets/portrait-min.jpg" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap"
          ></link>

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto+Slab:wght@400;500;700&display=swap"
          ></link>

          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=${environment.services.ga.trackingId}"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
								window.dataLayer = window.dataLayer || []; function
								gtag(){window.dataLayer.push(arguments)}
								gtag('js', new Date()); gtag('config', "${environment.services.ga.trackingId}");
							`,
            }}
          ></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
