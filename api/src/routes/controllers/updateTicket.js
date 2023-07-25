const { Ticket, User} = require('../../bd')

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