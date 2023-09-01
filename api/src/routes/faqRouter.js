const faqRouter = require("express").Router();
const getAllFaq = require("../routes/controllers/getAllFaq");


faqRouter.get("/faq", async (req, res) => {
  try {
    let allFaq = await getAllFaq();
    allFaq ? res.status(200).json(allFaq) : res.status(400).send("failure");
  } catch (e) {
    console.log("error en ruta get Faq ", e.message);
  }
});

// faqRouter.post("/faq", async (req, res) => {
//   const { title, description,  questioner } = req.body;

//   try {
//     let newFaq = await postFaq(title, description, answer, uresolved, questioner);
//     newFaq ? res.status(200).json(newFaq) : res.status(400).json("failure");
//   } catch (e) {
//     console.log("error en ruta postfaq ", e.message);
//   }
// });


module.exports = faqRouter;