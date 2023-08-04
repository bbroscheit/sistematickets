const sectorRouter = require('express').Router();
const postSector = require('./controllers/postSector');
const getAllSector = require('./controllers/getAllSector');
const deleteSector = require('./controllers/deleteSector');

sectorRouter.get('/sector', async ( req,res) => {
    try {
        let allSector = await getAllSector();
        allSector ? res.status(200).json(allSector) : res.status(404).send("failure")
    } catch (e) {
        console.log("error en ruta get sector", e.message)
    }
})

sectorRouter.post( '/sector', async ( req,res ) => {
    const {sectorname} = req.body;
    try {
        let newUser = await postSector(sectorname)
        newUser ? res.status(200).send("sucess") : res.status(404).send("failure");
    } catch (e) {
        console.log( "error en ruta post de user" , e.message)
    }
}) 

sectorRouter.delete( '/sector', async ( req, res ) => {
    const {id} = req.query
    try{
        let delSector = await deleteSector(id);
        delSector ? res.status(200).send("sucess") : res.status(404).send("failure")
    }catch(e){
        console.log("error en ruta delete sector" , e.message)
    }
})

module.exports = sectorRouter

