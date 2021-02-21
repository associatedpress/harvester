const { google } = require('googleapis')
const jwt = require('jsonwebtoken')

// as dependencies we'll need to know hostname/protocol to build redirect
// links, we'll need to know how to create JWTs (just seems cleaner than
// re-implementing), and we'll need to know how to resolve authentication (to
// reject we can just throw an error)

const configure = (opts = {}) => {
  const {
    clientId,
    clientSecret,
  } = opts

  function oauth2Client() {
    return new google.auth.OAuth2(
      clientId,
      clientSecret,
      // TODO
      `http://localhost:8080/auth/oauth-google/callback`,
    )
  }

  function getGoogleAuthURL(auth, { state }) {
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      //'https://www.googleapis.com/auth/spreadsheets.readonly',
    ]

    return auth.generateAuthUrl({
      access_type: 'online',
      prompt: 'consent',
      scope,
      state,
    })
  }

  const mount = ({ router, resolve, token }) => {
    router.get('/sign-in', (req, res) => {
      const { formType, formId } = req.query
      const state = token.sign({ formType, formId }, { expiresIn: '5m' })
      const authURL = getGoogleAuthURL(oauth2Client(), { state })
      res.redirect(authURL)
    })

    router.get('/callback', async (req, res, next) => {
      try {
        const {
          code,
          state,
        } = req.query
        const { formType, formId } = token.verify(state)
        const { tokens } = await oauth2Client().getToken(code)
        const { email } = jwt.decode(tokens.id_token)
        const form = { type: formType, id: formId }
        const data = { email }
        resolve(req, res, { form, data })
      } catch(error) {
        next(error)
      }
    })

    return router
  }

  return {
    path: 'oauth-google',
    mount,
  }
}

module.exports = {
  configure,
}
