import OpenProps from 'open-props';
import jitProps from 'postcss-jit-props';
import presetEnv from 'postcss-preset-env';

export default {
  plugins: [
    presetEnv({
      features: {
        'nesting-rules': true,
      },
    }),
    jitProps(OpenProps),
  ],
};
