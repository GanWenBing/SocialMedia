const express = require("express");
const router = express.Router();
const likecontroller = require("../controller/Likecontroller")

router.get("/getLike/:id", likecontroller.getLike)// get own like 

module.exports = router