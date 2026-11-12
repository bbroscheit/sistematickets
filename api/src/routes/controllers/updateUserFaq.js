const { Faq } = require('../../bd')

// agrega un usuario mas al array "questioner" de una faq existente (sin
// tocar los demas campos)
const updateUserFaq = async (id, userQuestioner) => {
  try {
      
      const faq = await Faq.findByPk(id);

      
      if (!faq) {
          throw new Error('FAQ no encontrado');
      }

      // Obteniene el array actual de questioner
      let currentQuestioner = faq.questioner || [];

      // Agrega el nuevo usuario al array
      currentQuestioner = [...currentQuestioner, userQuestioner];

      // Actualiza el FAQ con el nuevo array questioner
      const setFaq = await faq.update({ questioner: currentQuestioner });

      return setFaq;
  } catch (error) {
      console.error('Error al actualizar el FAQ:', error.message);
      throw error;
  }
};


module.exports= updateUserFaq