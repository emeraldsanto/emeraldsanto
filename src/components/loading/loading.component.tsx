import { useTheme } from '@contexts/theme/theme-context';
import { motion, Transition, Variants } from "framer-motion";
import { FC, Fragment } from "react";

export const Loading: FC = () => {
	const { theme } = useTheme();

	return (
    <Fragment>
      <motion.div
        initial="start"
        animate="end"
        className="loading-container"
        variants={LOADING_CONTAINER_VARIANTS}
      >
        <motion.span
          className="loading-circle"
          variants={LOADING_CIRCLE_VARIANTS}
          transition={LOADING_CIRCLE_TRANSITION}
        ></motion.span>

        <motion.span
          className="loading-circle"
          variants={LOADING_CIRCLE_VARIANTS}
          transition={LOADING_CIRCLE_TRANSITION}
        ></motion.span>

        <motion.span
          className="loading-circle"
          variants={LOADING_CIRCLE_VARIANTS}
          transition={LOADING_CIRCLE_TRANSITION}
        ></motion.span>
      </motion.div>

      <style jsx global>{`
        .loading-container {
          display: flex;
        }

        .loading-container .loading-circle {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: ${theme.colors.backgroundColor};
        }

        .loading-container .loading-circle:not(:first-child) {
          margin-left: 2px;
        }
      `}</style>
    </Fragment>
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
