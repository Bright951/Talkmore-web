const express = require('express')
const router = express.Router()
const {CreateUserToken, CreateChannel} = require('../controllers/streamControllers')

router.post('/token', CreateUserToken)

router.post('/createChannel', CreateChannel)

module.exports= router;