const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createRoom = async(req, res) =>{
    const{RoomName} = req.body;
    console.log(parseInt(req.params.id))
    try{
    await prisma.room.create({
        data:{
            RoomName: RoomName,
            createdby: parseInt(req.params.id)
        }
    })
    console.log(RoomName)
        res.status(200).json(RoomName)
    }catch(error){
        res.status(401).json('error')
    }
}

const getAllroom = async (req, res) => {
    try {
      const Room = await prisma.room.findMany({
        include:{
            user:true
        }
      });
      res.status(200).json(Room);
    } catch (err) {
      console.log(err);
    }
  };

const Deleteroom = async (req,res) =>{
    console.log(req.params.id)
    const Room = await prisma.room.findFirst({
        where: {
            idRoom: parseInt(req.params.id)
        }
    });
    if(!Room) return res.status(404).json({msg: "no this room"});
    try {
        await prisma.room.delete({
            where:{
                idRoom: parseInt(req.params.id)
            }
        });
        res.status(200).json({msg: "Room Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const RoomUpdate = async(req,res) =>{
    const room = await prisma.room.findFirst({
        where: {
            idRoom: parseInt(req.params.id)
        }
    });
    if(!room) return res.status(404).json({msg: "no room"});
    const {RoomName} = req.body;
    try {
        await prisma.room.update(
        {
            where:{
                idRoom: parseInt(req.params.id)
            },
            data:{
            RoomName:RoomName
        }});
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports={
    getAllroom,
    createRoom,
    Deleteroom,
    RoomUpdate
}

