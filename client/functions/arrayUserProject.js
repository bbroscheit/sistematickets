// usernames de los miembros de un proyecto, salvo el primero (se asume que
// el primero es el que crea el proyecto, por eso el shift si hay mas de uno)
export default function arrayUserProject(data) {
      let users = data.users
         let usernames = []

     for (let i = 0; i < users.length; i++) {
        usernames.push(users[i].username)
        
     }

     usernames.length > 1 ? usernames.shift() : []
    
     //console.log("usernames array", usernames)  
   return usernames
}