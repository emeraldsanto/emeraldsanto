// @ts-ignore https://github.com/isaachinman/next-i18next/issues/20#issuecomment-467026458
import { lngFromReq } from "next-i18next/dist/commonjs/utils";
import Document, {
	DocumentContext,
	DocumentInitialProps,
	DocumentProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";

type AugmentedDocumentProps<T> = T & { language: string };

export default class LocalizedDocument extends Document<
	AugmentedDocumentProps<DocumentProps>
> {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<AugmentedDocumentProps<DocumentInitialProps>> {
		const initialProps = await Document.getInitialProps(ctx);
		const language = lngFromReq(ctx.req);

		return { ...initialProps, language };
	}

	render() {
		return (
			<Html lang={this.props.language}>
				<Head>
					<meta
						name="description"
						content="Yanick Bélanger - Portfolio"
					/>

					<meta
						property="og:image"
						content="/static/assets/portrait-min.jpg"
					/>

					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap"
					></link>

					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto+Slab:wght@400;500;700&display=swap"
					></link>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
