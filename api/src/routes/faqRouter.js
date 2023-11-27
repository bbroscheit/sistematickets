const faqRouter = require("express").Router();
const getAllFaq = require("../routes/controllers/getAllFaq");
const postFaq = require("../routes/controllers/postFaq");
const updateUserFaq = require("../routes/controllers/updateUserFaq");
const updateFaq = require("../routes/controllers/updateFaq");
const getFaqDetail = require("../routes/controllers/getFaqDetail");
const deleteFaq = require ("../routes/controllers/deleteFaq")
const unifyFaq = require ("../routes/controllers/unifyFaq.js")


faqRouter.get("/faq", async (req, res) => {
  try {
    let allFaq = await getAllFaq();
    allFaq ? res.status(200).json(allFaq) : res.status(400).send("failure");
  } catch (e) {
    console.log("error en ruta get Faq ", e.message);
  }
});

faqRouter.get("/faqDetail/:id", async (req, res) => {
  const { id } = req.params
  console.log("id",id)
    try {
        let faqDetail = await getFaqDetail(id);
        faqDetail ? res.status(200).json(faqDetail) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get faqDetail" , e.message)
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

faqRouter.put("/updateFaq/:id", async (req, res) => {
  const { id } = req.params

  try {
    let updateCompleteFaq = await updateFaq(id , req.body);
    updateCompleteFaq ? res.status(200).json(updateCompleteFaq) : res.status(400).json("failure");
  } catch (e) {
    console.log("error en ruta updatefaq ", e.message);
  }

});

faqRouter.put("/deleteFaq/:id", async (req, res) => {
  const { id } = req.params

  try {
    let faq = await deleteFaq(id);
    faq ? res.status(200).json(faq) : res.status(400).json("failure");
  } catch (e) {
    console.log("error en ruta updatefaq ", e.message);
  }

});

faqRouter.put("/unifyFaq/:id", async (req, res) => {
  const { id } = req.params
  
  try {
    let faq = await unifyFaq(id, req.body);
    faq ? res.status(200).json(faq) : res.status(400).json("failure");
  } catch (e) {
    console.log("error en ruta unifyfaq ", e.message);
  }

});



module.exports = faqRouter;