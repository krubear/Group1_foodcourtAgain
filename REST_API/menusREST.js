const httpPath = '/data/menus'

module.exports = function(server, db){

    server.get(httpPath, async(request, response)=>{
        let result = await db.all("SELECT * FROM menus")
        respone.json(result)
      })
      
      server.get(httpPath, async(request, response)=>{
        let result = await db.all("SELECT * FROM menus WHERE restaurant_id = ?", [request.params.restaurant_id])
        response.json(result)
      
      })
      
      server.post(httpPath, async(request, response)=>{
        let result = await db.run("INSERT INTO menus (restaurant_id, menu_item_id) VALUES(?, ?) ")
        respone.json(result)
      })
      
      server.put('')
      

}