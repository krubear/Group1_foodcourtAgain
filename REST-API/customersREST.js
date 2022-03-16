module.exports = function(server, db){
const pathWay = '/data/customers'


server.get(pathWay, async(request, response)=>{

        let result = await db.all("SELECT * FROM customers")
        
        return response.json(result)

})

server.get(pathWay + '/:customer_id', async(request, response)=>{
    let result = await db.all("SELECT * FROM customers WHERE customer_id = ?", [request.params.customer_id])

    return response.json(result)
})

server.post(pathWay, async(request, response)=>{
    let result = await db.run("INSERT INTO customers (firstname, lastname, adress) VALUES(?, ?, ?)", [request.body.firstname, request.body.lastname, request.body.adress])
    return response.json(result)
})

server.put(pathWay + '/:customer_id', async(request, response)=>{

    let result = await db.run("UPDATE customers SET firstname = ?, lastname = ?, adress = ? WHERE customer_id = ?", [request.body.fistname, request.body.lastname, request.body.adress, request.params.customer_id])
    return response.json(result)
})

server.delete(pathWay + '/:customer_id', async(request, response)=>{

    let result = await db.run("DELETE FROM customers WHERE customer_id = ?", [request.params.customer_id])
    return response.json(result)
})

}