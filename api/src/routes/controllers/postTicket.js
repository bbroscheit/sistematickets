const { Ticket } = require('../../bd')

const postTicket = async (state, worker, subject, detail, created, startdate, finishdate, randomdate) => {
    try {
        let newTicket = await Ticket.create({
            state, 
            worker, 
            subject, 
            detail, 
            created, 
            startdate, 
            finishdate, 
            randomdate
        })
        return newTicket
    } catch (e) {
        console.log("error en controller postTicket" , e.message)
    }
}

module.exports = postTicket