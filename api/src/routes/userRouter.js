const userRouter = require('express').Router()
const getAllUser = require('../routes/controllers/getAllUser')
const postUser = require('./controllers/postUser')
const updateUser = require('./controllers/updateUser')
const deleteUser = require('./controllers/deleteUser')

userRouter.get('/user', async ( req, res ) => {
    try {
        let allUser = await getAllUser()
        allUser ? res.status(200).json(allUser) : res.status(400).send("failure") 
    } catch (e) {
        console.log("error en ruta get user ", e.message)
    }
})

userRouter.post('/user', async ( req, res ) => {
    const { username, firstname, lastname, password, email, phonenumber, isWorker = false } = req.body
    try {
        let newUser = await postUser(username, firstname, lastname, password, email, phonenumber, isWorker)
        newUser ? res.status(200).json("sucess") : res.status(400).send("failure") 
    } catch (e) {
        console.log("error en ruta post user ", e.message)
    }
})

userRouter.put( '/user' , async ( req , res ) => {
    const {id} = req.query
    const {username, firstname, lastname, password, email, phonenumber, isworker = false, sectorname = null , salepoint = null} = req.body

    try {
        let updatedUser = await updateUser(id, username, firstname, lastname, password, email, phonenumber, isworker, sectorname, salepoint )
        updatedUser ? res.status(200).send("sucess") : res.status(404).send("failure") 

    } catch (e) {
        console.log( "error en ruta put user" , e.message)
    }

}) 

userRouter.delete( '/user' , async ( req, res ) => {
    const { id } = req.query

    try {
        let deletedUser = await deleteUser(id)
        deletedUser ? res.status(200).send("sucess") : res.status(400).send("failure")

    } catch (e) {
        console.log( " error en ruta delete user" , e.message)
    }
})

module.exports = userRouter;

