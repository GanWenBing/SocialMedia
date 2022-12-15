import React from "react";
import profile from "../assets/profile.png";
import Selfpost from "./Selfpost";
import { useState } from "react";
import { MdHome, MdGroups } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { RiDatabase2Fill } from "react-icons/ri";

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const handleClick = () => {
    navigate("/Homepage");
  };
  const [befetch, setBeFetch] = useState(true)
  
  console.log(fetch)
  //console.log(currentUser);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleProfile = () => {
    console.log("Hi");
  };


  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      fetch("api/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPost = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await uploadFile();
    const data1 = Object.fromEntries(new FormData(event.target));
    const data = {
      desc: data1.desc,
      img: data1.file.name,
    };
    console.log(data);
    const data2 = {}
    if(data.img == ""){
      data2.desc = data1.desc
    }else{
      data2.desc = data1.desc
      data2.img = data1.file.name
    }
    
    fetch(`api/createPosts/${currentUser.user.iduser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
          window.location.reload("/profile");
        } else {
          console.log("Invalid, please try again");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };


  


  return (
    <div className="w-screen sm:w-full bg-blue-300">
      <MdHome className="w-9 h-9" onClick={handleClick} />
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <div className=" mt-8 flex items-center w-full p-3 pt-4 ">
          <div className="ml-32">
            <img
              src={
                currentUser.user.coverPic !== null
                  ? currentUser.user.coverPic
                  : profile
              }
              className="w-48 h-48 rounded-full "
            />
          </div>
        </div>

        <div className="w-17 h-17">
          <FaUserEdit className="w-9 h-9" onClick={toggleModal} />
        </div>
      </div>
      {modal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit Profile</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" post="PUT" onSubmit={handleProfile}>
                    {/* <label className="block text-black text-sm font-bold mb-1">
                      Password
                    </label>
                    <input type='password' className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Comfirm Password
                    </label>
                    <input type='password' className="shadow appearance-none border rounded w-full py-2 px-1 text-black" /> */}
                    <label className="block text-black text-sm font-bold mb-1">
                      Cover Picture
                    </label>
                    <input type='file' className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    {/* <label className="block text-black text-sm font-bold mb-1">
                      City
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" /> */}
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <div className=" mt-8 flex items-center w-full p-3 pt-4 ">
          <div className="w-12 h-12 shrink-0">
            <img
              // src={session ? session?.user?.image : nouser.src}
              src={currentUser.user.coverPic}
              className="rounded-full h-12 ml-1"
            />
          </div>
          <form
            className="flex items-center ml-5 w-full "
            method="post"
            onSubmit={uploadPost}
          >
            <input
              type="desc"
              name="desc"
              placeholder="What's on your mind?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
              // ref={captionRef}
            />
            <label for="firsting">
              <AiOutlineUpload className="w-9 h-9 ml-6 " />
            </label>
            <input
              type="file"
              name="file"
              id="firsting"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="flex items-center bg-blue-500 px-8 rounded-full h-12 ml-6">
              Post
            </button>
          </form>
        </div>
        <button className="font-bold text-white">
          {/* {loading ? "Loading" : "Post"} */}
        </button>
      </div>

      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem]">
      <Selfpost befetch={befetch} setBeFetch={setBeFetch}/>
      </div>

    </div>
  );
};

export default Profile;
