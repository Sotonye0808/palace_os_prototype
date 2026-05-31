module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  localePath: typeof window === 'undefined' ? './public/locales' : '/locales',
};