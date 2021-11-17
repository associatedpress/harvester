const { google } = require('googleapis')

let authClient = null

async function getAuth() {
  if (authClient) return authClient
  return await setAuthClient()
}

async function setAuthClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
    ],
  })
  authClient = await auth.getClient()
  return authClient
}

async function emailCanRead(fileId, email) {
  const auth = await getAuth()
  const drive = google.drive('v3')
  const fields = [
    'permissions/id',
    'permissions/emailAddress',
    'permissions/role',
  ]
  const request = {
    auth,
    fileId,
    fields: fields.join(','),
  }
  const filePermissions = await drive.permissions.list(request)
  return filePermissions.data.permissions.some(perm => {
    if (perm.id === 'anyoneWithLink') return true
    return perm.emailAddress.toLowerCase() === email.toLowerCase()
  })
}

async function getRange(spreadsheetId, options = {}) {
  const {
    range = 'A:Z',
    headers = true,
    majorDimension = 'ROWS',
    filters = {},
  } = options

  const auth = await getAuth()
  const sheets = google.sheets('v4')

  const request = {
    auth,
    spreadsheetId,
    range,
    majorDimension,
  }
  const rsp = await sheets.spreadsheets.values.get(request)
  const { data } = rsp
  const { values = [] } = data

  if (headers) {
    const heads = values[0]
    return values.slice(1).reduce((vals, d) => {
      const row = heads.reduce((rec, head, i) => ({
        ...rec,
        [head]: d[i],
      }), {})
      if (Object.keys(filters).every(k => [filters[k]].flat().includes(row[k]))) {
        return [...vals, row]
      }
      return vals
    }, [])
  }

  return values.filter(row => {
    return Object.keys(filters).every(k => [filters[k]].flat().includes(row[k]))
  })
}

async function appendRows(spreadsheetId, rows, options = {}) {
  const {
    range = 'A1',
    valueInputOption = 'USER_ENTERED',
  } = options

  const auth = await getAuth()
  const sheets = google.sheets('v4')

  const request = {
    auth,
    spreadsheetId,
    range,
    valueInputOption,
    resource: {
      values: rows,
    },
  }
  const rsp = await sheets.spreadsheets.values.append(request)
  return rsp
}

module.exports = {
  getRange,
  appendRows,
  emailCanRead,
}
