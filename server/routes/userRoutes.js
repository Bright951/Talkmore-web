const express = require('express');
const multer = require('multer')
const router = express.Router();
const { SignUpUser, SignInUser , getAllUsers} = require("../controllers/userContollers");

const upload = multer({ dest: 'uploads/' });
router.post('/reg', upload.single('avatar'),SignUpUser);
router.post('/login', SignInUser)
router.post('/getUsers', getAllUsers)

module.exports = router