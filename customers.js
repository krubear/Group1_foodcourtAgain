server.get('/data/customers', async(request, response)=>{
    let result = await db.all("SELECT * FROM customers")

    response.json(result)
})

server.get('/data/customers/:id', async(request, response)=>{
    let result = await db.all("SELECT * FROM customers WHERE customer_id = ?", [request.params.customer_id])

    response.json(result)
})

server.post('/data/customers', async(request, response)=>{
    let result = await db.run("INSERT INTO customers (name, email) VALUES(?, ?)", [request.body.name, request.body.email])
    response.json(result)
})

server.put('/data/customers/:customer_id', async(request, response)=>{

    let result = await db.run("UPDATE customers SET name = ?, email = ? WHERE customer_id = ?", [request.body.name, request.body.email, request.params.customer_id])
    response.json(result)
})

server.delete('/data/customers/:customer_id', async(request, response)=>{

    let result = await db.run("DELETE FROM customers WHERE customer_id = ?", [request.params.customer_id])
    response.json(result)
})

module.exports = {  }