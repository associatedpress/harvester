module.exports = {
  store: {
    plugins: [
      './stores/google-sheets'
    ],
  },
  auth: {
    plugins: [
      'harvester-auth-oauth-google',
    ],
  },
}
