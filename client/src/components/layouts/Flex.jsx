import { css } from '@emotion/react';
import PropTypes from 'prop-types';

Flex.defaultProps = {
  inline: false,
  direction: 'row',
  wrap: 'nowrap',
  justifyContent: 'center',
  alignContent: 'stretch',
  alignItems: 'center',
  columnGap: '',
  rowGap: '',
};

Flex.propTypes = {
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'reverse']),
  justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around']),
  alignContent: PropTypes.oneOf(['stretch', 'start', 'end', 'center', 'between', 'around']),
  alignItems: PropTypes.oneOf(['stretch', 'start', 'end', 'center', 'baseline']),
  columnGap: PropTypes.string,
  rowGap: PropTypes.string,
};

export default function Flex({
  children,
  className,
  inline,
  direction,
  wrap,
  justifyContent,
  alignContent,
  alignItems,
  columnGap,
  rowGap,
}) {
  return (
    <div
      className={className}
      css={applyToFlex({
        inline,
        direction,
        wrap,
        justifyContent,
        alignContent,
        alignItems,
        columnGap,
        rowGap,
      })}
    >
      {children}
    </div>
  );
}

const columnGapToFlex = gap => {
  if (gap.trim() === '') return;
  return css`
    & > *:not(:last-child) {
      margin-bottom: ${gap};
    }
  `;
};
const rowGapToFlex = gap => {
  if (gap.trim() === '') return;
  return css`
    & > *:not(:last-child) {
      margin-right: ${gap};
    }
  `;
};

const justifyContentToFlex = content => {
  switch (content) {
    case 'start':
      return css`
        justify-content: flex-start;
      `;
    case 'end':
      return css`
        justify-content: flex-end;
      `;
    case 'center':
      return css`
        justify-content: center;
      `;
    case 'between':
      return css`
        justify-content: space-between;
      `;
    case 'around':
      return css`
        justify-content: space-around;
      `;
    default:
      return css`
        justify-content: '';
      `;
  }
};
const alignContentToFlex = content => {
  switch (content) {
    case 'stretch':
      return css`
        align-content: stretch;
      `;
    case 'start':
      return css`
        align-content: flex-start;
      `;
    case 'end':
      return css`
        align-content: flex-end;
      `;
    case 'center':
      return css`
        align-content: center;
      `;
    case 'between':
      return css`
        align-content: space-between;
      `;
    case 'around':
      return css`
        align-content: space-around;
      `;
    default:
      return css``;
  }
};
const alignItemsToFlex = content => {
  switch (content) {
    case 'stretch':
      return css`
        align-items: center;
      `;
    case 'start':
      return css`
        align-items: flex-start;
      `;
    case 'end':
      return css`
        align-items: flex-end;
      `;
    case 'center':
      return css`
        align-items: center;
      `;
    case 'baseline':
      return css`
        align-items: baseline;
      `;
    default:
      return css``;
  }
};

const applyToFlex = props => css`
  display: ${props.inline ? 'inline-flex' : 'flex'};
  flex-direction: ${props.direction};
  flex-wrap: ${(props.wrap === 'reverse' && 'wrap-reverse') || props.wrap};
  ${justifyContentToFlex(props.justifyContent)};
  ${alignContentToFlex(props.alignContent)};
  ${alignItemsToFlex(props.alignItems)};
  ${columnGapToFlex(props.columnGap)};
  ${rowGapToFlex(props.rowGap)};
`;
