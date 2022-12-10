const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllpost = async (req, res) =>{
    try {
        const Post = await prisma.post.findMany({
          include:{
             user:true
          }
        });
        res.status(200).json(Post);
      } catch (err) {
        console.log(err);
      }
}

const createPost = async (req, res) =>{
    const{Message} = req.body;
    console.log(req.params.id)
    try{
    await prisma.post.create({
        data:{
            Message: Message,
            sender: parseInt(req.params.id),
            receiver:5 // find the receiver
        }
    })
        res.status(200).json(Message)
    }catch(error){
        res.status(401).json('error')
    }
}

const deletePost = async (req, res) =>{
    console.log(req.params.id)
    const Post = await prisma.post.findFirst({
        where: {
            idPost: parseInt(req.params.id)
        }
    });
    if(!Post) return res.status(404).json({msg: "no this room"});
    try {
        await prisma.post.delete({
            where:{
                idPost: parseInt(req.params.id)
            }
        });
        res.status(200).json({msg: "Post Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}

const updatePost = async (req, res) =>{
    const Post = await prisma.post.findFirst({
        where: {
            idPost: parseInt(req.params.id)
        }
    });
    if(!Post) return res.status(404).json({msg: "no room"});
    const {Message} = req.body;
    try {
        await prisma.post.update(
        {
            where:{
                idPost: parseInt(req.params.id)
            },
            data:{
            Message:Message
        }});
        res.status(200).json({msg: "Post Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}

module.exports={
    getAllpost,
    createPost,
    deletePost,
    updatePost
}