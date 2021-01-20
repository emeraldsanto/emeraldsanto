import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { DetailedHTMLProps, FC, HTMLAttributes, useMemo } from 'react';
import i18n from "../../../i18n";

export const LanguageSwitcher: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
	const { lang } = useTranslation();
	const { pathname } = useRouter();

	const nextLanguage = useMemo(
		() => i18n.locales[i18n.locales.indexOf(lang) + 1] || i18n.locales[0],
		[lang]
	);

	return (
		<div {...props}>
			<Link key={nextLanguage} href={pathname} locale={nextLanguage}>
				{nextLanguage.toUpperCase()}
			</Link>
		</div>
	);
}