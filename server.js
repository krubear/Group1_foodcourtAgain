const express = require('express')
const server = express()
server.use(express.json()) // request json body

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
    console.log('Server running at http://localhost:3000/data')
})

const Database = require('sqlite-async')
let db 
Database.open('./database/foodcourt.db')
.then(d=>{
    db = d
    console.log(db)
})
.catch(err=>{
    console.error(err)
})

// Crypto

const crypto = require("crypto")
const salt = "paraplane".toString('hex')
function getHash(password){ // utility
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
    return hash
}

//query allt som finns i restaurants
server.get('/group1_foodcourt/restaurants', async (request, response)=>{
    let result = await db.all("SELECT * FROM restaurants WHERE restaurant_id = ?", [request.params.id])
    response.json(result)
  })
  
  //query skapa en ny restaurang
  server.post('/group1_foodcourt/restaurants/crate', async (request, response)=>{
    let result = await db.run("INSERT INTO restaurants (restaurant_id, name, resturant_adress, type_of_cuisine) VALUES(?) ", [request.body.name])
    response.json(result)
  })
  
  //query uppdatera en restaurang
  server.put('/group1_foodcourt/restaurants/:restaurant_id', async (request, response)=>{
    let result = await db.run("UPDATE restaurants SET name = ?, resturant_adress = ?, type_of_cuisine = ? WHERE restaurant_id = ?", [request.body.name, request.body.resturant_adress, request.body.type_of_cuisine, request.params.restaurant_id])
    response.json(result)
  })
  
  //query delete en restaurant
  server.delete('/group1_foodcourt/restaurants/:restaurant_id', async (request, response)=>{
    let result = await db.run("DELETE FROM restaurants WHERE restaurant_id = ?", [request.params.restaurant_id])
    response.json(result)
  })