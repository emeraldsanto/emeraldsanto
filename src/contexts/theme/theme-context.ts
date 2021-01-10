import { Themes } from '@lib/design';
import { createContext, useContext } from 'react';

export interface Theme {
	name: string;
  dark: boolean;
  colors: {
    buttonColor: string;
    buttonColorSecondary: string;
    textColor: string;
    accentColor: string;
    borderColor: string;
    headingColor: string;
    backgroundColor: string;
  };
}

export interface ThemeContextValue {
	theme: Theme;
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