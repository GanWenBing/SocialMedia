const express = require("express");
const router = express.Router();
const commentcontroller = require("../controller/Commentcontrolller")

router.post("/getComment/:id", commentcontroller.getComment)

router.get("/showCommentbyid/:id", commentcontroller.showCommentbypostid)
module.exports = router