const { css } = require('@emotion/react');

export const scrollStyle =
  (direction = 'vertical') =>
  props => {
    return css({
      '&::-webkit-scrollbar':
        direction === 'vertical'
          ? {
              width: 7,
            }
          : {
              height: 7,
            },
      '&::-webkit-scrollbar-track': {
        backgroundColor: props.theme.colors.background_elevated,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: props.theme.colors.text.disable_placeholder,
      },
    });
  };
export const scrollObjStyle = (props, direction = 'vertical') => {
  return {
    '&::-webkit-scrollbar':
      direction === 'vertical'
        ? {
            width: 7,
          }
        : {
            height: 7,
          },
    '&::-webkit-scrollbar-track': {
      backgroundColor: props.theme.colors.background_elevated,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: props.theme.colors.text.disable_placeholder,
    },
  };
};
