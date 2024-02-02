const gpRequestRouter = require("express").Router();
const getActiveConnection = require("../routes/controllers/getActiveConnection");

gpRequestRouter.get("/activeConnection", async (req, res) => {
  try {
    let allActiveUser = await getActiveConnection();
    allActiveUser ? res.status(200).json(allActiveUser) : res.status(500).json({ error: 'Error interno del servidor' });
  } catch (e) {
    console.log("error en ruta activeConnection ", e.message);
  }
});

module.exports = gpRequestRouter;