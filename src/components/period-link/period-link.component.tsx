import { FC } from "react";
import styles from "./period-link.style.module.scss";

export const PeriodLink: FC = () => {
	return (
		<div className={styles.container}>
			<span className={styles.bullet} />
			<div className={styles.line} />
			<span className={styles.bullet} />
		</div>
	);
};
