import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Theme, ThemeContext } from './theme-context';

export interface ThemeProviderProps {
	themes: Array<Theme>;
	defaults: {
		light: Theme;
		dark: Theme;
	};
}

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function canMatchMedia() {
	return typeof window !== "undefined" && window.matchMedia;
}

function getDefaultTheme(defaults: ThemeProviderProps['defaults'], dark?: boolean) {
	return dark ? defaults.dark : defaults.light;
}

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
	const { themes, defaults, children } = props;
	const [theme, setTheme] = useState<Theme>(() => {
		if (!canMatchMedia()) {
			return defaults.light;
		}

		return getDefaultTheme(defaults, window.matchMedia(DARK_MEDIA_QUERY).matches);
	});

	const onThemePreferenceChange = useCallback(
		() => {
			const prefersDark = window.matchMedia(DARK_MEDIA_QUERY).matches;

			if (prefersDark && !theme.dark) {
				setTheme(getDefaultTheme(defaults, true));
			} else if (!prefersDark && theme.dark) {
				setTheme(getDefaultTheme(defaults, false));
			}
		},	
		[theme, defaults]
	);

	useEffect(
		() => {
			if (!canMatchMedia()) {
				return;
			}

			window.matchMedia(DARK_MEDIA_QUERY).addEventListener("change", onThemePreferenceChange);
			return () => window.matchMedia(DARK_MEDIA_QUERY).removeEventListener("change", onThemePreferenceChange)
		},
		[onThemePreferenceChange]
	);

	const changeTheme = useCallback(
		(name: string) => {
			const target = themes.find(t => t.name === name);

			if (target) {
				setTheme(target);
			}
		},
		[themes, setTheme]
	);

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}