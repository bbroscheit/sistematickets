const { Faq } = require('../../bd');

const postFaq = async (title, description, answer, uresolved = false, questioner = "sin usuario asignado") => {
    try {

        // Busca un registro existente por título
        let existingFaq = await Faq.findOne({
            where: { title: title }
        });

        if (existingFaq) {
            // Si existe actualiza el campo detail , answer , uresolved y agrega un questioner
            existingFaq = await existingFaq.update({ description: description });
            existingFaq = await existingFaq.update({ answer: answer });
            existingFaq = await existingFaq.update({ uresolved: uresolved });
            
            let currentQuestioner = existingFaq.questioner || [];

            // Agregamos el nuevo usuario al array
            currentQuestioner = [...currentQuestioner, questioner];

            // Actualizar el FAQ con el nuevo array questioner
            const existingFaq = await existingFaq.update({ questioner: currentQuestioner });
            
            return existingFaq;
        } else {
            // Si no existe, crear un nuevo registro
            const newFaq = await Faq.create({
                title,
                description,
                answer,
                uresolved,
                questioner: [questioner],
            });
            return newFaq;
        }
    } catch (error) {
        console.log("Error en controller postFaq:", error.message);
        throw error;
    }
};

module.exports = postFaq;
