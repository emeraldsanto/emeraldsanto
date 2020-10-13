import {
	DetailedHTMLProps,
	FC,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from "react";
import styles from "./input.style.module.scss";

export const Input: FC<DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>> = (props) => {
	const { className = "", ...rest } = props;
	return <input {...rest} className={`${styles.input} ${className}`} />;
};

export const TextArea: FC<DetailedHTMLProps<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>> = (props) => {
	const { className = "", ...rest } = props;
	return <textarea {...rest} className={`${styles.textarea} ${className}`} />;
};
