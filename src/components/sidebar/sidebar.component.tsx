import { LanguageSwitcher } from '@components/language-switcher/language-switcher.component';
import {
	faGithubSquare,
	faLinkedin,
	faTwitterSquare
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";
import styles from "./sidebar.style.module.scss";

const SOCIALS = [
	{
		name: "GitHub",
		icon: faGithubSquare,
		url: "https://www.github.com/emeraldsanto",
	},
	{
		name: "LinkedIn",
		icon: faLinkedin,
		url: "https://www.linkedin.com/in/yanick-belanger-dev",
	},
	{
		name: "Twitter",
		icon: faTwitterSquare,
		url: "https://www.twitter.com/yanthedev",
	},
];

export const SideBar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<Link href="/">
				<div className={styles.initial}>
					<h3>Y</h3>
				</div>
			</Link>

			<LanguageSwitcher className={styles.switcher} />

			<div className={styles.routes_container}>{/* TODO: ? */}</div>

			<div className={styles.icons_container}>
				{SOCIALS.map((s) => (
					<a
						key={s.url}
						href={s.url}
						target="_blank"
						rel="noopener"
						aria-label={s.name}
					>
						<FontAwesomeIcon
							size="lg"
							icon={s.icon}
							className={styles.icon}
						/>
					</a>
				))}
			</div>
		</aside>
	);
};
