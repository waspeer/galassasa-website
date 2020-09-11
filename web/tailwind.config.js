module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#D2539F',
        secondary: '#DBCBD8',
        neutral: '#F2FDFF',
      },
    },
  },
  variants: {},
  plugins: [],
};
