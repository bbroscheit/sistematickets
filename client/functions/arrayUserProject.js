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