const router = require('express').Router()

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

// add orders 
router.post('/addtoorders', async (request, response)=>{
    let query1 = "INSERT INTO orders (order_id) VALUES (?)"
     //create order
        dbWithCallback.run(query1, [request.body.name], function(){
            //loop over and add them one by one
            let callBackCounter = 0
            for(let orders of request.body.orders){
                let query2 = "INSERT INTO orders (order_id) VALUES (?)"
                //add each order refering to the newly created order_id
                dbWithCallback.run(query2, [orders.name, this.lastID], function(){
                    // done
                    callBackCounter ++
                    if(callBackCounter === request.body.orders.length){
                        response.json({
                            ordersCreated: 1,
                            specialsCreated: callBackCounter
                    })
                
                }
            })
        }
    })
       
})

// update order
router.put('/:id', async (request, response) =>{
    let result = await db.run("UPDATE orders SET menu_item_id = ? WHERE menu_item_id = ? ", [request.body.menu_item_id, request.body.id])
    response.json(result)
})

// show one order by ID
router.get('/:orders_id', async (request, response) =>{
    let result = await db.all("SELECT * FROM orders WHERE orders_id = ?", [request.params.orders_id])
    response.json(result)
})

// show all orders from a restaurant
router.get('/:restaurant_id', async (request, response) =>{
    let result = await db.all("SELECT * FROM orders WHERE restaurant_id = ?", [request.params.restaurant_id])
    response.json(result)
})

//Show all orders
router.get('', async (request, response) =>{
    let result = await db.all("SELECT * FROM orders")
    response.json(result)
})

// show all, show one by ID, delete, update, add
module.exports = router