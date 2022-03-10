
const router = require ('express').Router()

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

module.exports = router


//get menu_items 

router.get('/',async(request,response) =>{  

    let result = await db.all("SELECT * FROM menu_items")
    response.json(result)
    
  
  })
  
  
  
  // get menu_items with specific id
  router.get('/:menu_item_id',async(request,response) =>{ 
      
    let result = await db.all("SELECT * FROM menu_items WHERE menu_item_id =?", [request.params.menu_item_id ]) 
  
    response.json(result)
  
  
  })
  
  //post
  router.post('/',async(request,response) =>{ 
      
  
    let result = await db.run("INSERT INTO menu_items (name,price) VALUES (?, ?)", [request.body.name, request.body.price])
  
    response.json({"added": request.body})
     
  })
  
  
  //put menu_items, update
  router.put('/:menu_item_id',async(request,response) =>{ 
    let result = await db.run("UPDATE menu_items SET name = ?, price = ? WHERE menu_item_id = ?", [request.body.name, request.body.price, request.params.menu_item_id]) 
  
   
    response.json({result, message:"Menuitem updated"})
  
  })
  
  
  router.delete('/:menu_item_id',async(request,response) =>{ 
      
  
    let result = await db.run("DELETE FROM menu_items WHERE menu_item_id =?", [request.params.menu_item_id]) 
  
    response.json({result, message:"Menuitem deleted"})
  })