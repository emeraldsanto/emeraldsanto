import {
	faGithubSquare,
	faLinkedin,
	faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@localization/i18n";
import { NextComponentType } from "next";
import { SideBarProps } from "./sidebar.props";
import styles from "./sidebar.style.module.scss";

const PAGES = [
	{
		text: "Home",
		url: "/",
	},
	{
		text: "About",
		url: "/about",
	},
];

const SOCIALS = [
	{
		icon: faGithubSquare,
		url: "https://www.github.com/emeraldsanto",
	},
	{
		icon: faLinkedin,
		url: "https://www.linkedin.com/in/yanick-belanger-dev",
	},
	{
		icon: faTwitterSquare,
		url: "https://www.twitter.com/yanthedev",
	},
];

export const SideBar: NextComponentType<SideBarProps> = (props) => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.routes_container}>
				{PAGES.map((p) => (
					<i18n.Link href={p.url}>
						<span className={styles.item}>{p.text}</span>
					</i18n.Link>
				))}
			</div>

			<div className={styles.icons_container}>
				{SOCIALS.map((s) => (
					<a href={s.url}>
						<FontAwesomeIcon
							size="lg"
							icon={s.icon}
							className={styles.item}
						/>
					</a>
				))}
			</div>
		</aside>
	);
};
