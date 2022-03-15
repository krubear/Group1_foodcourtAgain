const httpPath = '/data/users'

module.exports = function(server, db){
// Users
server.get(httpPath, async (request, response) =>{
  let result = await db.all("SELECT * FROM users")
  response.json(result)
})
  
server.get(httpPath + '/:user_id', async (request, response) =>{
  let result = await db.all("SELECT * FROM users WHERE user_id = ?", [request.params.user_id])
  response.json(result)
})

}
