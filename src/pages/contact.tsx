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
			<div style={{ maxWidth: 500 }}>
				<h1 className={styles.title}>{t("title")}</h1>

				<p className={styles.description}>
					T'as envie de me parler de ta nouvelle idée d'application
					mobile révolutionaire? T'es à la bonne place, n'oublie pas
					d'inclure le plus de détails possible pour m'aider à bien
					comprendre ta vision.
				</p>

				<form className={styles.form} onSubmit={onFormSubmit}>
					<div className={styles.row}>
						<input
							required
							value={name}
							placeholder={t("name")}
							className={styles.input}
							onChange={(e) => setName(e.target.value)}
						/>

						<input
							required
							value={email}
							placeholder={t("email")}
							className={styles.input}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<input
						required
						value={subject}
						className={styles.input}
						style={{ width: "100%" }}
						placeholder={t("subject")}
						onChange={(e) => setSubject(e.target.value)}
					/>

					<textarea
						required
						value={message}
						style={{ width: "100%" }}
						placeholder={t("message")}
						className={styles.textarea}
						onChange={(e) => setMessage(e.target.value)}
					/>

					<div className={styles.submit_container}>
						<button type="submit" className={styles.submit}>
							<p>{t("send")}</p>
						</button>
					</div>
				</form>
			</div>
		</Page>
	);
};

Contact.getInitialProps = () => ({ namespacesRequired: ["contact"] });

export default Contact;
