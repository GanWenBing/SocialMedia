const express = require("express");
const router = express.Router();
const postcontroller = require("../controller/Postcontroller")

router.get("/getAllpost", postcontroller.getAllpost);

router.post("/createPost/:id", postcontroller.createPost);// userid

router.delete("/deletePost/:id", postcontroller.deletePost);// post id

router.put("/updatePost/:id", postcontroller.updatePost);// post id

module.exports = router