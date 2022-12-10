const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getComment = async(req, res) =>{
    const{desc,commentpostid} = req.body;
    console.log(req.params.id)
    try{
    await prisma.comment.create({
        data:{
            desc: desc,
          //   created_at: moment(Date.now()).format("YYY-MM-DD HH:mm:ss"),
            commentuserid: parseInt(req.params.id),
            commentpostid: commentpostid
        }
    })
        res.status(200).json("comment is created")
    }catch(error){
        res.status(401).json('error')
    }
}


module.exports={
    getComment
    
}