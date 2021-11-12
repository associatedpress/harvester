const { google } = require('googleapis')
const jwt = require('jsonwebtoken')

// as dependencies we'll need to know hostname/protocol to build redirect
// links, we'll need to know how to create JWTs (just seems cleaner than
// re-implementing), and we'll need to know how to resolve authentication (to
// reject we can just throw an error)

const configure = (opts = {}) => {
  const {
    name = 'oauth-google',
    clientId,
    clientSecret,
  } = opts

  function oauth2Client(req) {
    const proto = req.protocol
    const host = req.get('host')
    return new google.auth.OAuth2(
      clientId,
      clientSecret,
      `${proto}://${host}/auth/oauth-google/callback`,
    )
  }

  function getGoogleAuthURL(auth, { state }) {
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]

    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope,
      state,
    })
  }

  async function fetchEmail(auth) {
    const people = google.people('v1')
    const res = await people.people.get({
      auth,
      resourceName: 'people/me',
      personFields: 'emailAddresses',
    })
    return res.data
  }

  async function authLease(auth) {
    try {
      await fetchEmail(auth)
      const tokens = auth.credentials
      const id = jwt.decode(tokens.id_token)
      return {
        email: id.email,
        issuer: name,
        expiry_date: tokens.expiry_date,
        data: tokens,
      }
    } catch(error) {
      console.error(error)
    }
  }

  async function refresh(req) {
    const tokens = req.auth.data
    const auth = oauth2Client(req)
    auth.setCredentials({
      refresh_token: tokens.refresh_token,
    })
    return await authLease(auth)
  }

  const mount = ({ router, resolve, token }) => {
    router.get('/sign-in', (req, res) => {
      const { formType, formId, path } = req.query
      const state = token.sign({ formType, formId, path }, { expiresIn: '5m' })
      const authURL = getGoogleAuthURL(oauth2Client(req), { state })
      res.redirect(authURL)
    })

    router.get('/callback', async (req, res, next) => {
      try {
        const {
          code,
          state,
        } = req.query
        const { formType, formId, path } = token.verify(state)
        const auth = oauth2Client(req)
        const { tokens } = await auth.getToken(code)
        auth.setCredentials(tokens)
        const data = await authLease(auth)
        const form = { type: formType, id: formId }
        resolve(req, res, { form, data, path })
      } catch(error) {
        next(error)
      }
    })

    return router
  }

  return {
    path: name,
    mount,
    refresh,
    button: {
      name: 'Google OAuth',
    },
  }
}

module.exports = {
  configure,
}
