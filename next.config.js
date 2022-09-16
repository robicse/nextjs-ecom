module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['bme.com.bd'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
};
