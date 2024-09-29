import { Client, Account, Databases, Avatars, Storage} from 'appwrite';
export { ID, Query } from 'appwrite';

export const client = new Client();

export const appwriteConfig ={
    projectID: process.env.REACT_APP_APPWRITE_PROJECT_ID,
    uri:process.env.REACT_APP_APPWRITE_PROJECT_URL,
    databaseID:process.env.REACT_APP_APPWRITE_DATABASE_ID,
    postCollectionID:process.env.REACT_APP_APPWRITE_DATABASE_POST_COLLECTION_ID,
    userCollectionID: process.env.REACT_APP_APPWRITE_DATABASE_USERS_COLLECTION_ID,
    savedPostCollectionID: process.env.REACT_APP_APPWRITE_DATABASE_SAVED_POSTS_COLLECTION_ID,
    storageBucketID: process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID,
    storageBucketTwoID: process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_TWO_ID,
}

client
    .setEndpoint(appwriteConfig.uri) 
    .setProject(appwriteConfig.projectID)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
