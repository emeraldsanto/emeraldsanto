import { Button } from "@components/button/button.component";
import { Input, TextArea } from "@components/input/input.component";
import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/contact.module.scss";
import { send } from "emailjs-com";
import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import { FormEvent, Fragment, useCallback, useState } from "react";
import env from "../../env.json";

const Contact: NextPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const { t } = i18n.useTranslation("contact");

	const isSmallFormFactor = (() => {
		if (typeof window === "undefined") {
			return false;
		}

		return document.body.clientWidth <= 815;
	})();

	const onFormSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();

			try {
				const result = await send(
					"contact_service",
					"contact_form",
					{
						name,
						email,
						subject,
						message,
					},
					env.email_js_user_id
				);
			} catch (error) {
				console.log(error);
			}
		},
		[name, email, subject, message]
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
									onChange={(e) => setName(e.target.value)}
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
									onChange={(e) => setEmail(e.target.value)}
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
								onChange={(e) => setName(e.target.value)}
							/>

							<Input
								required
								type="email"
								name="email"
								value={email}
								placeholder={t("email")}
								className={styles.input}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</motion.div>
					)}

					<motion.div variants={CHILD_VARIANTS}>
						<Input
							required
							name="subject"
							value={subject}
							className={styles.input}
							style={{ width: "100%" }}
							placeholder={t("subject")}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</motion.div>

					<motion.div variants={CHILD_VARIANTS}>
						<TextArea
							required
							name="message"
							value={message}
							placeholder={t("message")}
							className={styles.textarea}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</motion.div>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={BUTTON_VARIANTS}
						className={styles.submit_container}
					>
						<Button type="submit">
							<p>{t("send")}</p>
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
