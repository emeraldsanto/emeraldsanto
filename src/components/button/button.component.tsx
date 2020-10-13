import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./button.style.module.scss";

export const Button: FC<DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>> = (props) => {
	const { className = "", ...rest } = props;
	return <button {...rest} className={`${styles.button} ${className}`} />;
};
