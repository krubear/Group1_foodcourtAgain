module.exports = function (server, db) {
  const pathWay = '/data/restaurants'

  /*
  const server = require('express').Router()
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
  */


  //hitta en restaurang som finns i restaurants
  server.get(pathWay + '/:restaurant_id', async (request, response) => {
    let result = await db.all("SELECT * FROM restaurants WHERE restaurant_id = ?", [request.params.restaurant_id])

    response.json(result)
  })

  //se alla restauranger som finns i restaurants
  server.get(pathWay + '/', async (request, response) => {
    let result = await db.all("SELECT * FROM restaurants")

    response.json(result)
  })


  //skapa en ny restaurang 
  server.post(pathWay + '/', async (request, response) => {
    let result = await db.run("INSERT INTO restaurants (name, resturant_adress, type_of_cuisine) VALUES(?, ?, ?) ", [request.body.name, request.body.resturant_adress, request.body.type_of_cuisine])

    response.json(result)
  })


  //uppdatera en restaurang
  server.put(pathWay + '/:restaurant_id', async (request, response) => {
    let result = await db.run("UPDATE restaurants SET name = ?, resturant_adress = ?, type_of_cuisine = ? WHERE restaurant_id = ?", [request.body.name, request.body.resturant_adress, request.body.type_of_cuisine, request.params.restaurant_id])

    response.json(result)
  })


  //delete en restaurant
  server.delete(pathWay + '/:restaurant_id', async (request, response) => {
    let result
    if (request.params.restaurant_id === request.body.restaurant_id) {
      result = await db.run("DELETE FROM restaurants WHERE restaurant_id = ?", [request.params.restaurant_id])
    } else {
      response.json("Incorrect id in params or body.")
    }
    response.json(result)
  })

}