const OpenProps = require('open-props');
const jitProps = require('postcss-jit-props');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [presetEnv(), jitProps(OpenProps)],
};
