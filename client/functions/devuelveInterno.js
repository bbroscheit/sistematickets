export function devuelveInterno(userTrim , users) {
    let interno = 0
    let user = userTrim.trim()

    for (let i = 0; i < users.length; i++) {
        if(user === users[i].username.toLowerCase()){
            interno = users[i].phonenumber
        }
    }
      
    return interno
  }
  