import { motion, Transition, Variants } from "framer-motion";
import { FC } from "react";
import styles from "./loading.style.module.scss";

export const Loading: FC = () => {
	return (
		<motion.div
			initial="start"
			animate="end"
			className={styles.loading_container}
			variants={LOADING_CONTAINER_VARIANTS}
		>
			<motion.span
				className={styles.loading_circle}
				variants={LOADING_CIRCLE_VARIANTS}
				transition={LOADING_CIRCLE_TRANSITION}
			></motion.span>

			<motion.span
				className={styles.loading_circle}
				variants={LOADING_CIRCLE_VARIANTS}
				transition={LOADING_CIRCLE_TRANSITION}
			></motion.span>

			<motion.span
				className={styles.loading_circle}
				variants={LOADING_CIRCLE_VARIANTS}
				transition={LOADING_CIRCLE_TRANSITION}
			></motion.span>
		</motion.div>
	);
};

const LOADING_CONTAINER_VARIANTS: Variants = {
	start: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	end: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const LOADING_CIRCLE_VARIANTS: Variants = {
	start: {
		y: "0%",
	},
	end: {
		y: "100%",
	},
};

const LOADING_CIRCLE_TRANSITION: Transition = {
	duration: 0.5,
	yoyo: Infinity,
	ease: "easeInOut",
};
