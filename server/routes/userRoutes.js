const express = require('express');
const router = express.Router();
const StreamChat = require('stream-chat').StreamChat;
const { Client, Databases, Query } = require('node-appwrite');
const bcrypt = require('bcrypt');

// Initialize Stream Chat Client
const StreamClient = StreamChat.getInstance('8v8qsaucf6em', '7seufzx93t5rk5wnjeucey6pgj5vnsgrbkmghzy4z3q5f5hunq52qmxubbh25cuc');

// Initialize Appwrite Client
const appwriteClient = new Client();
appwriteClient
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('66db203000090f4aa825'); // Your Appwrite Project ID

const databases = new Databases(appwriteClient);

router.post('/reg', async (req, res) => {
    const { id, userEmail, passWord, Pic } = req.body;
    const hashedPassword = await bcrypt.hash(passWord, 12);
    console.log(req.body)

    if (!id || !userEmail || !passWord || !Pic) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Check if user already exists
        const existingUsers = await databases.listDocuments('DB001', '66db21d3000121e42b58', [
            Query.equal('email', userEmail),
        ]);

        if (existingUsers.total > 0) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        // Create new user document in Appwrite database
        await databases.createDocument(
            'DB001',
            '66db21d3000121e42b58',
            'unique()',
            {
                id: id,
                email: userEmail,
                passKey: hashedPassword,
                // image: Pic,
            }
        );

        // Create or update user on Stream Chat
        await StreamClient.upsertUser({
            id,
            name: id,
            email:userEmail,
        });

        res.status(200).json({ message: 'User registered successfully!' });
        console.log('success bro')
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

module.exports = router;
