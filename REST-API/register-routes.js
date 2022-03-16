const menus = require('./menusREST')

module.exports = function(server, db){
    menus(server, db)
}