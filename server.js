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

// Check role based access
// const accessControl = require('./access-control.js')
// server.use(accessControl)


// register routes callback function
const registerRoutes = require('./REST-API/register-routes.js')

const Database = require('sqlite-async')
let db
Database.open('./database/foodcourt.db')
.then(d=>{ // asynkron callback
    // database connection alive
    db = d
    //register routes 
    registerRoutes(server, db) // registrerar routes synkront
    // Start server
    server.listen(3000, ()=>{ // startar servern asynkront
    console.log('Server running at http://localhost:3000/data')
})

})
.catch(err => {
    console.error(err)
  })