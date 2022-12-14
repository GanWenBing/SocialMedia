import React from 'react'
import { useState, useEffect } from 'react'
import profile from '../assets/profile.png'

const Comment = ({postId}) => {
    console.log(postId)
    const [desc, setDesc] = useState([])

    useEffect(() => {
        fetch(`api/showCommentbyid/${postId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setDesc(data)
          });
      }, []);


  return (
    <div className="w-full ml-2 mr-2 bg-[#f2f3f7] rounded items-center relative">
        {desc.map((result)=>(
            <div className="flex items-center mt-3">
                <img src={result.user_comment_commentuseridTouser.coverPic==null ? profile : result.user_comment_commentuseridTouser.coverPic} className="rounded-full w-6 h-6 ml-5"></img>
                <p className="ml-1 font-bold">{result.user_comment_commentuseridTouser.username}</p>
                <p className="ml-4 " >{result.desc}</p>
            </div>
            
            
        ))}
    </div>
      
  )
}

export default Comment
