const roleRouter = require('express').Router();

const getAllRoles = require('./controllers/getAllRoles');

roleRouter.get('/role', async ( req, res ) => {
    try {
        let allRoles = await getAllRoles();
        allRoles ? res.status(200).json(allRoles) : res.status(400).send("failure")
    } catch (e) {
        console.log("error en ruta get roles" , e.message)
    }
})

module.exports = roleRouter;