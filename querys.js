

//query allt som finns i restaurants
server.get('/group1_foodcourt/restaurants', async (request, response) => {
    let result = await db.all("SELECT * FROM restaurants WHERE restaurant_id = ?", [request.params.id])
    response.json(result)
  })
  
  //query skapa en ny restaurang
  server.post('/group1_foodcourt/restaurants/crateNew', async (request, response) => {
    let result = await db.run("INSERT INTO restaurants (restaurant_id, name, resturant_adress, type_of_cuisine) VALUES(?) ", [request.body.name])
  
    //generera id hur?
    response.json(result)
  })
  
  //query uppdatera en restaurang
  server.put('/group1_foodcourt/restaurants/:restaurant_id', async (request, response) => {
    let result = await db.run("UPDATE restaurants SET name = ?, resturant_adress = ?, type_of_cuisine = ? WHERE restaurant_id = ?", [request.body.name, request.body.resturant_adress, request.body.type_of_cuisine])
  
    response.json(result) 
  })
  
  //query delete en restaurant
  server.delete('/group1_foodcourt/restaurants/:restaurant_id', async (request, response) => {
    let result = await db.run("DELETE FROM restaurants WHERE restaurant_id = ?", [request.params.restaurant_id, request.body.name])
  
    response.json(result)
  })