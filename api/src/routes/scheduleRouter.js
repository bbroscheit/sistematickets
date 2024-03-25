const scheduleRouter = require("express").Router();
const getAllSchedule = require("../routes/controllers/getAllSchedule");
const getAllScheduleByDate = require ('../routes/controllers/getAllScheduleByDate')
const getAllScheduleById = require ('../routes/controllers/getAllScheduleById')
const postSchedule = require("../routes/controllers/postSchedule");
const giraFechas  = require("./helpers/girafechas");

scheduleRouter.get("/schedule", async (req, res) => {
  try {
    let allSchedule = await getAllSchedule();
    allSchedule ? res.status(200).json(allSchedule) : res.status(400).send("failure");
  } catch (e) {
    console.log("error en ruta getSchedule ", e.message);
  }
});

scheduleRouter.get("/schedule/:date", async (req, res) => {
  const { date } = req.params
  
    try {
        let scheduleByDate = await getAllScheduleByDate(date);
        scheduleByDate ? res.status(200).json(scheduleByDate) : res.status(400).json({state : "failure"})
    } catch (e) {
        console.log( "error en ruta get schedule date" , e.message)
    }
});

scheduleRouter.get("/schedule/id/:id", async (req, res) => {
  const { id } = req.params
  
    try {
        let scheduleById = await getAllScheduleById(id);
        
        scheduleById ? res.status(200).json(scheduleById) : res.status(400).json({state : "failure"})
    } catch (e) {
        console.log( "error en ruta get schedule id" , e.message)
    }
});

scheduleRouter.post("/schedule", async (req, res) => {
  const {  detail, invited, startdate, starthour, finishhour } = req.body;
    let accepted = []
    startdateModify = giraFechas(startdate)

  try {
    let newSchedule = await postSchedule( detail, invited, accepted, startdateModify, starthour, finishhour );
    newSchedule ? res.status(200).json({state: "success"}) : res.status(400).json({state : "failure"})
  } catch (e) {
    console.log("error en ruta postSchedule ", e.message);
  }
});

// faqRouter.put("/faq", async (req, res) => {
//   const { id , userQuestioner } = req.body;
  
//   try {
//     let updateFaq = await updateUserFaq(id , userQuestioner);
//     updateFaq ? res.status(200).json(updateFaq) : res.status(400).json("failure");
//   } catch (e) {
//     console.log("error en ruta updatefaq ", e.message);
//   }

// });

// faqRouter.put("/updateFaq/:id", async (req, res) => {
//   const { id } = req.params

//   try {
//     let updateCompleteFaq = await updateFaq(id , req.body);
//     updateCompleteFaq ? res.status(200).json(updateCompleteFaq) : res.status(400).json("failure");
//   } catch (e) {
//     console.log("error en ruta updatefaq ", e.message);
//   }

// });

// faqRouter.put("/deleteFaq/:id", async (req, res) => {
//   const { id } = req.params

//   try {
//     let faq = await deleteFaq(id);
//     faq ? res.status(200).json({state:"success"}) : res.status(400).json("failure");
//   } catch (e) {
//     console.log("error en ruta updatefaq ", e.message);
//   }

// });

// faqRouter.put("/unifyFaq/:id", async (req, res) => {
//   const { id } = req.params
  
//   try {
//     let faq = await unifyFaq(id, req.body);
//     faq ? res.status(200).json(faq) : res.status(400).json("failure");
//   } catch (e) {
//     console.log("error en ruta unifyfaq ", e.message);
//   }

// });



module.exports = scheduleRouter;