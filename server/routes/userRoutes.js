const express = require('express');
const multer = require('multer')
const router = express.Router();
const { SignUpUser, SignInUser , getAllUsers, searchUser, LikeProfile, UnlikeProfile, CheckIfLiked} = require("../controllers/userContollers");

const upload = multer({ dest: 'uploads/' });
router.post('/reg', upload.single('avatar'),SignUpUser);
router.post('/login', SignInUser)
router.post('/getUsers', getAllUsers)
router.post('/searchUsers', searchUser)
router.post('/LikeUser', LikeProfile)
router.post('/UnlikeUser', UnlikeProfile)
router.post('/CheckLikeStatus', CheckIfLiked)

module.exports = router