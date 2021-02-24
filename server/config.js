module.exports = {
  store: {
    config: {
      type: process.env.HARVESTER_CONFIG_RESOURCE_TYPE || 'd',
      id: process.env.HARVESTER_CONFIG_RESOURCE_ID,
    },
    plugins: [
      './stores/google-sheets'
    ],
  },
  auth: {
    secret: process.env.JWT_SECRET,
    session: {},
    plugins: [
      {
        name: './auth/oauth-google',
        options: {
          clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        },
      },
    ],
  },
}
