const getDetailWithoutQuestion = async (ticket) => {
    
    try{
        let detail = ticket.detail.replace(/\n[^\n]*$/, '');
        
        return detail;
    }catch(e){
        console.log( "error en helper getDetailWithoutQuestion " , e.message)
    }
}

module.exports = getDetailWithoutQuestion 