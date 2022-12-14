const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllfollowingPost = async(req, res) =>{
    const followerid = [];
    const followedid = [];
    let index = 0;
    console.log('Hi')
    try {
        const Relationship = await prisma.relationship.findMany(
            {
                where:{
                  followeruserid: parseInt(req.params.id)
                }
              }
        );
        
        for(let i=0; i< Relationship.length; i++){
            followerid[index] = Relationship[i].followeduserid
            followedid[index] = Relationship[i].followeruserid
            index++;
        }
        console.log(followedid, followerid)

        const arr = followedid.concat(followerid)

        // var result = [];
        // for (var i = 0; i < arr.length; i++) {
        //     if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
        //     result.push(arr[i]);
        //     }
        // }
        // console.log(result)
        const Post = await prisma.posts.findMany(
            {
                where:{
                  userid: {in: arr}
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

const AddFriend = async(req, res) =>{
 
  const { followeduserid} = req.body;

    const followerid = [];
    const followedid = [];
    let index = 0;
    console.log('Hi')
    try {
        const Relationship = await prisma.relationship.findMany(
            {
                where:{
                  followeruserid: parseInt(req.params.id)
                }
              }
        );
        
        for(let i=0; i< Relationship.length; i++){
            followerid[index] = Relationship[i].followeduserid
            followedid[index] = Relationship[i].followeruserid
            index++;
        }
        console.log(followedid, followerid)

        const arr = followedid.concat(followerid)
        console.log(arr)

        const ArrFriend = [];
        let index1 = 0

        for(let j = 0; j< arr.length; j++){
          if(arr[j] !== parseInt(req.params.id)){
            ArrFriend[index1] = arr[j];
            index1++;
          }
        }
        console.log("Arr",ArrFriend)

        const checkid = parseInt(followeduserid)
        console.log(checkid)

        try{
          if(!arr.includes(checkid)){
            const Relationship = await prisma.relationship.create(
                      {data:{
                        followeduserid: followeduserid,
                        followeruserid: parseInt(req.params.id)
                         }}
                      )
                    res.status(200).json(Relationship)
          }else{
            res.status(200).json("msg: already be friend")
          }  
        }
        catch(err){
          res.status(500).json(err)
        }
      }catch(err){
        res.status(500).json(err)
      }
        

  // try{
  //   const Relationship = await prisma.relationship.create(
  //     {data:{
  //       followeduserid: followeduserid,
  //       followeruserid: parseInt(req.params.id)
  //     }}
  //   )
  //   res.status(200).json(Relationship)

  // }catch(err){
  //   res.status(500).json(err)
  // }
      
}

const showFriend = async(req, res) =>{
    const followerid = [];
    const followedid = [];
    let index = 0;
    console.log('Hi')
    try {
        const Relationship = await prisma.relationship.findMany(
            {
                where:{
                  followeruserid: parseInt(req.params.id)
                }
              }
        );
        
        for(let i=0; i< Relationship.length; i++){
            followerid[index] = Relationship[i].followeduserid
            followedid[index] = Relationship[i].followeruserid
            index++;
        }
        console.log(followedid, followerid)

        const arr = followedid.concat(followerid)
        console.log(arr)
        
        const ArrFriend = [];
        let index1 = 0

        for(let j = 0; j< arr.length; j++){
          if(arr[j] !== parseInt(req.params.id)){
            ArrFriend[index1] = arr[j];
            index1++;
          }
        }

        try {
          const users = await prisma.user.findMany({
            where:{
              iduser:{ in: ArrFriend}
            }
          });
          res.status(200).json(users);
        } catch (err) {
          console.log(err);
        }
        

      }catch(err){
        res.status(500).json(err)
      }

}

const deleteFriend = async(req, res) =>{
    console.log("delete")
  try{
    const Relationship = await prisma.relationship.findFirst({
      where:{
        OR:[
          {followeduserid: parseInt(req.params.id)},
          {followeruserid: parseInt(req.params.id)}

        ]
      }
    })
    console.log(Relationship)
    await prisma.relationship.delete({
      where:{
        idrelationship: Relationship.idrelationship
      }
    })
    res.status(200).json("success");
  }catch(err){
    res.status(500).json(err)
  }
}



module.exports={
    getAllfollowingPost,
    AddFriend,
    showFriend,
    deleteFriend
}