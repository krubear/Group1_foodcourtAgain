const authentication = require("./authentication")
const customersREST = require("./customersREST")
const customRoutes = require('./custom-routes')
const usersREST = require("./usersREST")
const loginREST = require('./loginREST')

module.exports = function(server, db){

    authentication(server, db)
    customersREST(server, db)
    customRoutes(server, db)
    usersREST(server, db)
    loginREST(server, db)
}