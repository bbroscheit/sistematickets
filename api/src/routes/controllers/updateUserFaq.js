const { Faq } = require('../../bd')

const updateUserFaq = async (id, userQuestioner) => {
  try {
      // Obtener el FAQ actual
      const faq = await Faq.findByPk(id);

      // Asegurarse de que se encontró el FAQ
      if (!faq) {
          throw new Error('FAQ no encontrado');
      }

      // Obtener el array actual de questioner
      let currentQuestioner = faq.questioner || [];

      // Agregar el nuevo usuario al array
      currentQuestioner = [...currentQuestioner, userQuestioner];

      // Actualizar el FAQ con el nuevo array questioner
      const setFaq = await faq.update({ questioner: currentQuestioner });

      return setFaq;
  } catch (error) {
      console.error('Error al actualizar el FAQ:', error.message);
      throw error;
  }
};


module.exports= updateUserFaq