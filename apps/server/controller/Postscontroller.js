const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require("moment")

const getAllposts = async (req, res) =>{
    try {
        const Post = await prisma.posts.findMany(
            {
                where:{
                  userid: parseInt(req.params.id)
                },include:{
                  user: true
                }
              }
        );
        res.status(200).json(Post);
      } catch (err) {
        console.log(err);
      }
}

const getAllpostsbyName = async (req, res) =>{
  console.log(req.params.id)
  try {
      const Post = await prisma.posts.findMany(
          {
            where:{
              user:{
                username: req.params.id
              }
            },include:{
              user:true
            }
              
            }
      );
      res.status(200).json(Post);
    } catch (err) {
      console.log(err);
    }
}

const createPosts = async (req, res) =>{
  const{desc, img} = req.body;
  console.log(req.params.id)
  try{
  await prisma.posts.create({
      data:{
          desc: desc,
          img: img,
        //   created_at: moment(Date.now()).format("YYY-MM-DD HH:mm:ss"),
          userid: parseInt(req.params.id),
      }
  })
      res.status(200).json(desc)
  }catch(error){
      res.status(401).json('error')
  }
}


const deletePosts = async (req, res) =>{
  console.log(req.params.id)
  // const Post = await prisma.posts.findFirst({
  //     where: {
  //         idPosts: parseInt(req.params.id)

  //     }
  // });
  // if(!Post) return res.status(404).json({msg: "not under you"});
  try {
      await prisma.posts.delete({
          where:{
              idPosts: parseInt(req.params.id)
          }
      });
      res.status(200).json({msg: "Post Deleted"});
  } catch (error) {
      res.status(400).json({msg: error.message});
  }

}

module.exports={
    getAllposts,
    createPosts,
    deletePosts,
    getAllpostsbyName
}