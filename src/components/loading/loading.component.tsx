import { motion, Transition, Variants } from 'framer-motion';
import { FC } from 'react';
import styled from 'styled-components';

export const Loading: FC = () => {
  return (
    <Container
      initial="start"
      animate="end"
      variants={LOADING_CONTAINER_VARIANTS}
    >
      <Circle
        variants={LOADING_CIRCLE_VARIANTS}
        transition={LOADING_CIRCLE_TRANSITION}
      ></Circle>

      <Circle
        variants={LOADING_CIRCLE_VARIANTS}
        transition={LOADING_CIRCLE_TRANSITION}
      ></Circle>

      <Circle
        variants={LOADING_CIRCLE_VARIANTS}
        transition={LOADING_CIRCLE_TRANSITION}
      ></Circle>
    </Container>
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
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const LOADING_CIRCLE_TRANSITION: Transition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

const Container = styled(motion.div)`
  display: flex;
`;

const Circle = styled(motion.span)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.backgroundColor};

  &:not(:first-child) {
    margin-left: 2px;
  }
`;
