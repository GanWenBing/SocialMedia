const express = require("express");
const usercontroller = require("../controller/Usercontroller")
const {verifyToken} = require("../middleware/VerifyToken")
const {refreshToken} = require("../controller/refreshToken")
const router = express.Router();

router.post("/createUser", usercontroller.createUser );

router.get('/getallusers',verifyToken, usercontroller.getAllUsers);

router.get('/finduser/:id', usercontroller.getUserByID);

router.post('/user/login', usercontroller.UserLogin);

router.delete('/deleteUser/:id', usercontroller.deleteUser);

router.put('/updateUser/:id', usercontroller.updateUser);

router.delete('/Logout', usercontroller.Logout)

router.get('/token', refreshToken)

router.get('/SearchAllUsers', usercontroller.SearchAllUsers)

router.get('/SearchFriendProfile/:id', usercontroller.SearchFriendProfile)

module.exports = router