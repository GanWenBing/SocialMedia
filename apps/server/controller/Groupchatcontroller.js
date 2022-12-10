const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllgroupchat = async(req, res) =>{
    try {
        const GroupChat = await prisma.groupchat.findMany({
            include:{
                post:{
                    include:{
                        user:true
                    }
                }
            }
        });
        res.status(200).json(GroupChat);
      } catch (err) {
        console.log(err);
      }
}



module.exports={
    getAllgroupchat
}