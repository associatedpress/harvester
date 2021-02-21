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
    plugins: [
      'harvester-auth-oauth-google',
    ],
  },
}
