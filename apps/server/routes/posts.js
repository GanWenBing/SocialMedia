const express = require("express");
const router = express.Router();
const postscontroller = require("../controller/Postscontroller")

router.get("/getAllposts/:id", postscontroller.getAllposts); //by id

router.post('/createPosts/:id', postscontroller.createPosts)

router.delete('/deletePosts/:id', postscontroller.deletePosts)

router.get("/getAllpostsbyName/:id", postscontroller.getAllpostsbyName)

module.exports = router