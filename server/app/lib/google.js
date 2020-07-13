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
    ],
  })
  authClient = await auth.getClient()
  return authClient
}

async function getRange(spreadsheetId, options = {}) {
  const {
    range = 'A:Z',
    headers = true,
    majorDimension = 'ROWS',
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
  const { values } = data

  if (headers) {
    const heads = values[0]
    return values.slice(1).map(d => {
      return heads.reduce((rec, head, i) => ({
        ...rec,
        [head]: d[i],
      }), {})
    })
  }
  return values
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
}
