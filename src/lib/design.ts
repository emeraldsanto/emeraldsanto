import { DefaultTheme } from 'styled-components';
import css from "styled-jsx/css";

export enum Colors {
  TitanWhite = "#FBFBFF",
  SepiaBlack = "#0D0106",
  Danube = "#657ED4",
  DaisyBush = "#3626A7",
  RedOrange = "#FF331F",
  PickledBluewoord = "#34415E",
}

export const Themes: Record<"light" | "dark", DefaultTheme> = {
  light: {
    name: "default-light",
    dark: false,
    colors: {
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
      accentColor: Colors.RedOrange,
      buttonColor: Colors.RedOrange,
      buttonTextColor: Colors.TitanWhite,
      buttonColorSecondary: Colors.DaisyBush,
      borderColor: Colors.SepiaBlack,
      headingColor: Colors.TitanWhite,
      textColor: Colors.TitanWhite,
      backgroundColor: Colors.SepiaBlack,
    },
  },
};

export function combineClassNames(className: string, style: string | ReturnType<typeof css['resolve']>) {
  return `${className} ${typeof style === "string" ? style : style.className}`;
}
