import { Button } from "@components/button/button.component";
import { Input, TextArea } from "@components/input/input.component";
import { Loading } from "@components/loading/loading.component";
import { Page } from "@components/page/page.component";
import styles from "@styles/contact.module.scss";
import { send } from "emailjs-com";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import {
	ChangeEvent,
	FormEvent,
	Fragment,
	useCallback,
	useMemo,
	useReducer
} from "react";
import { toast } from "react-toastify";
import environment from "@lib/environment";
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useIsSmallFormFactor } from '@hooks/useIsSmallFormFactor';

interface ContactState {
	name: string;
	email: string;
	subject: string;
	message: string;
	status: "idle" | "loading" | "error";
}

type ContactAction =
	| { name: "error" }
	| { name: "submit" }
	| { name: "success" }
	| { name: "name"; payload: ContactState["name"] }
	| { name: "email"; payload: ContactState["email"] }
	| { name: "subject"; payload: ContactState["subject"] }
	| { name: "message"; payload: ContactState["message"] };

const INITIAL_STATE: ContactState = {
	name: "",
	email: "",
	subject: "",
	message: "",
	status: "idle",
};

function contactReducer(
	state: ContactState,
	action: ContactAction
): ContactState {
	switch (action.name) {
		case "success":
			return INITIAL_STATE;
		case "error":
			return {
				...state,
				status: "error",
			};
		case "submit":
			return {
				...state,
				status: "loading",
			};
		default:
			return {
				...state,
				[action.name]: [action.payload],
			};
	}
}

const Contact: NextPage = () => {
	const [{ name, email, subject, message, status }, dispatch] = useReducer(
		contactReducer,
		INITIAL_STATE
	);

	const { t } = useTranslation();
	const isSmallFormFactor = useIsSmallFormFactor();
		
	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			dispatch({
				name: event.target.name as ContactAction['name'],
				payload: event.target.value,
			});
		},
		[dispatch]
	);

	const onFormSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();
			dispatch({ name: "submit" });

			try {
				await send(
          environment.services.emailjs.serviceId,
          environment.services.emailjs.templateId,
          {
            name,
            email,
            subject,
            message,
          },
          environment.services.emailjs.userId
        );

				dispatch({ name: "success" });
				toast(t("contact:sendSuccess"), { type: "success" });
			} catch (error) {
				dispatch({ name: "error" });
				toast(t("contact:sendError"), { type: "error" });
			}
		},
		[t, name, email, subject, message, dispatch]
	);

	return (
		<Page title={t("contact:title")}>
			<div className={styles.form_container}>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={FADE_VARIANTS}
				>
					<motion.h1
						className={styles.title}
						variants={CHILD_VARIANTS}
					>
						{t("contact:title")} 📬
					</motion.h1>

					<motion.p
						className={styles.description}
						variants={CHILD_VARIANTS}
					>
						{t("contact:description")}
					</motion.p>
				</motion.div>

				<motion.form
					initial="hidden"
					animate="visible"
					className={styles.form}
					onSubmit={onFormSubmit}
					variants={DELAY_FADE_VARIANTS}
				>
					{isSmallFormFactor ? (
						<Fragment>
							<motion.div
								className={styles.row}
								variants={CHILD_VARIANTS}
							>
								<Input
									required
									name="name"
									value={name}
									className={styles.input}
									onChange={onInputChange}
									placeholder={t("contact:name")}
								/>
							</motion.div>

							<motion.div
								className={styles.row}
								variants={CHILD_VARIANTS}
							>
								<Input
									required
									type="email"
									name="email"
									value={email}
									className={styles.input}
									onChange={onInputChange}
									placeholder={t("contact:email")}
								/>
							</motion.div>
						</Fragment>
					) : (
						<motion.div
							className={styles.row}
							variants={CHILD_VARIANTS}
						>
							<Input
								required
								name="name"
								value={name}
								className={styles.input}
								onChange={onInputChange}
								placeholder={t("contact:name")}
							/>

							<Input
								required
								type="email"
								name="email"
								value={email}
								className={styles.input}
								onChange={onInputChange}
								placeholder={t("contact:email")}
							/>
						</motion.div>
					)}

					<motion.div variants={CHILD_VARIANTS}>
						<Input
							required
							name="subject"
							value={subject}
							onChange={onInputChange}
							className={styles.input}
							style={{ width: "100%" }}
							placeholder={t("contact:subject")}
						/>
					</motion.div>

					<motion.div variants={CHILD_VARIANTS}>
						<TextArea
							required
							name="message"
							value={message}
							onChange={onInputChange}
							className={styles.textarea}
							placeholder={t("contact:message")}
						/>
					</motion.div>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={BUTTON_VARIANTS}
						className={styles.submit_container}
					>
						<Button
							type="submit"
							className={styles.submit}
							disabled={status === "loading"}
						>
							{status === "loading" ? (
								<Loading />
							) : (
								<p>{t("contact:send")}</p>
							)}
						</Button>
					</motion.div>
				</motion.form>
			</div>
		</Page>
	);
};

export default Contact;

const FADE_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const DELAY_FADE_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.2,
		},
	},
};

const CHILD_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		translateX: -50,
	},
	visible: {
		opacity: 1,
		translateX: 0,
	},
};

const BUTTON_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.65,
	},
	visible: {
		scale: 1,
		opacity: 1,
	},
};
