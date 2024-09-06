const { StreamChat } = require('stream-chat');
const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()
dotenv.config()

const Client = StreamChat.getInstance('8v8qsaucf6em','7seufzx93t5rk5wnjeucey6pgj5vnsgrbkmghzy4z3q5f5hunq52qmxubbh25cuc');

router.post('/token', async(req, res)=>{
    const { id } = req.body;

    if(!id){
        return (
            res.status(400).send('User id is required')
        )
    }
    const token = Client.createToken(id);
   return res.json({ token });
})

router.post('/createChannel', async(req, res)=>{
    const {name} = req.body;
})

module.exports= router;