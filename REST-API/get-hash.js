
// Crypto

const crypto = require("crypto")
const { ServerResponse } = require('http')
const salt = "paraplane".toString('hex')
function getHash(password) { // utility
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
  return hash
}
