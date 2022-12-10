import React from "react";
import { MdHome, MdGroups } from "react-icons/md";
import { BsCart3, BsPeopleFill, BsCalendar2Fill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineDesktop, AiFillClockCircle } from "react-icons/ai";
import { RiProfileLine } from "react-icons/ri";
import profile from "../assets/profile.png";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const { currentUser } = useContext(AuthContext);

  const [coverpic, setCoverpic] = useState("");
  const [name, setName] = useState("");
  const [friend, setFriend] = useState([]);
  const navigate = useNavigate();

  fetch("api/getallusers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${currentUser.token}`,
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      setCoverpic(data.decoded.user.profilePic);
      setName(data.decoded.user.username);
    });

  useEffect(() => {
    fetch(`api/showFriend/${currentUser.user.iduser}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFriend(data);
      });
  }, []);

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="w-[15rem] hidden sm:block">
      <div className="flex flex-col  pt-4 sm:pt-10 pl-11">
        <div className="flex items-center font-bold">
          <RiProfileLine className="w-9 h-9" onClick={handleClick} />
          <p className="ml-5">Profile</p>
        </div>

        <div className="flex items-center mt-5">
          <div className="w-12 h-12 shrink-0">
            <img
              className="rounded-full h-12 -ml-2"
              src={coverpic == null ? profile : coverpic}
            />
          </div>
          <p className="ml-2 font-bold whitespace-nowrap">
            {name}
          </p>
        </div>

        <div className="border-b my-4"></div>
        <div className="space-y-6">
          <div className="flex items-center">
            <BsPeopleFill className="w-8 h-8" />
            <p className="ml-6 font-bold">Friends</p>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {friend.map((profile) => (
            <div key={profile.iduser} className="flex items-center">
              <div className="relative w-12 h-12 flex  ">
                <img
                  src={profile.coverPic}
                  className="object-cover rounded-full"
                />
                {/* <div className="absolute w-3.5 h-3.5 bg-green-500 rounded-full bottom-0 right-0.5 border-2 border-white"></div> */}
              </div>
              <p className="pl-3 font-semibold">{profile.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
