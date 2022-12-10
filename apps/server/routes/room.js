const express = require("express");
const router = express.Router();
const roomcontroller = require("../controller/Roomcontroller")

router.get("/getAllroom", roomcontroller.getAllroom );

router.post("/createroom/:id", roomcontroller.createRoom)// user id

router.delete("/deleteroom/:id", roomcontroller.Deleteroom)// room id

router.put("/updateroom/:id", roomcontroller.RoomUpdate)// room id

module.exports = router
