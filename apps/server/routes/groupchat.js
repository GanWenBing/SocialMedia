const express = require("express");
const router = express.Router();
const groupchatcontroller = require("../controller/Groupchatcontroller")

router.get("/getAllgroupchat", groupchatcontroller.getAllgroupchat);


module.exports = router