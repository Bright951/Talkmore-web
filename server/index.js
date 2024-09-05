const express = require('express')
const StreamRoutes = require('./routes/StreamRoutes')
const userRoutes = require('./routes/userRoutes')
const StreamChat = require('stream-chat').StreamChat
const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')


const port = 6000
const app = express()

app.use(express.json());
app.use('/stream', StreamRoutes)
app.use('/user', userRoutes)
app.listen(port, ()=>{
    console.log('server successfully started')
})

const Client = StreamChat.getInstance('8v8qsaucf6em','7seufzx93t5rk5wnjeucey6pgj5vnsgrbkmghzy4z3q5f5hunq52qmxubbh25cuc');

const UserCredentials={
    id: 'john',
    name: 'John Doe',
    image: 'https://getstream.io/random_svg/?name=John',
}

const CreateUser= async()=>{

   const TokenResponse =  await axios.post('http://localhost:6000/stream/token', {
        id: UserCredentials.id
    })
    const userToken = TokenResponse.data.token
    await Client.connectUser(
        {
            id: UserCredentials.id,
            name: UserCredentials.name,
            image: UserCredentials.image,
        },
        userToken
    )
}
CreateUser();
