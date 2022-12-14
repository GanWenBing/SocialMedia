import React from "react";
import profile from "../assets/profile.png";
import { MdHome, MdGroups } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Friendpost from "./Friendpost";
import { useLocation } from "react-router-dom";
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

const FriendProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const { state } = useLocation();
  console.log(state.name.value);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Homepage");
  };

  const [modal, setModal] = useState(false);
  const [friendid, setFriendid] = useState()

  const toggleModal = () => {
    setModal(!modal);
  };
  const [ pic, setPic] = useState([])
  const [ checkid, setCheckid ] = useState()

  //const [ zone, setZone] = useState()
  useEffect(() => {
    fetch(`api/SearchFriendProfile/${state.name.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPic(data[0].coverPic)
        console.log(data[0].iduser)
        fetch(`api/showFriend/${currentUser.user.iduser}`)
        .then((response) => response.json())
        .then((data1) => {
          console.log(data1);
           const friendlist = [];
           let index = 0;
           for(let i = 0; i < data1.length; i++){
             friendlist[index] = data1[i].iduser;
             index++;
           }
           console.log(friendlist)
           setFriendid(data[0].iduser)

           if(!friendlist.includes(data[0].iduser)){
            console.log("value is not inside")
            setModal(false)
            // unFriend(data[0].iduser)
            //addFriend(data[0].iduser)
           }else{
            console.log("value inside")
            setModal(true)
            //unFriend(data[0].iduser)
           }
        });
      });
  }, []);


  const addFriend = (id) => {
    console.log(id)
    const data = {
      followeruserid: currentUser.user.iduser,
      followeduserid: id.friendid
    }
    console.log(data)
    // const person = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(person)

    fetch(`api/addFriend/${currentUser.user.iduser}`, {
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
      });
  };

  // useEffect(() => {
  //   fetch(`api/showFriend/${currentUser.user.iduser}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  const unFriend = (id) =>{
    
    fetch(`api/deleteFriend/${id.friendid}`, {
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
      });
  }

  

  return (
    <div className="w-screen sm:w-full bg-blue-300">
      <MdHome className="w-9 h-9" onClick={handleClick} />
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <div className=" mt-8 flex items-center w-full p-3 pt-4 ">
          <div className="w-48 h-48 shrink-0">
            <img
              src={pic !== null ? pic : profile}
              className="max-w-full h-auto rounded-full ml-32"
            />
          </div>
        </div>
        <div>
         {modal == false ? <AiOutlinePlusCircle className="w-8 h-8" onClick={()=>{toggleModal(); addFriend({friendid})}}/> : <AiOutlineMinusCircle className="w-8 h-8" onClick={()=>{toggleModal(); unFriend({friendid})}}/>}
        </div>
      </div>
      <div>{friendid}</div>

      <div className=""></div>
      <Friendpost user={state} />
    </div>
  );
};

export default FriendProfile;
