const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
    plugins: ['@emotion'],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: { source: 'jsconfig', jsConfigPath: 'jsconfig.paths.json' },
    },
  ],
};
