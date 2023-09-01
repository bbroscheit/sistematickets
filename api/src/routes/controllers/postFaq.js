const { Faq } = require('../../bd')

const postFaq = async (title, description, answer, uresolved = false, questioner) => {
    
    try {
        let newFaq = await Faq.create({
            title,
            description,
            answer,
            uresolved,
            questioner,
           
        })
        return newFaq
    } catch (e) {
        console.log("error en controller posFaq" , e.message)
    }
}

module.exports = postFaq