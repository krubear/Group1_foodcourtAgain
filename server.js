const express = require('express')
const server = express()
server.use(express.json()) // request json body

// import routers 
server.use("/customers", require('./routes/customersREST'))
server.use("/users", require('./routes/usersREST'))
server.use("/orders", require('./routes/ordersREST'))
server.use("/menu_items", require('./routes/menu_items_REST'))
server.use("/restaurants", require('./routes/restaurantsREST'))


// register our own little custome middleware
server.use((request, response, next)=>{
    response.setHeader('X-Created-by', 'Group1')
    next()
})

// register session middleware
const session = require('express-session')
server.use(session({
  secret: '12093h0pih23r0iholpedwrioj',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // CHANGE TO true WHEN GOING LIVE!!!! preferable using an environmental variable
}))

// Start server
server.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000/')
})

const Database = require('sqlite-async')
let db
Database.open('./database/foodcourt.db')
  .then(d => {
    db = d
    console.log(db)
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
