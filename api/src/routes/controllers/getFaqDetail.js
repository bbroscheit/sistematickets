const { Faq } = require('../../bd');

// detalle de una faq puntual
const getFaqDetail = async (id) => {
    
    try {
        let faqDetail = await Faq.findOne({
            where:{id: id}, 
        });
        return faqDetail;
    } catch (e) {
        console.log("Error en controllers/getFaqdetail.js" , e.message)
    }
}



module.exports = getFaqDetail;