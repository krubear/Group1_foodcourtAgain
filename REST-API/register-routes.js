const authentication = require("./authentication")
const customersREST = require("./customersREST")
const customRoutes = require('./custom-routes')
const usersREST = require("./usersREST")
const loginREST = require('./loginREST')
<<<<<<< HEAD
const menuitemsREST = require ("./menu_items_REST")
=======
const menus = require('./menusREST')
>>>>>>> 57fabcaf8d24bc9e448995d492e7f27901abf613

module.exports = function(server, db){

    authentication(server, db)
    customersREST(server, db)
    customRoutes(server, db)
    usersREST(server, db)
    loginREST(server, db)
<<<<<<< HEAD
    menuitemsREST(server,db)
=======
    menus(server, db)
>>>>>>> 57fabcaf8d24bc9e448995d492e7f27901abf613
}