const login = require('./loginREST')
const users = require('./usersREST')

module.exports = function(server, db){
    login(server, db)
    users(server, db)

}