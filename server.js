const express = require('express')
const server = express()
server.use( express.json() ) // request json body

// register our own little custom middleware
server.use((request, response, next)=>{
    response.setHeader('X-topdog', 'Emma')
    next()
})

// register session middleware
const session = require('express-session')
const req = require('express/lib/request')
server.use(session({
  secret: 'bngszfui5btgxdpiifhtpkugiykåökm',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // CHANGE TO true WHEN GOING LIVE, preferable using an environmental variable
}))

// register routes callback function
const registerRoutes = require('./REST-API/register-routes.js')

// database
// Note! the npm sqlite-async module is a wrapper for sqlite3 that provides promises (for async/await) for the sqlite3 module
// https://www.npmjs.com/package/sqlite-async

const Database = require('sqlite-async')
let db
Database.open('./database/foodcourt.db')
.then(d => { // asynkron callback
    // database connection alive
    db = d
    // register routes
    registerRoutes(server, db, 'whateverOtherDependency') // registerar routes synkront
    // start server
    server.listen(3000, ()=>{ // startar servern asynkront
        console.log('server running at http://localhost:3000/data')
    })
})
.catch(err => {
    console.error(err)
  })


// Crypto
const crypto = require("crypto")
const { ServerResponse } = require('http')
const salt = "paraplane".toString('hex')
function getHash(password) { // utility
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
  return hash
}
