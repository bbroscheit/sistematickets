<<<<<<< HEAD
const { Ticket, User } = require('../../bd')

const postTicket = async (state, worker, subject, detail, answer, userresolved, user, created, startdate, finishdate, randomdate) => {
=======
const { Ticket, User} = require('../../bd')

const postTicket = async (state, worker, subject, detail, userresolved, user, created, startdate, finishdate, randomdate) => {
>>>>>>> 6ca68fe5e624c8acd0b13a6e750ec3822d9404da
    
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

<<<<<<< HEAD
=======

>>>>>>> 6ca68fe5e624c8acd0b13a6e750ec3822d9404da
        return newTicket
        
    } catch (e) {
        console.log("error en controller postTicket" , e.message)
    }
}

module.exports = postTicket