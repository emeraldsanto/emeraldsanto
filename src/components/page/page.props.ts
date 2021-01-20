import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PageProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> {
  title?: string;
}
