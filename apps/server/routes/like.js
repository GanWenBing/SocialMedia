const express = require("express");
const router = express.Router();
const likecontroller = require("../controller/Likecontroller")

router.get("/getLike", likecontroller.getLike)// get own like 

router.post("/pressLike/:id", likecontroller.pressLike)// press like

router.delete("/removeLike/:id/:user", likecontroller.removeLike) // id is post id

router.get('/getAllpostlike/:id', likecontroller.getAllpostLike)

module.exports = router