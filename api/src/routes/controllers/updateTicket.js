const { Ticket, User} = require('../../bd')

// edicion manual completa de un ticket (lo usa alguna pantalla de
// administracion). si viene "username" reasigna el usuario del ticket -
// primero lo desvincula (setUser sin argumentos) y despues lo vuelve a
// asignar, para forzar que quede solo el nuevo
const updateTicket = async (id, state, worker, subject, detail, created, startdate, finishdate, randomdate, username) => {
    let setTicket = await Ticket.findByPk(id , {
        include:[{
            model:User,
            attribute:["username", "sector" , "salepoint"]
        }]
    })

    if(username){
        let setUser = await User.findOne({
            where:{username:username}
        })
        if(setUser){
            await setTicket.setUser();
            await setTicket.setUser(setUser);
        }
    }

    await Ticket.update({
        state, 
        worker, 
        subject, 
        detail, 
        created, 
        startdate, 
        finishdate, 
        randomdate
    },{
        where:{id:id}
    })

    return setTicket
}

module.exports= updateTicket