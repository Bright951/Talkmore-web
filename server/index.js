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
app.use('/user', userRoutes)
app.listen(port, ()=>{
    console.log('server successfully started')
})

const StreamClient = StreamChat.getInstance('8v8qsaucf6em','7seufzx93t5rk5wnjeucey6pgj5vnsgrbkmghzy4z3q5f5hunq52qmxubbh25cuc');

const UserCredentials={
    id: 'john',
    name: 'John Doe',
    image: 'https://getstream.io/random_svg/?name=John',
}

const CreateUser= async()=>{

   const TokenResponse =  await axios.post('http://localhost:5000/stream/token', {
        id: UserCredentials.id
    })
    const userToken = TokenResponse.data.token
    await StreamClient.connectUser(
        {
            id: UserCredentials.id,
            name: UserCredentials.name,
            image: UserCredentials.image,
        },
        userToken
    )
    
}
CreateUser();

const CreateChannel= async ()=>{
    try {
        const channel = StreamClient.channel('messaging', 'travel', {
            name: 'First Chat',
            created_by: { id: 'john' },
        });
        await channel.watch();
    } catch (error) {
        console.log(error.message);
    }
}
// CreateChannel()
