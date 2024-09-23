const StreamChat = require('stream-chat').StreamChat;
const { Client, Databases, Query , Storage, ID} = require('node-appwrite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const fs = require('fs')

const axios = require('axios');
// const { Avatar } = require('stream-chat-react');

const StreamClient = StreamChat.getInstance('7xbczcyhwmhd', '3m8pq4v7b66wefunef3kgbqyt3cdspvpnnms9j9qfbt7vkxanmddhrumq96wp2rv');

const appwriteClient = new Client();
appwriteClient
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66db203000090f4aa825'); 

const databases = new Databases(appwriteClient);
const storage = new Storage(appwriteClient);


const SignUpUser = async(req, res)=>{
    const { name, tag, userEmail, passKey, avatar} = req.body;
    const hashedPassword = await bcrypt.hash(passKey, 12);
    console.log(req.body)
    const id = uuidv4();
    const uid = id.toString()
    // console.log(id)
    if (!name || !userEmail || !passKey  || !tag) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const secret = crypto.randomBytes(32).toString('hex')
    try {
        const existingUsers = await databases.listDocuments('TMWDB001', 'TMWC001', [
            Query.equal('tag', [tag]),
            Query.equal('email', [userEmail])
        ]);

        if (existingUsers.total > 0) {
            return res.status(400).json({ error: 'User already exists with this email or Tag' });
        }
        const Appwrite_User_Details = await databases.createDocument(
            'TMWDB001',
            'TMWC001',
            ID.unique(),
            {
                id:uid,
                name:name,
                email: userEmail,
                passkey: hashedPassword,
                tag:tag,
                // image: Pic,
            }
        )
            const Appwrite_token = jwt.sign({ userId: Appwrite_User_Details.$id }, secret, { expiresIn: '1d' });
        

        await StreamClient.upsertUser({
            id: uid,
            name: name,
            email:userEmail,
            tag:tag,
        })
        
        const TokenResponse =  await axios.post('http://localhost:5000/stream/token', {
            id: uid
        })
        const userToken = TokenResponse.data.token

        if (StreamClient && StreamClient.userID) {
            await StreamClient.disconnectUser();
        }

        await StreamClient.connectUser(
            {
                id: uid,
                name: name,
                tag: tag,
                email:userEmail
            },
            userToken
        )
        return res.status(200).json({
            token: Appwrite_token,
            AppWriteuser:Appwrite_User_Details,
            StreamUser:{id:id, name:name, tag:tag, email:userEmail}
        });
         
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Failed to register user');
    }
}

const SignInUser = async(req, res)=>{
    const {passKey, userEmail, name} = req.body
    const secret = crypto.randomBytes(32).toString('hex')
    console.log(req.body)

    try{
        const IsValid = await databases.listDocuments('TMWDB001', 'TMWC001', [
            Query.equal('email', [userEmail]),
            Query.equal('name', [name])
        ]);
        console.log(IsValid)
        if (IsValid.total === 0) {
            return res.status(400).json({ message: 'Invalid email or name' });
        }
        const userResponse = IsValid.documents[0]
        const document = JSON.stringify(userResponse)
        const user = JSON.parse(document)
        console.log(user)
        const passwordMatch = await bcrypt.compare(passKey, user.passkey);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid or password' });
        }
        const token = jwt.sign({ userId: user.$id }, secret, { expiresIn: '1d' });

        const TokenResponse =  await axios.post('http://localhost:5000/stream/token', {
            id: user.id
        })
        const userToken = TokenResponse.data.token
        await StreamClient.connectUser(
            {
                id: user.id,
                name: user.name,
                tag: user.tag,
                email: user.email
            },
            userToken
        )
        res.json({token, user}).status(200)
    }catch(error){
        console.log(error);
    }
}

const getAllUsers =async(req, res)=>{
    try {
        const {LoggedInuserId} = req.body;

        const response = await StreamClient.queryUsers({ 
            role: { $eq: 'user' },
            id:{$nin : [LoggedInuserId]},
            banned: false,
          });
        const Users = response.users;
        
        res.status(200).json({ Users });
        
    } catch (err) {
        res.status(400).json({ error: err.message });  
        console.log(err); 
    }
    
}

// const response = await serverClient.queryUsers({ name: { $autocomplete: 'ro' } });

const searchUser=async(req, res)=>{
    const {searchTerm}=req.body
    console.log(req.body)
    try{
        const response = await StreamClient.queryUsers({name:{$autocomplete: searchTerm}}, {tag:{$autocomplete: searchTerm}})
        console.log(response)
        res.status(200).json({Users : response})
    }catch(err){
        res.status(400)
        console.log(err)
    }
}

module.exports={
    SignUpUser,
    SignInUser,
    getAllUsers,
    searchUser
}