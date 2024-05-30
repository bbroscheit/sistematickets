const proveedorRouter = require("express").Router();
const postProveedor = require('../routes/controllers/postProveedor')
const getAllProveedor = require('../routes/controllers/getAllProveedor')
const updateProveedor = require('../routes/controllers/updateProveedor')
const getAllNotes = require('../routes/controllers/getAllNote')
const closeProveedor = require ('../routes/controllers/closeProveedor')
// const getAllUser = require("../routes/controllers/getAllUser");
// const getUserDetail = require("../routes/controllers/getUserDetail");
// const getAllWorker = require("../routes/controllers/getAllWorker");
// const loginUser = require("../routes/controllers/loginUser");
// const postUser = require("./controllers/postUser");
// const updateUser = require("./controllers/updateUser");
// const deleteUser = require("./controllers/deleteUser");


proveedorRouter.get("/proveedor", async (req, res) => {
  try {
    let allProveedor = await getAllProveedor();
    allProveedor ? res.status(200).json(allProveedor) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta get proveedor ", e.message);
  }
});

proveedorRouter.post("/selectProveedor/:id", async (req, res) => {
  const { id } = req.params
    let {
    name , description  
  } = req.body;
    try {
        let proveedorAssigment = await updateProveedor(id , name , description );
        proveedorAssigment ? res.status(200).json({state:"success"}) : res.status(400).json({state:"failure"});
    } catch (e) {
        console.log( "error en ruta get updateProveedor" , e.message)
    }  
});

proveedorRouter.get("/proveedornote", async (req, res) => {
  
    try {
        let allNote = await getAllNotes();
        allNote ? res.status(200).json(allNote) : res.status(400).json({state:"failure"});
    } catch (e) {
        console.log( "error en ruta get proveedor note" , e.message)
    }  
});


proveedorRouter.post("/proveedor", async (req, res) => {
  let {
    name, description, address, zone
  } = req.body;
  
  try {
    let newProveedor = await postProveedor(
      name, description, address, zone
    );
    newProveedor ? res.status(200).json({state:"success"}) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta post proveedor ", e.message);
  }
});

proveedorRouter.put("/proveedornote/:id", async (req, res) => {
  let { id } = req.params;
   
  try {
    let updatedUser = await closeProveedor( id );
    updatedUser
      ? res.status(200).json({state:"success"})
      : res.status(404).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta proveedor note", e.message);
  }
});



module.exports = proveedorRouter;