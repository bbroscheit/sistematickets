const sectorRouter = require('express').Router();
const postSector = require('./controllers/postSector');
const getAllSector = require('./controllers/getAllSector');
const getAllSectorAdmin = require('./controllers/getAllSectorAdmin');
const deleteSector = require('./controllers/deleteSector');
const updateSectorStatus = require('./controllers/updateSectorStatus');

sectorRouter.get('/sector', async ( req,res) => {
    try {
        let allSector = await getAllSector();
        allSector ? res.status(200).json(allSector) : res.status(404).json({ state : "failure" })
    } catch (e) {
        console.log("error en ruta get sector", e.message)
    }
})

// trae TODOS los sectores (activos e inactivos) con la cantidad de usuarios
// asignados - solo para la pantalla de Gestion de Sectores
sectorRouter.get('/sector/all', async ( req,res) => {
    try {
        let allSector = await getAllSectorAdmin();
        allSector ? res.status(200).json(allSector) : res.status(404).json({ state : "failure" })
    } catch (e) {
        console.log("error en ruta get sector/all", e.message)
    }
})

// activa/desactiva un sector desde la pantalla de Gestion de Sectores
sectorRouter.put('/sector/:id/estado', async ( req,res) => {
    const { id } = req.params;
    const { isdelete } = req.body;
    try {
        let updated = await updateSectorStatus(id, isdelete);
        updated ? res.status(200).json({ state : "success" }) : res.status(404).json({ state : "failure" })
    } catch (e) {
        console.log("error en ruta put sector/:id/estado", e.message)
    }
})

sectorRouter.post( '/sector', async ( req,res ) => {
    const {sectorName, salepoint} = req.body;
    console.log(sectorName,salepoint);
    try {
        let newUser = await postSector(sectorName, salepoint)
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

