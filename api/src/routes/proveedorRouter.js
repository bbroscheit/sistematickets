const proveedorRouter = require("express").Router();
const postProveedor = require('../routes/controllers/postProveedor')
// const getAllUser = require("../routes/controllers/getAllUser");
// const getUserDetail = require("../routes/controllers/getUserDetail");
// const getAllWorker = require("../routes/controllers/getAllWorker");
// const loginUser = require("../routes/controllers/loginUser");
// const postUser = require("./controllers/postUser");
// const updateUser = require("./controllers/updateUser");
// const deleteUser = require("./controllers/deleteUser");


proveedorRouter.get("/user", async (req, res) => {
  try {
    let allUser = await getAllUser();
    allUser ? res.status(200).json(allUser) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta get user ", e.message);
  }
});

// proveedorRouter.get("/userDetail/:id", async (req, res) => {
//   const { id } = req.params
//     try {
//         let userDetail = await getUserDetail(id);
//         userDetail ? res.status(200).json(userDetail) : res.status(400).json({state:"failure"});
//     } catch (e) {
//         console.log( "error en ruta get userDetail" , e.message)
//     }  
// });


proveedorRouter.post("/proveedor", async (req, res) => {
  let {
    name, description, address, zone
  } = req.body;
  
  try {
    let newProveedor = await postProveedor(
      name, description, address, zone
    );
    newProveedor ? res.status(200).json({state:"sucess"}) : res.status(400).json({state:"failure"});;
  } catch (e) {
    console.log("error en ruta post proveedor ", e.message);
  }
});

// proveedorRouter.put("/updateUser/:id", async (req, res) => {
//   let { id } = req.params;
//   let {
//     username,
//     firstname,
//     lastname,
//     password,
//     email,
//     phonenumber,
//     isworker = false,
//     isprojectmanager = false,
//     isprojectworker = false,
//     sectorname = null,
//     salepoint = null,
//   } = req.body;

  
//   try {
//     let updatedUser = await updateUser(
//       id,
//       username,
//       firstname,
//       lastname,
//       password,
//       email,
//       phonenumber,
//       isworker,
//       isprojectmanager = false,
//       isprojectworker,
//       sectorname,
//       salepoint
//     );
//     updatedUser
//       ? res.status(200).json({state:"sucess"})
//       : res.status(404).json({state:"failure"});;
//   } catch (e) {
//     console.log("error en ruta put user", e.message);
//   }
// });



module.exports = proveedorRouter;