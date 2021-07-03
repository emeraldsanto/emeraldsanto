import { ThemeContext } from './theme-context';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

export interface ThemeProviderProps {
	themes: Array<DefaultTheme>;
	defaults: {
		light: DefaultTheme;
		dark: DefaultTheme;
	};
}

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

function canMatchMedia() {
  return typeof window !== 'undefined' && window.matchMedia;
}

function getDefaultTheme(defaults: ThemeProviderProps['defaults'], dark?: boolean) {
  return dark ? defaults.dark : defaults.light;
}

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>): JSX.Element {
  const { themes, defaults, children } = props;
  const [theme, setTheme] = useState<DefaultTheme>(defaults.light);

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

      onThemePreferenceChange();

      window.matchMedia(DARK_MEDIA_QUERY).addEventListener('change', onThemePreferenceChange);
      return () => window.matchMedia(DARK_MEDIA_QUERY).removeEventListener('change', onThemePreferenceChange);
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
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}