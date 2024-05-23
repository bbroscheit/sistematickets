export default function arrayUser(data) {
    
    let users= data.map( e => e.user.username)

    
    const uniqueArray = [...new Set(users)];
    

   return uniqueArray
}