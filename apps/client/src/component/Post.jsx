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
import Comment from "./Comment";

const Post = (props) => {
  console.log(props)
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)
  const [post, setPost] = useState([]);
  const [like, setLike] = useState([])
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)
  const [likevery, setLikeverify] = useState()
  const [numlike , setNumlike] = useState()
  const [openComment, setOpenComment] = useState(false)
  const [comment, setComment] = useState("")
  const [passid, setPassid] = useState()
  

  const toggleModal = () =>{
    setModal(!modal)
  }


  useEffect(() => {
    if(props.fetch){
    fetch(`api/getAllfollowingPost/${currentUser.user.iduser}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPost(data.reverse());
        props.setFetch(false)
      });
    }
  }, [props.fetch]);

  useEffect(() => { // get all like
  if(props.fetch){
    fetch(`api/getLike`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const counting = [];
        let index1 = 0;
        for(let j = 0; j < data.length; j++){
          counting[index1] = data[j].likepostid
          index1++;
        }
        console.log(counting)
        setNumlike(counting)
        props.setFetch(false)
      });
    }
  }, [props.fetch]);

  useEffect(() => {
    if(props.fetch){
    fetch(`api/getAllpostlike/${currentUser.user.iduser}`) //login user like the post
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const postlike = [];
        let index = 0;
        for (let i = 0; i< data.length; i++){
          postlike[index] = data[i].likepostid;
          //console.log(data[i].likepostid)
          index++
        }
        setLike(postlike)
        props.setFetch(false)
        //console.log(postlike)
      });
    }
  }, [props.fetch]);


  const likePost = (id) => {
    //console.log(id)
    const data = {
      likepostid: id
    }
    fetch(`api/pressLike/${currentUser.user.iduser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
          //window.location.reload("/Homepage");
        } else {
          console.log("Invalid, please try again");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        props.setFetch(true)
      });
    
  };

  const unlikePost = (id) => {
    console.log(id)
    fetch(`api/removeLike/${id}/${currentUser.user.iduser}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      },
    })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        console.log("ok");
        //window.location.reload("/Homepage");
      } else {
        console.log("Invalid, please try again");
      }
      return response.json();
    })
      .then((data) => {
        console.log(data)
        props.setFetch(true)
      });
  }

  const sameElement = ( array, value ) =>{
    return array.filter((v) => (v === value)).length
  }

  const sendComment = async (id) => {
    //event.preventDefault();
    //console.log(id)
    //console.log(comment)
    const data = {
      desc: comment,
      commentuserid: currentUser.user.iduser
    }
    //console.log(data)
    
    fetch(`api/getcomment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
          //window.location.reload("/Homepage");
        } else {
          console.log("Invalid, please try again");
        }
        return response.json();
      })
      .then((data) => {
        props.setFetch(true)
        //console.log(data);
      });
  };

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
                    time {post.created_at}{post.idPosts}
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
             {sameElement(numlike,post.idPosts)} likes
            </p>
          </div>
        </div>
        <div className="border-b my-3"></div>
        <div className="flex justify-between mx-6">
          {(!like.includes(post.idPosts)&&modal == false)? 
          (<div className="flex items-center">
            <AiOutlineLike className="pl-2 w-8 h-8 text-[18px]" onClick={()=>{likePost(post.idPosts)}}/>
            <p className="pl-2 text-[18px]">Like</p>
          </div>): 
          (<div className="flex items-center" onClick={unlikePost}>
            <AiOutlineLike className="pl-2 w-8 h-8 text-[18px] bg-blue-600" onClick={() => {unlikePost(post.idPosts)}}/>
            <p className="pl-2 text-[18px] text-[#4a37f8]">Like</p>
          </div>)
          }
          <div className="flex items-center">
            <FaRegCommentAlt className="w-5 h-5" onClick={()=>setOpenComment(!openComment)} />
            <p className="pl-2 text-[18px]">Comment</p>
          </div>
        </div>
        <div className="border-b my-2">
        <div className="flex items-center mt-3">
          {
              openComment &&  <Comment postId={post.idPosts}/> 
            }
          </div>
         
        </div>
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
        <div className="w-full -ml-8 bg-[#f2f3f7] rounded-full flex items-center relative" >
          <input
            type="desc"
            placeholder="Write a comment "
            className="outline-0  p-4 rounded-full w-full bg-[#f2f3f7]"
            name = "desc"
            value = {comment}
            onChange = {(e) =>setComment(e.target.value)}
          />
          <div className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold  px-6" onClick={()=>sendComment(post.idPosts)} >
              post
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
