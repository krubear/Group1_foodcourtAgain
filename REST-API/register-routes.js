const ordersREST = require('./ordersREST')
const authentication = require("./authentication")

module.exports = function(server, db){
    ordersREST(server, db)
    authentication(server, db)
}
