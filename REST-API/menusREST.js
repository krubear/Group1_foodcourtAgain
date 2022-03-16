const httpPath = '/data/menus'

module.exports = function(server, db){

    server.get(httpPath, async(request, response)=>{
        let result = await db.all("SELECT * FROM menus")
        return respone.json(result)
      })
      
      server.get(httpPath + '/:restaurant_id', async(request, response)=>{
        let result = await db.all("SELECT * FROM menus WHERE restaurant_id = ?", [request.params.restaurant_id])
        return response.json(result)
      })
      
      server.post(httpPath, async(request, response)=>{
        let result = await db.run("INSERT INTO menus (restaurant_id, menu_item_id) VALUES(?, ?) ", [request.body.restaurant_id, request.body.menu_item_id])
        return respone.json(result)
      })
      
      server.put(httpPath + '/:menu_item_id', async(request, response)=>{
        let result = await db.run("UPDATE menus SET restaurant_id = ? WHERE menu_item_id = ?", [request.body.restaurant_id, request.params.menu_item_id])
        return response.json(result)
      })

      server.delete(httpPath + '/:restaurant_id', async(request, response)=>{
        let result = await db.run("DELETE FROM menus WHERE restaurant_id = ?", [request.params.restaurant_id])
        return response.json(result) 
      })

      server.delete(httpPath + '/:menu_item_id', async(request, response)=>{
        let result = await db.run("DELETE FROM menus WHERE menu_item_id = ?", [request.params.menu_item_id])
        return response.json(result)
      })
      
}