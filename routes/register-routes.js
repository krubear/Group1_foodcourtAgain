const authentication = require("./authentication")
const customersREST = require("./customersREST")
const customRoutes = require('./custom-routes')

module.exports = function(server, db){

    authentication(server, db)
    customersREST(server, db)
    customRoutes(server, db)
}