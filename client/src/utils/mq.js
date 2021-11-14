const breakpoints = {
  tablet: '768',
  laptop: '1024',
  desktop: '1368',
};

const mq = Object.entries(breakpoints).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: `@media (min-width: ${value}px)`,
  }),
  {},
);

export default mq;
