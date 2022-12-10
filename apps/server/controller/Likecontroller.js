const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getLike = async(req, res) =>{
    try {
        const Like = await prisma.like.findMany(
            {
                where:{
                    likeuserid: parseInt(req.params.id)
                },include:{
                    user: true,
                    posts:true
                }
              }
        );
        res.status(200).json(Like);
      } catch (err) {
        console.log(err);
      }
}

module.exports={
    getLike    
}