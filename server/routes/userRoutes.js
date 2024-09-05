const express = require('express')
const router = express.Router()

router.post('/reg',(req,res)=>{
    const {name} = req.body
    return name
})

module.exports= router