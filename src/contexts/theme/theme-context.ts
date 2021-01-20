import { Themes } from '@lib/design';
import { createContext, useContext } from 'react';
import { DefaultTheme } from 'styled-components';

export interface ThemeContextValue {
	theme: DefaultTheme;
	changeTheme(name: string): void;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeContext = createContext<ThemeContextValue>({
	theme: Themes.light,
	changeTheme() {
		throw new Error("Could not find a ThemeProvider, did you forget to render one?");
	}
});