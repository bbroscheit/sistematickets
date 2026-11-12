const { Faq } = require('../../bd');

// trae todas las faq activas
const getAllFaq = async () => {
    try {
        let allFaq = await Faq.findAll({
            where:{isdelete:false}, 
        });

        allFaq.sort((a , b) => { return a.id - b.id })

        return allFaq;
    } catch (e) {
        console.log("Error en controllers/getAllFaq.js" , e.message)
    }
}



module.exports = getAllFaq;