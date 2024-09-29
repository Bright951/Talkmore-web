require('dotenv').config();
const StreamChat = require('stream-chat').StreamChat;
const { Client, Databases, Query , Storage, ID, Account, Avatars} = require('node-appwrite');
const bcrypt = require('bcrypt');
const axios = require('axios');
const {getRecentPosts} = require('../functions/functions')

const StreamClient = StreamChat.getInstance(process.env.REACT_APP_STREAM_CHAT_API_KEY, process.env.REACT_APP_STREAM_CHAT_SECRET_KEY);

const appwriteClient = new Client();
appwriteClient
    .setEndpoint(process.env.REACT_APP_APPWRITE_PROJECT_URL) 
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID)
    .setKey(process.env.REACT_APP_APPWRITE_API_KEY)

const databases = new Databases(appwriteClient);
const storage = new Storage(appwriteClient);
const account = new Account(appwriteClient);
const avatars = new Avatars(appwriteClient);

const SignUpUser = async(req, res)=>{
    const { name, tag, userEmail, passKey} = req.body;
    console.log(req.body)
    if (!name || !userEmail || !passKey  || !tag) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    try {
        const Appwrite_User_Details = await account.create(
            ID.unique(),
            userEmail,
            passKey,
            name,
            { 
                tag: tag 
            }
        )

        const avatar = await avatars.getInitials(name)
        const avatarBlob = new Blob([avatar], { type: 'image/png' });
        const avatarFile = new File([avatarBlob], `avartar_${Appwrite_User_Details.$id}.png`, { type: 'image/png' });
        const avartar = await storage.createFile(
            process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID,
            ID.unique(),
            avatarFile
        )  
        const avartarURL = `${process.env.REACT_APP_APPWRITE_PROJECT_URL}/storage/buckets/${process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID}/files/${avartar.$id}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}`
        console.log(avartarURL)
            const existingUsers = await databases.listDocuments(process.env.REACT_APP_APPWRITE_DATABASE_ID, process.env.REACT_APP_APPWRITE_DATABASE_USERS_COLLECTION_ID, [
            Query.equal('tag', [tag]),
            Query.equal('email', [userEmail])
        ]);

        if (existingUsers.total > 0) {
            return res.status(400).json({ error: 'User already exists with this email or Tag' });
        }

        const New_User = await databases.createDocument(
            process.env.REACT_APP_APPWRITE_DATABASE_ID,
            process.env.REACT_APP_APPWRITE_DATABASE_USERS_COLLECTION_ID,
            ID.unique(),
            {
                email: Appwrite_User_Details.email,
                passKey: passKey,
                name: Appwrite_User_Details.name,
                id: Appwrite_User_Details.$id, 
                tag: tag,
                imgid: avartar.$id,
                imgurl: avartarURL,
            }
        )
    
        await StreamClient.upsertUser({
            email: Appwrite_User_Details.email,
            passKey: Appwrite_User_Details.password,
            name: Appwrite_User_Details.name,
            id: Appwrite_User_Details.$id, 
            tag: tag,
            image: avartarURL,
        })

        const session = await account.createEmailPasswordSession(New_User.email, New_User.passKey)

        return res.status(200).json({
            User:New_User,
            session
        });
         
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Failed to register user');
    }
}

const SignInUser = async(req, res)=>{
    const {passKey, userEmail, name} = req.body
    console.log(req.body)

    try{
        const IsValid = await databases.listDocuments(process.env.REACT_APP_APPWRITE_DATABASE_ID, process.env.REACT_APP_APPWRITE_DATABASE_USERS_COLLECTION_ID, [
            Query.equal('email', [userEmail]),
            Query.equal('name', [name]),
            Query.equal('passKey', [passKey])
        ]);

        if (IsValid.total === 0) {
            return res.status(400).json({ message: 'Invalid email or name' });
        }

        const userResponse = IsValid.documents[0]
        const document = JSON.stringify(userResponse)
        const user = JSON.parse(document)

        const session = await account.createEmailPasswordSession(user.email, user.passKey)

        res.json({user, session}).status(200)
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
        console.log(Users)
        
        res.status(200).json({ Users });
        
    } catch (err) {
        res.status(400).json({ error: err.message });  
        console.log(err); 
    }
    
}

const getRecentPost = async(req, res)=>{
   const posts = await getRecentPosts()
   return res.status(200).json(posts);
}

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
    changeTag,
    getRecentPost
}