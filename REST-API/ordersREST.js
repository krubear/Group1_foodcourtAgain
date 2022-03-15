module.exports = function(server, db){
     
    server.get('/data/orders', async(request, response)=>{
    
            let result = await db.all("SELECT * FROM orders")
            
            return response.json(result)
    
    })


// add orders 
server.post('/data/addtoorders', async (request, response)=>{
    let result = await db.run("INSERT INTO orders (order_id, customer_id, restaurant_id, menu_item_id, quantity, delivery_adress, order_date) VALUES(?,?,?,?,?,?,?)")
    response.json(result)
})

// update menu_item in order
server.put('/data/orders/', async (request, response) =>{
    let result = await db.run("UPDATE orders SET menu_item_id = ? WHERE menu_item_id = ? ", [request.body.menu_item_id])
    response.json(result)
})

// show one order by customer_ID
server.get('/data/orders/:customer_id', async (request, response) =>{
    let result = await db.all("SELECT * FROM orders WHERE customer_id = ?", [request.params.customer_id])
    response.json(result)
})

// show all orders from a restaurant
server.get('/data/orders/:restaurant_id', async (request, response) =>{
    let result = await db.all("SELECT * FROM orders WHERE restaurant_id = ?", [request.params.restaurant_id])
    response.json(result)
})
}

// show all, show one by ID, delete, update, add