import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { DetailedHTMLProps, FC, HTMLAttributes, useMemo } from 'react';

export const LanguageSwitcher: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
	const { pathname, locale, locales = [], defaultLocale } = useRouter();

	const nextLanguage = useMemo(
		() => locales[locales.indexOf(locale!) + 1] || locales[0] || defaultLocale,
		[locale, locales, defaultLocale]
	);

	return (
		<div {...props}>
			<Link key={nextLanguage} href={pathname} locale={nextLanguage}>
				{nextLanguage?.toUpperCase()}
			</Link>
		</div>
	);
}