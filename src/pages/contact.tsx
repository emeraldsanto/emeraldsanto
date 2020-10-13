import { Button } from "@components/button/button.component";
import { Input, TextArea } from "@components/input/input.component";
import { Page } from "@components/page/page.component";
import i18n from "@localization/i18n";
import styles from "@styles/contact.module.scss";
import { NextPage } from "next";
import { FormEvent, useCallback, useState } from "react";

const Contact: NextPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const { t } = i18n.useTranslation("contact");

	const onFormSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();

			fetch("https://hooks.zapier.com/hooks/catch/8712179/ogg7il2", {
				method: "POST",
				body: JSON.stringify({
					name,
					email,
					subject,
					message,
				}),
			});
		},
		[name, email, subject, message]
	);

	return (
		<Page>
			<div className={styles.form_container}>
				<h1 className={styles.title}>{t("title")}</h1>

				<p className={styles.description}>{t("description")}</p>

				<form className={styles.form} onSubmit={onFormSubmit}>
					<div className={styles.row}>
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
					</div>

					<Input
						required
						name="subject"
						value={subject}
						className={styles.input}
						style={{ width: "100%" }}
						placeholder={t("subject")}
						onChange={(e) => setSubject(e.target.value)}
					/>

					<TextArea
						required
						name="message"
						value={message}
						placeholder={t("message")}
						className={styles.textarea}
						onChange={(e) => setMessage(e.target.value)}
					/>

					<div className={styles.submit_container}>
						<Button type="submit">
							<p>{t("send")}</p>
						</Button>
					</div>
				</form>
			</div>
		</Page>
	);
};

Contact.getInitialProps = () => ({ namespacesRequired: ["contact"] });

export default Contact;
