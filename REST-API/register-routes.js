const authentication = require("./authentication")
const customersREST = require("./customersREST")
const customRoutes = require('./custom-routes')
const loginREST = require('./loginREST')
const menus = require('./menusREST')
const menuitemsREST = require('./menu_items_REST')

module.exports = function(server, db){

    authentication(server, db)
    customersREST(server, db)
    customRoutes(server, db)
    loginREST(server, db)
    menuitemsREST(server,db)
    menus(server, db)
}