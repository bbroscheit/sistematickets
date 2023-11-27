const { Faq } = require("../../bd");

const unifyFaq = async (id, filterFaq) => {
  try {
    let setFaq = await Faq.findByPk(id);
    let unFaq = await Faq.findByPk(filterFaq[0].id);

    if (unFaq) {
      let currentQuestioner = unFaq.questioner || [];

      for (let i = 0; i < setFaq.questioner.length; i++) {
        currentQuestioner = [...currentQuestioner, setFaq.questioner[i]];
      }

      await unFaq.update({ questioner: currentQuestioner });
    }

    if (setFaq) {
      await Faq.update(
        {
          isdelete: true,
        },
        {
          where: { id: id },
        }
      );
    }

    return unFaq;
  } catch (e) {
    console.log("error en controller updateFaq", e.message);
  }
};

module.exports = unifyFaq;
