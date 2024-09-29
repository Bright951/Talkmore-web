const express = require('express');
const router = express.Router();
const { SignUpUser, SignInUser, getRecentPost, getAllUsers, searchUser, LikeProfile, UnlikeProfile, changeTag, CheckIfLiked,changeEmail,changePassWord,changeName} = require("../controllers/userContollers");

router.post('/reg', SignUpUser);
router.post('/login', SignInUser)
router.post('/getUsers', getAllUsers)
router.get('/recentPosts', getRecentPost)
router.post('/searchUsers', searchUser)
router.post('/LikeUser', LikeProfile)
router.post('/UnlikeUser', UnlikeProfile)
router.post('/CheckLikeStatus', CheckIfLiked)
router.post('/changeAccountPassWord', changePassWord)
router.post('/changeAccountName', changeName)
router.post('/changeAccountEmail', changeEmail)
router.post('/changeAccountTag', changeTag)

module.exports = router