import {
	faGithubSquare,
	faLinkedin,
	faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextComponentType } from "next";
import { SideBarProps } from "./sidebar.props";
import styles from "./sidebar.style.module.scss";

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
			<p className={styles.initial}>Y</p>

			<div className={styles.icons_container}>
				{SOCIALS.map((s) => (
					<a href={s.url}>
						<FontAwesomeIcon
							size="2x"
							icon={s.icon}
							className={styles.icon}
						/>
					</a>
				))}
			</div>
		</aside>
	);
};
