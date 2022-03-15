// const accessList = require('./access-list.json')

// module.exports = function(request, response, next){
//     // ? skapar en deep assertion, säkerställer att det finns en session innan den börjar iterera. Annars kraschar det
//     // we may have user roles from the db, OR the anononymous role from here
//     let user = request.session?.user || {roles:['anonymous']}
//     // and anyone has the wildcard-role
//     user.roles.push('*')

//     for (let route of accessList)
//         // am I on this route?
//         if(request.path === route.route){
//             // is the method I'm using registered on this route? 
//             if(route.methods.includes(request.method)){
//             // do I have any of the roles in this route object
//                 for(let role of route.roles){
//                     if(user.roles.includes(role)){
//                         return next() // success, we have access!! :->
//                     }
//                 }
//             }
//         }
        
    

//     // If user doesn't have access 
//     return response.status(403).json({error: "no access"})

//     // If user has access 
    
// }