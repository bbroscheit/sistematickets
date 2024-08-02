const scheduleRouter = require("express").Router();
const dayjs = require("dayjs"); 
const getAllSchedule = require("../routes/controllers/getAllSchedule");
const getAllScheduleByDate = require ('../routes/controllers/getAllScheduleByDate')
const getAllScheduleByDateBase = require ('../routes/controllers/getAllScheduleByDateBase')
const getAllScheduleById = require ('../routes/controllers/getAllScheduleById')
const getAllScheduleByMonth = require('../routes/controllers/getAllScheduleByMonth')
const postSchedule = require("../routes/controllers/postSchedule");
const giraFechas  = require("./helpers/girafechas");
const toggleAccepted = require('../routes/controllers/toggleAccepted');
const sendEmailSchedule = require('../routes/helpers/sendEmailSchedule');
const deleteSchedule = require('./controllers/deleteSchedule')

scheduleRouter.get("/schedule", async (req, res) => {
  try {
    let allSchedule = await getAllSchedule();
    allSchedule ? res.status(200).json(allSchedule) : res.status(400).send("failure");
  } catch (e) {
    console.log("error en ruta getSchedule ", e.message);
  }
});

// Cambiar el nombre de la ruta a "/schedules" para plural y agregar el parámetro de consulta en lugar de params
scheduleRouter.get("/schedules", async (req, res) => {
  const { date, startHour, finishHour } = req.query; 
  
  if (!date) {
      return res.status(400).json({ state: "failure", message: "Date query parameter is required" });
  }
  if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({ state: "failure", message: "Invalid date format" });
  }
  try {
      
      let scheduleByDate = await getAllScheduleByDateBase(date, startHour, finishHour);
      
      scheduleByDate && scheduleByDate.length > 0 ? res.status(400).json(scheduleByDate) : res.status(200).json({ state: "available" });
  } catch (e) {
      console.log("error en ruta get schedule date", e.message);
  }
});

scheduleRouter.get("/schedulesByMonth", async (req, res) => {
  const { month, user } = req.query; 
   
  try {
      
      let scheduleByMonth = await getAllScheduleByMonth(month, user);
      
      //scheduleByMonth && scheduleByMonth.length > 0 ? res.status(200).json(scheduleByMonth) : res.status(400).json({ state: "failure" });
      !scheduleByMonth ?  res.status(400).json({ state: "failure" }) : scheduleByMonth.length > 0 ? res.status(200).json(scheduleByMonth) : res.status(200).json({ state: 1 })
  } catch (e) {
      console.log("error en ruta get schedule date", e.message);
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

scheduleRouter.put("/toggleAccepted/:id", async (req, res) => {
  const { id } = req.params;
  const { user, firstname , lastname } = req.body
  
  try {
      let toggle = await toggleAccepted(id, user, firstname , lastname);
      toggle ? res.status(200).json({ state: "success" }) : res.status(400).json({ state: "failure" });
  } catch (e) {
      console.log("error en ruta put toggleAccepted", e.message);
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
  const {  detail, invited, accepted, startdate, starthour, finishhour } = req.body;
    //let accepted = []
    startdateModify = giraFechas(startdate)

  try {
    let newSchedule = await postSchedule( detail, invited, accepted, startdateModify, starthour, finishhour );
    //newSchedule ? res.status(200).json({state: "success"}) : res.status(400).json({state : "failure"})
    if(newSchedule){
      await sendEmailSchedule(detail, invited , startdateModify, starthour, finishhour)
      res.status(200).json({state: "success"}) 
    }else{
      res.status(400).json({state : "failure"})
    }
  } catch (e) {
    console.log("error en ruta postSchedule ", e.message);
  }
});

scheduleRouter.put("/deleteSchedule/:id", async (req, res) => {
  
  const { id } = req.params;

  try {
    let deletedSchedule = await deleteSchedule(id);
    deletedSchedule
      ? res.status(200).json({state:"success"})
      : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log(" error en ruta deletedSchedule", e.message);
  }
});

module.exports = scheduleRouter;