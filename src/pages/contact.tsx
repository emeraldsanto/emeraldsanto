import { Button } from "@components/button/button.component";
import { Input, TextArea } from "@components/input/input.component";
import { Loading } from "@components/loading/loading.component";
import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/contact.module.scss";
import { send } from "emailjs-com";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import {
	ChangeEvent,
	FormEvent,
	Fragment,
	useCallback,
	useReducer,
} from "react";
import { toast } from "react-toastify";
import env from "../../env.json";

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

	const { t } = i18n.useTranslation("contact");

	const isSmallFormFactor = (() => {
		if (typeof window === "undefined") {
			return false;
		}

		// Media query equivalent in CSS
		return document.body.clientWidth <= 815;
	})();

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			dispatch({
				name: event.target.name as any,
				payload: event.target.value,
			});
		},
		[dispatch]
	);

	const onFormSubmit = useCallback(
		async (event: FormEvent) => {
			dispatch({ name: "submit" });
			event.preventDefault();

			try {
				await send(
					env.email_js_service_id,
					env.email_js_template_id,
					{
						name,
						email,
						subject,
						message,
					},
					env.email_js_user_id
				);

				dispatch({ name: "success" });
				toast(t("sendSuccess"), { type: "success" });
			} catch (error) {
				dispatch({ name: "error" });
				toast(t("sendError"), { type: "error" });
			}
		},
		[t, name, email, subject, message, dispatch]
	);

	return (
		<Page>
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
						{t("title")}
					</motion.h1>

					<motion.p
						className={styles.description}
						variants={CHILD_VARIANTS}
					>
						{t("description")}
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
									placeholder={t("name")}
									className={styles.input}
									onChange={onInputChange}
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
									placeholder={t("email")}
									className={styles.input}
									onChange={onInputChange}
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
								placeholder={t("name")}
								className={styles.input}
								onChange={onInputChange}
							/>

							<Input
								required
								type="email"
								name="email"
								value={email}
								placeholder={t("email")}
								className={styles.input}
								onChange={onInputChange}
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
							placeholder={t("subject")}
						/>
					</motion.div>

					<motion.div variants={CHILD_VARIANTS}>
						<TextArea
							required
							name="message"
							value={message}
							onChange={onInputChange}
							placeholder={t("message")}
							className={styles.textarea}
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
								<p>{t("send")}</p>
							)}
						</Button>
					</motion.div>
				</motion.form>
			</div>
		</Page>
	);
};

Contact.getInitialProps = () => ({ namespacesRequired: ["contact"] });

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
