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


router.get('/', async(request, response)=>{
    let result = await db.all("SELECT * FROM customers")

    return response.json(result)
})

router.get('/:customer_id', async(request, response)=>{
    let result = await db.all("SELECT * FROM customers WHERE customer_id = ?", [request.params.customer_id])

    return response.json(result)
})

router.post('/', async(request, response)=>{
    let result = await db.run("INSERT INTO customers (firstname, lastname, adress) VALUES(?, ?, ?)", [request.body.firstname, request.body.lastname, request.body.adress])
    return response.json(result)
})

router.put('/:customer_id', async(request, response)=>{

    let result = await db.run("UPDATE customers SET firstname = ?, lastname = ?, adress = ? WHERE customer_id = ?", [request.body.fistname, request.body.lastname, request.body.adress, request.params.customer_id])
    return response.json(result)
})

router.delete('/:customer_id', async(request, response)=>{

    let result = await db.run("DELETE FROM customers WHERE customer_id = ?", [request.params.customer_id])
    return response.json(result)
})

module.exports = router