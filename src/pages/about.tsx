import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import { NextPage } from "next";

const About: NextPage = () => {
	const { t } = i18n.useTranslation();

	return (
		<Page>
			<h1>Salut</h1>
		</Page>
	);
};

export default About;
