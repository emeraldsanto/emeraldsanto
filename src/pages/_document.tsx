import Document, {
	DocumentContext,
	DocumentInitialProps,
	DocumentProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";

interface AugmentedDocumentProps extends DocumentProps {
	language: string;
}

interface AugmentDocumentInitialProps extends DocumentInitialProps {
	language: string;
}

export default class LocalizedDocument extends Document<
	AugmentedDocumentProps
> {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<AugmentDocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		const language: string = (ctx.req as any)?.language || "en";

		return { ...initialProps, language };
	}

	render() {
		return (
			<Html lang={this.props.language}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
