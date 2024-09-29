require('dotenv').config();
const express = require('express')
const StreamRoutes = require('./routes/StreamRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

const corsOptions = {
    origin: process.env.BACKEND_CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies to be sent
};

const port = 5000 || process.env.BACKEND_PORT_NUMBER
const app = express()

app.use(express.json());
app.use(cors(corsOptions));
app.use('/stream', StreamRoutes)
app.use('/user',userRoutes)
app.listen(port, ()=>{
    console.log('server successfully started')
})


