import {account, databases, Query, storage, appwriteConfig, ID} from './appwriteConfig'

export async function getCurrentUser() {
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
        return currentUser[0]
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function createPost(post){
    try{
        console.log(post)
        const uploadedFile = await uploadFile(post.files[0])
        if(!uploadedFile){
            return Error
        }

        const fileURL = await getFilePreview(uploadedFile.$id)

        if(!fileURL){
            deleteFile(uploadedFile.$id)
            throw Error
        }

        const tags = post.tag?.replace(/ /g, "").split(",") || [];

            await databases.createDocument(
                appwriteConfig.databaseID,
                appwriteConfig.postCollectionID,
                ID.unique(),
                {
                    creator: post.user_id,
                    desc: post.desc,
                    imageUrl: fileURL,
                    imgId: uploadedFile.$id,
                    tag: tags,
                    location: post.location,
                }
            )

        // if(!newPost){
        //     deleteFile(uploadedFile.$id)
        //     return Error
        // }

    }catch(err){
        console.log(err)
    }
}

export async function uploadFile(file){
    try{
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageBucketTwoID,
            ID.unique(),
            file
        )
        console.log(uploadedFile)
        return uploadedFile
    }catch(err){
        console.log(err)
    }
}

export async function getFilePreview(fileID){
    try{
        const fileURL = await storage.getFilePreview(
            appwriteConfig.storageBucketTwoID,
            fileID,
            2000,
            2000,
            "top",
            100
        )
        console.log(fileURL)
        return fileURL
    }catch(err){
        console.log(err)
    }
}
export async function deleteFile(fileID){
    try{
        await storage.deleteFile(
            appwriteConfig.storageBucketTwoID,
            fileID
        )
        return {status: 'ok'}
    }catch(err){
        console.log(err)
    }
}
export async function signOutUser(){
    try{
        const session = await account.deleteSession()
        return session
    }catch(err){
        console.log(err)
    }
}

export async function likePost({postId, userId, likesArray}){
    try {
        if (!Array.isArray(likesArray)) {
            console.error('likesArray is not an array:', likesArray);
            throw new Error('Invalid likesArray');
        }
        
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionID,
            postId,
            {
                stars: likesArray,
            }
        );

        console.log('Updated Post:', updatedPost); // Debugging log 
        console.log('pid:', postId); 
        console.log('arr:', likesArray);

        if (!updatedPost) {
            throw new Error('Post update failed');
        }

        return updatedPost; // Return the updated post if needed
    } catch (err) {
        console.error('Error updating post:', err);
        return err; // Return the error for further handling
    }
}
export async function savePost({postId, userId}){
    try{
        const savedPost = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.savedPostCollectionID,
            ID.unique,
            {
                user: userId,
                post: postId
            }
        )
        if(!savedPost){
            return Error
        }
    }catch(err){
        console.log(err)
    }
}
export async function deletePost({savedRecordId}){
    try{
        const savedPost = await databases.deleteDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionID,
            savedRecordId,
        )
        return savedPost
    }catch(err){
        console.log(err)
    }
}
