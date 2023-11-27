const { Faq } = require ('../../bd');

const deleteFaq = async ( id ) => {
    
    try{
        let setFaq = await Faq.findByPk(id)
            if(setFaq){
                    await Faq.update({
                        isdelete : true
                    },
                    {
                        where: {id:id}
                    })
            }
        return setFaq;

    }catch(e){
        console.log( "error en controller updateFaq", e.message);
    }
}

module.exports = deleteFaq;