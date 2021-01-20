import { DefaultTheme } from 'styled-components';
import css from "styled-jsx/css";

export enum Colors {
  Danube = "#657ED4",
  DaisyBush = "#3626A7",
  Eclipse = "#393939",
  Nero = "#2C2C2C",
  PickledBluewoord = "#34415E",
  RedOrange = "#FF331F",
  SepiaBlack = "#0D0106",
  TitanWhite = "#FBFBFF",
}

export const Themes: Record<"light" | "dark", DefaultTheme> = {
  light: {
    name: "default-light",
    dark: false,
    colors: {
      cardColor: Colors.TitanWhite,
      accentColor: Colors.RedOrange,
      buttonColor: Colors.RedOrange,
      buttonTextColor: Colors.TitanWhite,
      buttonColorSecondary: Colors.DaisyBush,
      borderColor: Colors.SepiaBlack,
      headingColor: Colors.SepiaBlack,
      textColor: Colors.PickledBluewoord,
      backgroundColor: Colors.TitanWhite,
    },
  },
  dark: {
    name: "default-dark",
    dark: true,
    colors: {
      cardColor: Colors.Eclipse,
      accentColor: Colors.RedOrange,
      buttonColor: Colors.RedOrange,
      buttonTextColor: Colors.TitanWhite,
      buttonColorSecondary: Colors.DaisyBush,
      borderColor: Colors.SepiaBlack,
      headingColor: Colors.TitanWhite,
      textColor: Colors.TitanWhite,
      backgroundColor: Colors.Nero,
    },
  },
};

export function combineClassNames(className: string, style: string | ReturnType<typeof css['resolve']>) {
  return `${className} ${typeof style === "string" ? style : style.className}`;
}
