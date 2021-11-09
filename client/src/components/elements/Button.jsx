import { fontSizes, palette, spacing } from '@/styles';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';

// * style
// 각 스타일에 포함되는 옵션  primary, secondary, tertiary
// solid (기본 스타일)
const solidStyle = ({ props, theme }) => {
  const base = css`
    border-radius: 3px;
    box-shadow: 2px 3px 3px ${theme.colors.shadow.basic};
    transition: background-color 0.2s ease-in;
  `;
  const primary =
    props.primary &&
    css`
      background: ${theme.colors.tint.blue[500]};
      color: ${palette.light.gray[200]};
      &:hover {
        background-color: ${theme.colors.tint.blue[600]};
      }
    `;
  const secondary =
    props.secondary &&
    css`
      background: ${theme.colors.tint.coral[500]};
      color: ${palette.light.gray[200]};
      &:hover {
        background-color: ${theme.colors.tint.coral[600]};
      }
    `;
  const tertiary =
    props.tertiary &&
    css`
      background: ${theme.colors.text.secondary};
      color: ${theme.colors.background};
      &:hover {
        background-color: ${theme.colors.text.primary};
      }
    `;

  return css`
    ${base}
    ${primary}
    ${secondary}
    ${tertiary}
  `;
};
// text
const textStyle = ({ props, theme }) => {
  const base = css`
    background-color: transparent;
    transition: color 0.2s ease-in;
  `;
  const primary =
    props.primary &&
    css`
      color: ${theme.colors.tint.blue[500]};
      &:hover {
        color: ${theme.colors.tint.blue[700]};
        text-decoration: underline;
      }
    `;
  const secondary =
    props.secondary &&
    css`
      color: ${theme.colors.tint.coral[500]};
      &:hover {
        color: ${theme.colors.tint.coral[700]};
        text-decoration: underline;
      }
    `;
  const tertiary =
    props.tertiary &&
    css`
      color: ${theme.colors.text.secondary};
      &:hover {
        color: ${theme.colors.text.primary};
        text-decoration: underline;
      }
    `;

  return css`
    ${base}
    ${primary}
    ${secondary}
    ${tertiary}
  `;
};

// ! outline
const outlineStyle = ({ props, theme }) => {
  const base = css``;
  const primary = props.primary && css``;
  const secondary = props.secondary && css``;
  const tertiary = props.tertiary && css``;

  return css`
    ${base}
    ${primary}
    ${secondary}
    ${tertiary}
  `;
};

const lg = css`
  width: 100%;
  font-size: ${fontSizes[400]};
  font-weight: 600;
  padding: ${spacing[4]} ${spacing[6]};
`;
const md = css`
  font-size: ${fontSizes[300]};
  font-weight: 600;
  padding: ${spacing[4]} ${spacing[6]};
`;
const sm = css`
  font-size: ${fontSizes[100]};
  font-weight: 800;
  padding: ${spacing[3]} ${spacing[4]};
`;

const variation = (props, theme) => {
  const base = css`
    border: none;
    cursor: pointer;
  `;
  const style =
    (props.text && textStyle({ props, theme })) ||
    (props.outline && outlineStyle({ props, theme })) ||
    solidStyle({ props, theme });
  // * options
  const options = css`
    ${(props.lg && lg) || (props.sm && sm) || md}
    ${props.Icon &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
    ${props.text &&
    css`
      padding: 0px;
    `}
    ${props.round &&
    css`
      border-radius: 100px;
    `}
    ${props.loading && css``}
  `;
  return css`
    ${base};
    ${style};
    ${options};
  `;
};

const Button = ({ children, className, onClick, type, icon: Icon, ...styles }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      {...{ className, onClick, type }}
      css={theme => variation({ ...styles, Icon }, theme)}
    >
      {Icon && (
        <Icon
          css={css`
            width: 1.1em;
            height: 1.1em;
            margin-right: 0.1em;
          `}
        />
      )}
      {children}
    </motion.button>
  );
};

export default Button;
