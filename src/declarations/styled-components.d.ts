import "styled-components";

interface IPalette {
  main: string;
  contrastText: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
		name: string;
		dark: boolean;
		colors: {
			cardColor: string;
			buttonColor: string;
			buttonTextColor: string;
			buttonColorSecondary: string;
			textColor: string;
			accentColor: string;
			borderColor: string;
			headingColor: string;
			backgroundColor: string;
		};
  }
}
