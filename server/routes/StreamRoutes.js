const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()
dotenv.config()
const {CreateUserToken, CreateChannel} = require('../controllers/streamControllers')

router.post('/token', CreateUserToken)

router.post('/createChannel', CreateChannel)

module.exports= router;