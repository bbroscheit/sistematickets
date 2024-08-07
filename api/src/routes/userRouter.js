const userRouter = require("express").Router();
const getAllUser = require("../routes/controllers/getAllUser");
const getUserDetail = require("../routes/controllers/getUserDetail");
const getAllWorker = require("../routes/controllers/getAllWorker");
const loginUser = require("../routes/controllers/loginUser");
const postUser = require("./controllers/postUser");
const updateUser = require("./controllers/updateUser");
const deleteUser = require("./controllers/deleteUser");


userRouter.get("/user", async (req, res) => {
  try {
    let allUser = await getAllUser();
    allUser ? res.status(200).json(allUser) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta get user ", e.message);
  }
});

userRouter.get("/userDetail/:id", async (req, res) => {
  const { id } = req.params
    try {
        let userDetail = await getUserDetail(id);
        userDetail ? res.status(200).json(userDetail) : res.status(400).json({state:"failure"});
    } catch (e) {
        console.log( "error en ruta get userDetail" , e.message)
    }  
});

userRouter.get("/worker", async (req, res) => {
  try {

    let allWorker = await getAllWorker();
    allWorker ? res.status(200).json(allWorker) : res.status(400).json({state:"failure"});
  } catch (e) {
    console.log("error en ruta get worker ", e.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let login = await loginUser(username, password);
    login ? res.status(200).json(login) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta post user ", e.message);
  }
});

userRouter.post("/user", async (req, res) => {
  let {
    username,
    firstname,
    lastname,
    password,
    email,
    phonenumber,
    isworker = false,
    isprojectmanager = false,
    isprojectworker = false,
    sectorname,
    salepoint,
  } = req.body;
  isworker === "yes" ? (isworker = true) : (isworker = false);
  try {
    let newUser = await postUser(
      username,
      firstname,
      lastname,
      password,
      email,
      phonenumber,
      isworker,
      isprojectmanager,
      isprojectworker,
      sectorname,
      salepoint
    );
    newUser ? res.status(200).json({state:"sucess"}) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta post user ", e.message);
  }
});

userRouter.put("/updateUser/:id", async (req, res) => {
  let { id } = req.params;
  let {
    username,
    firstname,
    lastname,
    password,
    email,
    phonenumber,
    isworker = false,
    isprojectmanager = false,
    isprojectworker = false,
    sectorname = null,
    salepoint = null,
  } = req.body;

  
  try {
    let updatedUser = await updateUser(
      id,
      username,
      firstname,
      lastname,
      password,
      email,
      phonenumber,
      isworker,
      isprojectmanager = false,
      isprojectworker,
      sectorname,
      salepoint
    );
    updatedUser
      ? res.status(200).json({state:"sucess"})
      : res.status(404).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta put user", e.message);
  }
});

userRouter.put("/deleteUser/:id", async (req, res) => {
  
  const { id } = req.params;

  try {
    let deletedUser = await deleteUser(id);
    deletedUser
      ? res.status(200).json({state:"success"})
      : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log(" error en ruta delete user", e.message);
  }
});

module.exports = userRouter;
