import { palette } from '@/styles';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const notificationVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: { duration: 0.1 },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: { ease: 'easeOut', duration: 0.15 },
  },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
};

export default function Notification({ text, type }) {
  return (
    <Wrapper
      variants={notificationVariants} // Defined animation states
      whileHover="hover" // Animation on hover gesture
      initial="initial" // Starting animation
      animate="animate" // Values to animate to
      exit="exit" // Target to animate to when removed from the tree
    >
      <IconWrapper></IconWrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
}

const Wrapper = styled(motion.li)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  background: ${({ theme }) => theme.colors.tint.green[600]};
  color: ${palette.dark.gray[700]};
  border-radius: 0.3em;
`;
const IconWrapper = styled.i``;
const Text = styled.span``;
