const salepointRouter = require('express').Router();
const getAllSalepoint = require('./controllers/getAllSalepoint');
const postSalepoint = require('./controllers/postSalepoint');
const deleteSalepoint = require('./controllers/deleteSalepoint')


salepointRouter.get('/salepoint', async ( req, res ) => {
    try {
        let allSalepoint = await getAllSalepoint();
        allSalepoint ? res.status(200).json(allSalepoint) : res.status(400).send("failure")
    } catch (e) {
        console.log("error en ruta get salepoint" , e.message)
    }
})

salepointRouter.post('/salepoint', async ( req, res ) => {
    const salepoint = req.body.salepoint
    
    try{
        let newSalepoint = await postSalepoint(salepoint);
        newSalepoint ? res.status(200).send("success") : res.status(400).send("failure")
    }catch(e){
        console.log("error en ruta post salepoint", e.message)
    }
})

salepointRouter.delete('/salepoint' , async( req, res ) => {
    const {id} = req.query
    try {
        let delSalepoint = await deleteSalepoint(id);
        delSalepoint ? res.status(200).send("success") : res.status(400).send("failure")
    } catch (e) {
        console.log("error en ruta delete salepoint" , e.message)
    }
})

module.exports = salepointRouter;