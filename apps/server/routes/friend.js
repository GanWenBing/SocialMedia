const express = require("express");
const router = express.Router();
const friendcontroller = require("../controller/Friendcontroller")

router.get("/getAllfriend", friendcontroller.getAllfriend);

router.post("/createFriend", friendcontroller.createFriend)


module.exports = router