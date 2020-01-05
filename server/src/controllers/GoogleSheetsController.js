const fs  = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const moment = require('moment')
const cron = require('node-cron')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = 'token.json'

const SPREADSHEET_ID = '1O0FYq8SnoovnGahtybLBA7xY--N6kzav2rzpQXyDovI'


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
  const totalGamers = await getTotalGamers(SPREADSHEET_ID)

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

  async function getGamerLogs (spreadsheetId) {
    try {
       const ret = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: `Log!A2:D`, // get all gamer logs
      })
      let formattedLog = []
      ret.data.values.forEach(row => {
        formattedLog.push({
          Gamer: row[0],
          Event: row[1],
          DKP:   row[2],
          Date:  row[3],
        })
      })
      return formattedLog
    } catch (err) {
      return console.log('The API returned an error: ' + err)
    }
  }
  let gamerData = await getGamerData (SPREADSHEET_ID, totalGamers)
  const logs = await getGamerLogs(SPREADSHEET_ID, gamerData)

  gamerData.forEach(gamer => {
    gamer.Logs = logs.filter(L => L.Gamer === gamer.Gamers).reverse()
  })

  return gamerData
}

let cachedGamers = false
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  authorize(JSON.parse(content), async oauth => {
    cachedGamers = await getGamers(oauth)
    // cron.schedule(
    //   '* * * * *',
    //   async () => cachedGamers = await getGamers(oauth),
    //   { scheduled: true}
    // )
  })
})



module.exports = {
  getCached(req, res) {
    if (cachedGamers) {
      res.send(cachedGamers)
    } else {
      const err = 'Problem fetching data from Google Sheets API'
      console.log(err)
      res.send(err)
    }
  }
}