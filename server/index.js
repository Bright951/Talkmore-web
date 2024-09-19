const express = require('express')
const StreamRoutes = require('./routes/StreamRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const StreamChat = require('stream-chat').StreamChat
const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

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

const UserCredentials={
    id: 'john',
    name: 'John Doe',
    image: 'https://getstream.io/random_svg/?name=John',
}

// const CreateChannel= async ()=>{
//     try {
//         const channel = StreamClient.channel('messaging', 'travel', {
//             name: 'Our Chat',
//             created_by: { id: '7d9d06b2-f93d-4982-9413-09c46dfd55db' },
//             members: ['7d9d06b2-f93d-4982-9413-09c46dfd55db', 'cce17d22-0ba5-47cd-af76-41456e4de78b'],
//         });
//         await channel.watch();
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// CreateChannel()

// const channel = client.channel('messaging', {
//     members: ['thierry', 'tommaso'],
// });
// await channel.create();