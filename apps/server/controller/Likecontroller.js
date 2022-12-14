const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getLike = async(req, res) =>{
    try {
        const Like = await prisma.like.findMany();
        res.status(200).json(Like);
      } catch (err) {
        console.log(err);
      }
}

const pressLike = async(req, res) =>{

    const {likepostid} = req.body;

    try{
        const Like = await prisma.like.create(
            {data:{
                likepostid: likepostid,
                likeuserid: parseInt(req.params.id)
    
            }
        }
        )
    
        res.status(200).json(Like)
    }catch(err){
        res.status(500).json(err)
    }

}

const removeLike = async(req, res) =>{
    const {id, user} = req.params
    console.log(id, user)

    try{
        const Like = await prisma.like.findFirst({
            where:{
                AND:[
                    {likeuserid: parseInt(req.params.user)},
                    {likepostid: parseInt(req.params.id)}
                ]
                // likeuserid: parseInt(req.params.user)
                
            }
        })
        console.log(Like)
        //res.status(200).json(Like)
        await prisma.like.delete({
            where:{
                idlike: Like.idlike
            }
        })
        res.status(200).json("deleted")
    }catch(err){
        res.status(500).json(err)
    }

}


const getAllpostLike = async(req, res) =>{
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
        res.status(500).json(err);
        
      }
}

module.exports={
    getLike,
    pressLike,
    removeLike,
    getAllpostLike
}