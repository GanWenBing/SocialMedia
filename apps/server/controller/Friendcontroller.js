const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllfriend = async (req, res) =>{
    try {
        const Post = await prisma.friend.findMany({
          include:{
            user_friend_friendzoneTouser:true,
            user_friend_grouproomTouser:true
          }
        });
        res.status(200).json(Post);
      } catch (err) {
        console.log(err);
      }
}

const createFriend = async (req, res) =>{
    const{friendzone, grouproom} = req.body;
    const friend = parseInt(friendzone);
    const group = parseInt(grouproom)
    
    try{
    await prisma.friend.create({
        data:{
            friendzone: friend,
            grouproom: group
        }
    })
        res.status(200).json("ok")
    }catch(error){
        res.status(401).json('error')
    }
}

module.exports={
    getAllfriend,
    createFriend
}