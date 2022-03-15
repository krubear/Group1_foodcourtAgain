const httpPath = '/data/menu_items'

module.exports = function (server, db) {

  //get menu_items 

  server.get('/data/menu_items', async (request, response) => {

    let result = await db.all("SELECT * FROM menu_items")
    response.json(result)


  })

  // get menu_items with specific id
  server.get('/data/menu_items:menu_item_id', async (request, response) => {
    let result = await db.all("SELECT * FROM menu_items WHERE menu_item_id =?", [request.params.menu_item_id])
    response.json(result)


  })

  //post
  server.post('/data/menu_items', async (request, response) => {
    if (request.body.price < 0) {

      response.status(418).json({
        message: "Please enter an positive number in price"

      })

    } else {



      let result = await db.run("INSERT INTO menu_items (name,price) VALUES (?, ?)", [request.body.name, request.body.price])

      response.json({
        "added": request.body
      })
      response.json({
        result,
        message: "Menuitem updated"
      })

    }

  })


  //put menu_items, update
  server.put('/data/menu_items:menu_item_id', async (request, response) => {
    if (request.body.price < 0) {

      response.status(418).json({
        message: "Please enter an positive number in price"

      })

    } else {

      let result = await db.run("UPDATE menu_items SET name = ?, price = ? WHERE menu_item_id = ?", [request.body.name, request.body.price, request.params.menu_item_id])

      response.json({
        result,
        message: "Menuitem added"
      })

    }
  })




  server.delete('/data/menu_items:menu_item_id', async (request, response) => {


    let result = await db.run("DELETE FROM menu_items WHERE menu_item_id =?", [request.params.menu_item_id])

    response.json({
      result,
      message: "Menuitem deleted"
    })
  })

}