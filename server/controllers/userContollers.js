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
            const Appwrite_token = jwt.sign({ user_id: Appwrite_User_Details.id }, secret, { expiresIn: '1d' });
        
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

        if (StreamClient && StreamClient.userID) {
            await StreamClient.disconnectUser();
        }

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

        if (IsValid.total === 0) {
            return res.status(400).json({ message: 'Invalid email or name' });
        }
        const userResponse = IsValid.documents[0]
        const document = JSON.stringify(userResponse)
        const user = JSON.parse(document)
        
        const passwordMatch = await bcrypt.compare(passKey, user.passkey);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid or password' });
        }
        const token = jwt.sign({ user_id: user.id }, secret, { expiresIn: '1d' });

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
        const response = await StreamClient.queryUsers({name:{$autocomplete: searchTerm}})
        console.log(response)
        res.status(200).json({Users : response})
    }catch(err){
        res.status(400)
        console.log(err)
    }
}

const LikeProfile = async(req, res)=>{
    const {likedUserId, likerId}=req.body
    console.log(req.body)
    try{
        const response = await databases.listDocuments('TMWDB001', 'TMWC002',[
            // Query.equal('likerId', [likerId]),
            Query.equal('LikedUserId', [likedUserId])
        ])
        if (response.documents.length === 0) {
            await databases.create(
                'TMWDB001',
                'TMWC002',
                ID.unique(),
                {
                    likerId,
                    likedUserId,
                }
            )
            return res.status(201).json({ message: 'Profile liked' });
        }else{
            return res.status(400).json({ error: 'Profile already liked' });
        }
    }catch(error){
        console.error('Error liking profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const UnlikeProfile = async(req, res)=>{
    const { likedUserId, likerId } = req.body;
    console.log(req.body)
    try{
        const response = await databases.listDocuments(
            'TMWDB001',
            'TMWC002',
            [
            //   Query.equal('likerId', [likerId]),
            Query.equal('LikedUserId', [likedUserId]),
            ]
          );
          if (response.documents.length > 0) {
            await databases.deleteDocument(
              'TMWDB001',
              'TWC002',
              response.documents[0].$id
            );
            return res.status(200).json({ message: 'Profile unliked' });
          } else {
            return res.status(400).json({ error: 'Profile not liked' });
          }
    }catch(error){
        console.error('Error unliking profile:', error);
      return res.status(500).json({ error: 'Internal server error' })
    }
}

const CheckIfLiked = async(req, res)=>{
    const { likedUserId, likerId } = req.query;
    console.log(req.body)

    try{
        const response = await databases.listDocuments(
            'TMWDB001',
            'TMWC002',
            [
                // Query.equal('likerId', likerId),
                Query.equal('LikedUserId', [likedUserId])
            ]
        );

        if (response.documents.length > 0) {
            return res.status(200).json({ liked: true });
        } else {
            return res.status(200).json({ liked: false });
        }
    }catch(error){
        console.error('Error checking like status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}  

const changePassWord=async(req, res)=>{
    try {
        const {oldPassWord, newPassWord, confirmPassWord, userPasskey, userId, streamUserId} = req.body.PasswordDetails
    console.log(req.body)
    
    // const hashedNewPassWord = await bcrypt.hash(newPassWord, 12)
    const hashedNewPassWord = await bcrypt.hash(newPassWord, 12);

    const updatedPassword={
        passkey: hashedNewPassWord,
    }

    const passwordMatch = await bcrypt.compare(oldPassWord, userPasskey);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        if(newPassWord !== confirmPassWord){
            res.status(400).json({error: 'please confirm your correct password'})
        }
        const response = await databases.updateDocument(
            'TMWDB001',
            'TMWC001', 
            userId, 
            updatedPassword
        )
        await StreamClient.upsertUser(
            { 
                id: streamUserId, 
                role: 'user', 
                passKey: hashedNewPassWord
            },
        );
        return res.status(200).json({ message: 'Password updated successfully', response });
    } catch (error) {
        console.error('Error updating document', error);
        return res.status(500).json({ error: 'An error occurred while updating the password' });
    }
    
}

const changeName = async(req,res)=>{
    try{
        const {newName, userId, streamUserId} = req.body.newDetails
        console.log(req.body)

        if(!newName || !userId){
            res.status(400).json({error : 'name and id is required'})
        }
        
        const updatedName={
            name: newName
        }

        const response = await databases.updateDocument(
            'TMWDB001',
            'TMWC001', 
            userId, 
            updatedName
        )
        await StreamClient.upsertUser(
            { 
                id: streamUserId, 
                name: newName
            },
        );
        return res.status(200).json({ message: 'name updated successfully', response });

    }catch(err){
        return res.status(500).json({ error: 'An error occurred while updating the name' });
    }
}

const changeEmail = async(req,res)=>{
    try{
        const {newEmail, userId, streamUserId} = req.body.newDetails
        console.log(req.body)

        if(!newEmail || !userId){
            res.status(400).json({error : 'Email and id is required'})
        }
        
        const updatedEmail={
            email: newEmail
        }

        const response = await databases.updateDocument(
            'TMWDB001',
            'TMWC001', 
            userId, 
            updatedEmail
        )
        await StreamClient.upsertUser(
            { 
                id: streamUserId, 
                email: newEmail
            },
        );
        return res.status(200).json({ message: 'email updated successfully', response });

    }catch(err){
        return res.status(500).json({ error: 'An error occurred while updating the email' });
    }
}

const changeTag = async(req,res)=>{
    try{
        const {newTag, userId, streamUserId} = req.body.newDetails
        console.log(req.body)

        if(!newTag || !userId){
            res.status(400).json({error : 'Tag and id is required'})
        }
        
        const updatedTag={
            tag: newTag
        }

        const response = await databases.updateDocument(
            'TMWDB001',
            'TMWC001', 
            userId, 
            updatedTag
        )
        await StreamClient.upsertUser(
            { 
                id: streamUserId, 
                tag: newTag
            },
        );
        return res.status(200).json({ message: 'email updated successfully', response });

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'An error occurred while updating the tag' });
    }
}
  
module.exports={
    SignUpUser,
    SignInUser,
    getAllUsers,
    searchUser,
    LikeProfile,
    UnlikeProfile,
    CheckIfLiked,
    changePassWord,
    changeName,
    changeEmail,
    changeTag
}