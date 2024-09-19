const StreamChat = require('stream-chat').StreamChat;
const { Client, Databases, Query , Storage, ID} = require('node-appwrite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const fs = require('fs')

const axios = require('axios');
// const { Avatar } = require('stream-chat-react');

const StreamClient = StreamChat.getInstance('q9c62gfapz9y', '32bbtzd9ryha5qgpghyhp47f85jfybfsb3byts7r8xw4daawbhrn2wt55bep5593');

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
            Query.equal('tag', tag),
            Query.equal('email', userEmail)
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
    const {passKey, email, name} = req.body
    const secret = crypto.randomBytes(32).toString('hex')

    try{
        const IsValid = await databases.listDocuments('TMWDB001', 'TMWC001', [
            Query.equal('email', email),
            Query.equal('name', name)
        ]);
        if (IsValid.total === 0) {
            return res.status(400).json({ message: 'Invalid email or name' });
        }
        const user = IsValid.documents[0]
        const passwordMatch = await bcrypt.compare(passKey, user.passkey);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid or password' });
        }
        const token = jwt.sign({ userId: user.$id }, secret, { expiresIn: '1d' });

        const TokenResponse =  await axios.post('http://localhost:5000/stream/token', {
            id: user.$id
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
        const {LoggedInuserId} = req.body;  // Extract userDetails from req.bodog the parsed user object
        
        const response = await StreamClient.queryUsers({ 
            role: { $eq: 'user' },
            id:{$nin : [LoggedInuserId]},
            banned: false,
            // 'customField.isDeleted': false,
          });  // Query for users except the current one
        const Users = response.users;  // Extract users array from response
        
        console.log(Users);  // Log the users array
        res.status(200).json({ Users });  // Return the users as a JSON response
        
    } catch (err) {
        res.status(400).json({ error: err.message });  // Return error message in the response
        console.log(err);  // Log the error to the console
    }
    
}

module.exports={
    SignUpUser,
    SignInUser,
    getAllUsers
}