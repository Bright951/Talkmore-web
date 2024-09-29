const { Client, Account, Databases, Avatars, Storage, ID, Query} = require('appwrite');

const appwriteConfig ={
    projectID: process.env.REACT_APP_APPWRITE_PROJECT_ID,
    uri:process.env.REACT_APP_APPWRITE_PROJECT_URL,
    databaseID:process.env.REACT_APP_APPWRITE_DATABASE_ID,
    postCollectionID:process.env.REACT_APP_APPWRITE_DATABASE_POST_COLLECTION_ID,
    userCollectionID: process.env.REACT_APP_APPWRITE_DATABASE_USERS_COLLECTION_ID,
    savedPostCollectionID: process.env.REACT_APP_APPWRITE_DATABASE_SAVED_POSTS_COLLECTION_ID,
    storageBucketID: process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID,
    storageBucketTwoID: process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_TWO_ID,
}

const client = new Client();
client
    .setEndpoint(appwriteConfig.uri) 
    .setProject(appwriteConfig.projectID)

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
// const avatars = new Avatars(client);

const createPost = async(post)=>{
    try{
        console.log(post)
        const uploadedFile = await uploadFile(post.file[0])
        if(!uploadedFile){
            console.log('no uploaded file')
            return Error
        }

        const fileURL = getFilePreview(uploadedFile.$id)

        if(!fileURL){
            console.log('no fileurl')
            deleteFile(uploadedFile.$id)
            throw Error
        }

        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        const newPost= async()=>{
            await databases.createDocument(
                appwriteConfig.databaseID,
                appwriteConfig.postCollectionID,
                ID.unique(),
                {
                    creator: post.user_id,
                    desc: post.caption,
                    imageUrl: fileURL,
                    imgid: uploadedFile.$id,
                    tag: tags,
                    location: post.location,
                }
            )
        }

        if(!newPost){
            console.log('no new post created')
            deleteFile(uploadedFile.$id)
            return Error
        }

    }catch(err){
        console.log(err)
    }
}

async function uploadFile(file){
    try{
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageBucketID,
            ID.unique(),
            file
        )
        return uploadedFile
    }catch(err){
        console.log(err)
    }
}

async function getFilePreview(fileID){
    try{
        const fileURL = await storage.getFilePreview(
            appwriteConfig.storageBucketID,
            fileID,
            2000,
            2000,
            "top",
            100
        )
        return fileURL
    }catch(err){
        console.log(err)
    }
}

async function deleteFile(fileID){
    try{
        await storage.deleteFile(
            appwriteConfig.storageBucketID,
            fileID
        )
        return {status: 'ok'}
    }catch(err){
        console.log(err)
    }
}

async function getCurrentUser() {
    try {
        const currentAccount = await account.get()
        if(!currentAccount){
            console.log('no account found')
            return 'no account found'
        }
        const currentUser = await databases.listDocuments('TMWDB001', 'TMWC001', [
            Query.equal('id', [currentAccount.$id]),
        ]);
        if (!currentUser) {
            console.log('no user found')
            return 'no user found'
        }
        console.log(currentUser)
        return currentUser[0]
    } catch (error) {
        console.log(error)
        return error
    }
}

async function getRecentPosts(){
    const posts = await databases.listDocuments(
        appwriteConfig.databaseID, 
        appwriteConfig.postCollectionID,
        [Query.orderDesc('$createdAt'), Query.limit(100)]
    )

    if(!posts){
        return 'no recent posts found'
    }
    return posts
}

module.exports={
    getRecentPosts,
    createPost
}