import { Theme } from 'contexts/theme/theme-context';

export enum Colors {
  TitanWhite = "#FBFBFF",
  SepiaBlack = "#0D0106",
  Danube = "#657ED4",
  DaisyBush = "#3626A7",
  RedOrange = "#FF331F",
  PickledBluewoord = "#34415E",
}

export const Themes: Record<'light' | 'dark', Theme> = {
  light: {
		name: 'default-light',
		dark: false,
		colors: {
			accentColor: Colors.RedOrange,
			borderColor: Colors.SepiaBlack,
			headingColor: Colors.SepiaBlack,
			textColor: Colors.PickledBluewoord,
			backgroundColor: Colors.TitanWhite,
		}
  },
  dark: {
		name: 'default-dark',
		dark: true,
		colors: {
			accentColor: Colors.RedOrange,
			borderColor: Colors.SepiaBlack,
			headingColor: Colors.TitanWhite,
			textColor: Colors.TitanWhite,
			backgroundColor: Colors.SepiaBlack,
		}
  },
};