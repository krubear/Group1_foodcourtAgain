const authentication = require("./authentication")
const restaurantsREST = require("./restaurantsREST")
const customRoutes = require('./custom-routes')

module.exports = function (server, db) {

    authentication(server, db)
    restaurantsREST(server, db)
    customRoutes(server, db)
}