const express = require("express");
const router = express.Router();
const relationshipcontroller = require('../controller/Relationshipcontroller')

router.get('/getAllfollowingPost/:id', relationshipcontroller.getAllfollowingPost)

router.post('/addFriend/:id', relationshipcontroller.AddFriend) // add friend by id

router.get('/showFriend/:id', relationshipcontroller.showFriend)

router.delete('/deleteFriend/:id', relationshipcontroller.deleteFriend)


module.exports = router