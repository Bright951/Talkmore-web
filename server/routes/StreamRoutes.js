const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()
dotenv.config()
const {CreateUserToken} = require('../controllers/streamControllers')

router.post('/token', CreateUserToken)

router.post('/createChannel', async(req, res)=>{
    const {name} = req.body;
})

module.exports= router;