const express = require('express')
const StreamRoutes = require('./routes/StreamRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const StreamChat = require('stream-chat').StreamChat
const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')
const {StreamVideoClient} = require('@stream-io/video-client');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies to be sent
};

const port = 5000
const app = express()

app.use(express.json());
app.use(cors(corsOptions));
app.use('/stream', StreamRoutes)
app.use('/user',userRoutes)
app.listen(port, ()=>{
    console.log('server successfully started')
})

const StreamClient = StreamChat.getInstance('9p8295bc7zpv','8926gf82n3vp99egt2rtwshstyy5mvfk47urt3z7yq6buprb6bff7fhfxk8qtyk4');

const PostFile = async(file)=>{
    await axios.post(file, 'http://localhost:5000/user/reg')
    console.log('posted');
}

// app.post('/profile', upload.single('avatar'), function (req, res, next){
//     const file = (req.file)
//     PostFile(file)
// })

// const UserCredentials={
//     id: 'john',
//     name: 'John Doe',
//     image: 'https://getstream.io/random_svg/?name=John',

// }

const apiKey = '9p8295bc7zpv';
const UserId = 'ket' 

// const client = new StreamVideoClient({ apiKey });

// // Connect the user using the token and user ID
// const connectUser = async () => {
//   try {
//     const  token = StreamClient.createToken(UserId)
//     // console.log(token)
//     await client.connectUser({ id: UserId }, token);
//     console.log('User connected to Stream Video Client');
//     // Once connected, join a video call
//     const call = client.call('default', 'call-id'); // Adjust call type and call ID
//     await call.join({ create: true });
    
//     console.log('Successfully joined the call');
//   } catch (error) {
//     console.error('Error connecting user or joining call:', error);
//   }
// }

// connectUser()

