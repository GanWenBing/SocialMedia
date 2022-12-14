const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getComment = async(req, res) =>{
    const{desc,commentuserid} = req.body;
    console.log(req.params.id)
    try{
    await prisma.comment.create({
        data:{
            desc: desc,
            commentuserid: commentuserid,
            commentpostid: parseInt(req.params.id)
        }
    })
        res.status(200).json("comment is created")
    }catch(error){
        res.status(401).json('error')
    }
}

const showCommentbypostid = async(req, res) =>{
    try{
        const Comment = await prisma.comment.findMany({
            where:{
                commentpostid: parseInt(req.params.id)
            },include:{
                user_comment_commentuseridTouser:true
            }
        })
        res.status(200).json(Comment)
    }catch(err){
        res.status(500).json(err)
    }
    
}


module.exports={
    getComment,
    showCommentbypostid
    
}