import { fontSizes, palette, spacing } from '@/styles';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';

const solidStyle = ({ props, theme }) => {
  const baseSolidStyle = {
    background: theme.colors.text.secondary,
    color: theme.colors.background,
    backgroundColor: theme.colors.text.primary,
  };

  const background =
    (props.primary && theme.colors.tint.blue[500]) ||
    (props.secondary && theme.colors.tint.coral[500]) ||
    baseSolidStyle.background;

  const color =
    (props.primary && palette.light.gray[200]) || (props.secondary && palette.light.gray[200]) || baseSolidStyle.color;

  const backgroundColor =
    (props.primary && theme.colors.tint.blue[600]) ||
    (props.secondary && theme.colors.tint.coral[600]) ||
    baseSolidStyle.backgroundColor;

  const solidVariations = css({
    background,
    color,
    '&:hover': {
      backgroundColor,
    },
  });

  return css(
    {
      borderRadius: '3px',
      boxShadow: `2px 3px 3px ${theme.colors.shadow.basic}`,
      transition: 'background-color 0.2s ease-in',
    },
    solidVariations,
  );
};

// * 공통 스타일 변형 스타일 관심사 분리
const textStyle = ({ props, theme }) => {
  const baseTextStyle = {
    color: theme.colors.text.secondary,
    hoverColor: theme.colors.text.primary,
  };
  const color =
    (props.primary && theme.colors.tint.blue[500]) ||
    (props.secondary && theme.colors.tint.coral[500]) ||
    baseTextStyle.color;

  const hoverColor =
    (props.primary && theme.colors.tint.blue[700]) ||
    (props.secondary && theme.colors.tint.coral[700]) ||
    baseTextStyle.hoverColor;

  return css({
    backgroundColor: 'transparent',
    transition: 'color 0.2s ease-in',
    color,
    '&:hover': {
      color: hoverColor,
      textDecoration: 'underline',
    },
  });
};

const option = props => {
  const baseOption = {
    width: 'auto',
    fontSize: fontSizes[300],
    fontWeight: '600',
    padding: `${spacing[4]} ${spacing[6]}`,
  };

  const width = (props.lg && '100%') || baseOption.width;
  const fontSize = (props.lg && fontSizes[400]) || (props.sm && fontSizes[100]) || baseOption.fontSize;
  const fontWeight = (props.lg && '600') || (props.sm && '800') || baseOption.fontWeight;
  const padding =
    (props.text && '0') ||
    (props.lg && `${spacing[4]} ${spacing[6]}`) ||
    (props.sm && `${spacing[3]} ${spacing[4]}`) ||
    baseOption.padding;

  const withIcon = props.withIcon
    ? css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
    : css({});

  const rounded = props.round
    ? css({
        borderRadius: '100px',
      })
    : css({});

  return css(
    baseOption,
    {
      width,
      fontSize,
      fontWeight,
      padding,
    },
    withIcon,
    rounded,
  );
};

const buttonVariation = (props, theme) => {
  const baseStyle = solidStyle({ props, theme });
  const style = (props.text && textStyle({ props, theme })) || baseStyle;
  const optionStyle = option(props);

  return css(
    {
      border: 'none',
      cursor: 'pointer',
    },
    style,
    optionStyle,
  );
};

const Button = ({ children, className, onClick, type, withIcon, ...styles }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      {...{ className, onClick, type }}
      css={theme => buttonVariation({ ...styles, withIcon }, theme)}
    >
      {children}
    </motion.button>
  );
};

export default Button;
