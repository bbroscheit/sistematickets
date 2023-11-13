const { Ticket, User } = require('../../bd')

const postTicket = async (state, worker, subject, detail, answer, userresolved, user, created, startdate, finishdate, randomdate) => {
    
    try {
        let newTicket = await Ticket.create({
            state, 
            worker, 
            subject, 
            detail, 
            answer,
            userresolved,
            created, 
            startdate, 
            finishdate, 
            randomdate
        })

        if (user) {
            let userFinder = await User.findOne({
              where: {
                username: user,
              },
            });
            if (userFinder) {
             await newTicket.setUser(userFinder.id);
            }
          }

        return newTicket
        
    } catch (e) {
        console.log("error en controller postTicket" , e.message)
    }
}

module.exports = postTicket