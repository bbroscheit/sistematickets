const { Faq } = require('../../bd');

// si ya existe una faq con ese titulo, la actualiza y agrega a quien la
// volvio a preguntar al array "questioner" (ver faq.js). si no existe,
// crea una nueva
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
            // esto decia "const existingFaq = ..." en vez de reusar la variable
            // de arriba. en js eso hace que TODAS las referencias a
            // "existingFaq" en este bloque (incluidas las de mas arriba) apunten
            // a esta nueva variable todavia no inicializada, y tira
            // "Cannot access 'existingFaq' before initialization" apenas se
            // entra al if. lo corrijo sacando el "const" porque es un typo,
            // sino esta rama (actualizar una faq que ya existe) no funciona
            existingFaq = await existingFaq.update({ questioner: currentQuestioner });

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
