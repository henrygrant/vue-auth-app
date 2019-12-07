const fs  = require('fs')
const readline = require('readline')
const {google} = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = 'token.json'


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

// Gets data from Bunky Boyz DKP sheet and massages into objects
async function getGamers(auth) {
  const sheets = google.sheets({version: 'v4', auth})
  const spreadsheetId = '1O0FYq8SnoovnGahtybLBA7xY--N6kzav2rzpQXyDovI'
  let totalGamers
  let gamerData

  // get total amount of gamers
  async function getTotalGamers (spreadsheetId) {
    try {
      const ret = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Gamers!D1:D1', // Select Total Gamers
      })
      return ret.data.values[0][0]
    } catch (err) {
      console.log('The API returned an error: ' + err)
    }
  }
  totalGamers = await getTotalGamers(spreadsheetId)

  // get gamer data
  async function getGamerData (spreadsheetId, totalGamers) {
    try {
      const ret = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: `Gamers!A2:P${totalGamers}`, // Select Total Gamers
    })
      const headers = ret.data.values.shift()
      const gamers = []
      ret.data.values.forEach(row => {
        // rows aren't always as long as header row
        // make new array filled with nulls, fill in data from row
        let indices  = [...Array(row.length).keys()]
        let filledRow = new Array(headers.length).fill(null)
        indices.forEach(i => filledRow[i] = row[i])

        // make json-like object to send
        let gamerObj = {}
        for (let [i, val] of headers.entries()) {
          if (val) {
            if (val.includes('Symbol')) { // the symbol cols header is one cell before the actual value
              gamerObj[headers[i]] = filledRow[i+1] ? filledRow[i+1] : null
            } else {
              gamerObj[headers[i]] = filledRow[i] ? filledRow[i] : null
            }
          }
        }
        gamers.push(gamerObj)
      })
      return gamers
    } catch (err) {
      return console.log('The API returned an error: ' + err)
    }
  }
  gamerData = await getGamerData (spreadsheetId, totalGamers)
  return gamerData
}




module.exports = {
  get(req, res) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err)
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), async oauth => res.send(await getGamers(oauth)))
    })
  }
}