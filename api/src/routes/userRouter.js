const userRouter = require('express').Router()
const getAllUser = require('../routes/controllers/getAllUser')
const postUser = require('./controllers/postUser')

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

module.exports = userRouter;

