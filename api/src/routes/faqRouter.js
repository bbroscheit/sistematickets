const faqRouter = require("express").Router();
const getAllFaq = require("../routes/controllers/getAllFaq");
const postFaq = require("../routes/controllers/postFaq");
const updateUserFaq = require("../routes/controllers/updateUserFaq");


faqRouter.get("/faq", async (req, res) => {
  try {
    let allFaq = await getAllFaq();
    allFaq ? res.status(200).json(allFaq) : res.status(400).send("failure");
  } catch (e) {
    console.log("error en ruta get Faq ", e.message);
  }
});

faqRouter.post("/faq", async (req, res) => {
  const { title, description, answer, uresolved, questioner } = req.body;

  try {
    
    let newFaq = await postFaq( title, description, answer, uresolved, questioner );
    newFaq ? res.status(200).json(newFaq) : res.status(400).json("failure");
  } catch (e) {
    console.log("error en ruta postfaq ", e.message);
  }
});

faqRouter.put("/faq", async (req, res) => {
  const { id , userQuestioner } = req.body;
  
  try {
    let updateFaq = await updateUserFaq(id , userQuestioner);
    updateFaq ? res.status(200).json(updateFaq) : res.status(400).json("failure");
  } catch (e) {
    console.log("error en ruta updatefaq ", e.message);
  }

});


module.exports = faqRouter;