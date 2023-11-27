const { Faq } = require ('../../bd');

const updateFaq = async ( id , inputFaq  ) => {
    console.log( " updateFaq", id, inputFaq)
    try{
        let setFaq = await Faq.findByPk(id)
            if(setFaq){
                if( inputFaq.title ){
                    await Faq.update({
                        title: inputFaq.title
                    },
                    {
                        where: {id:id}
                    })
                }
                if( inputFaq.description ){
                    await Faq.update({
                        description: inputFaq.description
                    },
                    {
                        where: {id:id}
                    })
                }
                if( inputFaq.answer ){
                    await Faq.update({
                        answer: inputFaq.answer
                    },
                    {
                        where: {id:id}
                    })
                }
                if( inputFaq.uresolved ){
                    await Faq.update({
                        uresolved: inputFaq.uresolved
                    },
                    {
                        where: {id:id}
                    })
                }
            }

        

        return setFaq;
    }catch(e){
        console.log( "error en controller updateFaq", e.message);
    }
}

module.exports = updateFaq;