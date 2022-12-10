import React from 'react'
import profile from "../assets/profile.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiFillDelete, AiOutlineLike, AiFillEdit, AiFillLike, AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { FcLike } from "react-icons/fc"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { useMutation, useQueryClient} from '@tanstack/react-query'

const Friendpost = (props) => {
    console.log(props.user.name)
    const [post, setPost] = useState([]);
    const [userid, setUserid] = useState()

    useEffect(() => {
        fetch(`api/SearchFriendProfile/${props.user.name.value}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserid(data[0].iduser)
          });
      }, []);

      useEffect(() => {
        fetch(`api/getAllpostsbyName/${props.user.name.value}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setPost(data)
          });
      }, []);

    const toggleModal = () =>{

    }
    
    const handleDelete = () =>{

    }
    
    const likePost = () =>{
        
    }
  return (
    <div>
      <div className="w-screen sm:w-full">
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
      {post.map((post) => (
        <>
        <div className="bg-white rounded-[1rem] px-5 py-4 mt-4"></div>
          <div className="flex items-center justify-between" key={post.idPosts}>
            <div className="flex items-center ">
              <div className="w-12 h-12">
                <img src={post.user.coverPic!= null ? post.user.coverPic : profile} className="rounded-full w-12 h-12" />
              </div>
              <div className="ml-3">
                <p className="font-bold ">{post.user.username}</p>
                <div className="flex">
                  <p className="text-xs">
                    time {post.created_at}
                    {/* <Moment fromNow>{timestamp?.toDate()}</Moment> &#8226;{" "} */}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="ml-[200px] ">
              <AiFillEdit className="w-8 h-8" onClick={toggleModal} />
            </div>
            <div className="my-3  ">
              <AiFillDelete className="w-8 h-8" onClick={handleDelete(post.idPosts)} />
            </div> */}
          </div>
          <div className="my-3 ml-8">
            <p>{post.desc}</p>
          </div>
          <div className="mx-2">
            <img src={post.img !== null ? '../../public/'+post.img : null} />
          </div>
          <div className="flex justify-between text-[#8e8d8d] mt-3">
          <div className="flex items-center ">
            <div className=" w-[1.1rem] h-[1.1rem] ml-6">
              <AiFillLike/>
            </div>
            <p className="pl-2 whitespace-nowrap  text-[15px] sm:text-[16px]">
              {/* {` Emily Doe and another ${likes.length}`} */}how many likes
            </p>
          </div>
        </div>
        <div className="border-b my-3"></div>
        <div className="flex justify-between mx-6">
          <div className="flex items-center" onClick={likePost}>
            <AiOutlineLike className="pl- w-8 h-8 text-[18px]">Like</AiOutlineLike>
          </div>
          <div className="flex items-center">
            <FaRegCommentAlt className="w-5 h-5" />
            <p className="pl-2 text-[18px]">Comment</p>
          </div>
          
        </div>
        <div className="border-b my-2"></div>
        <div className="max-h-60  overflow-y-auto  ">
        </div>
        {/* <div className="max-h-60  overflow-y-auto  ">
        <div className="flex justify-between text-[#8e8d8d]  ">
          <p>{`See ${comments.length} previous comments`}</p>
          <div className="flex items-center">
            <p>Most Relevant</p>
            <RiArrowDownSLine />
          </div>
        </div>
        <div className=" ">
          {comments.map((comment) => (
            <div key={comment.id} className="">
              <div className="flex items-center mt-3">
                <div className="w-10 h-10">
                  <img src={comment.data().image} className="rounded-full" />
                </div>
                <p className="ml-2 font-bold">{comment.data().username}</p>
                <p className="ml-2 ">{comment.data().comment}</p>
              </div>
              <div className="ml-[3rem] flex -mt-1.5">
                <p className="mr-2">Like </p>
                <p>Reply </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
        <div className="flex items-center mt-4">
        <div className=" w-10 h-10 shrink-0">
          <img
            // src={session ? session?.user?.image : nouser.src}
            className="rounded-full "
          />
        </div>
        <div className="w-full -ml-8 bg-[#f2f3f7] rounded-full flex items-center relative">
          <input
            type="text"
            placeholder="Write a comment "
            className="outline-0  p-4 rounded-full w-full bg-[#f2f3f7]"
            // onChange={(e) => setComment(e.target.value)}
          />
          {/* <div className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
            <BiSmile />
            <AiOutlineCamera />
            <AiOutlineGif />
          </div> */}

          <div className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold  px-6 ">
              Post
            </button>
          </div>
        </div>
        </div>
        <div className="border-b my-5"></div> 
        </>
      ))}
    </div>
      </div>
    </div>
  )
}

export default Friendpost
