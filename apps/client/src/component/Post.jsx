import React from "react";
import profile from "../assets/profile.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiFillDelete, AiOutlineLike, AiFillEdit, AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { useMutation, useQueryClient} from '@tanstack/react-query'

const Post = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)

  const toggleModal = () =>{
    setModal(!modal)
  }

  // const mutation = useMutation((newPost)=>{

  //  }
  //   ,{
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })

  useEffect(() => {
    fetch(`api/getAllfollowingPost/${currentUser.user.iduser}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, []);

  const likePost = () => {};

  const sendComment = () => {};

  // const handleDelete = (id) => () =>{
  //   fetch(`api/deletePosts/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       'Content-Type': "application/json"
  //     },
  //   })
  //     .then((req) => {
  //       if(req.ok){
  //         setPost(post.filter((post) => post.idPosts !== idPosts))
  //         window.location.reload("/Homepage");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data)
  //     });
  // }


  const handleEdit = () =>{

  }
  

  return (
    <div className="bg-white rounded-[1rem] my-6">
      {post.map((post) => (
        <>
        <div className="bg-white rounded-[1rem] px-5 py-4 mt-4"></div>
          <div className="flex items-center justify-between" key={post.idPosts}>
            <div className="flex items-center ">
              <div className="w-12 h-12">
                <img src={post.user.coverPic!= null ? post.user.coverPic : profile} className="rounded-full w-10 h-10 ml-5" />
              </div>
              <div className="ml-8">
                <p className="font-bold ">{post.user.username}</p>
                <div className="flex">
                  <p className="text-xs">
                    time {post.created_at}
                    {/* <Moment fromNow>{timestamp?.toDate()}</Moment> &#8226;{" "} */}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="ml-24">
              <AiFillEdit className="w-5 h-5" onClick={toggleModal} />
            </div>
            <div className="my-3 mr-3">
              <AiFillDelete className="w-5 h-5" onClick={handleDelete(post.idPosts)} />
            </div> */}
          </div>
          <div className="my-4 ml-6">
            <p>{post.desc}</p>
          </div>
          <div className="mx-2 ml-10">
            <img src={post.img == null ? null : '../../public/'+post.img } />
          </div>
          <div className="flex justify-between text-[#8e8d8d] mt-3">
          <div className="flex items-center ">
            <div className=" w-[1.1rem] h-[1.1rem] ml-5">
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
          {/* <div className="flex items-center">
            <div className="w-6 h-6">
              <img src={profile} />
            </div>
            <p className="pl-2 text-[18px] ">Share</p>
          </div> */}
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
  );
};

export default Post;
