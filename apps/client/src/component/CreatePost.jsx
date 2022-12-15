import React from "react";
import profile from "../assets/profile.png";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { AiOutlineUpload } from "react-icons/ai";

const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const [coverpic, setCoverpic] = useState(currentUser.user.coverPic);
  const [file, setFile] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true)

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      fetch("api/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => 
        res.text())
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
          window.location.reload("/Homepage");
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
    <div className="w-full relative -ml-20 sm:w-full  ">
      <div className="max-w-[100rem] sm:max-w-[60rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <div className=" mt-4 flex items-center w-full p-3 pt-4 ">
          <div className="w-12 h-12 shrink-0">
            <img
              // src={session ? session?.user?.image : nouser.src}
              src={coverpic == null ? profile : coverpic}
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
            <label for='firsting'><AiOutlineUpload className="w-9 h-9 ml-6 "/></label>
            <input
              type="file"
              name="file"
              id="firsting"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="flex items-center bg-blue-500 px-8 rounded-full h-12 text-white ml-6 font-bold">
              Post
            </button>
          </form>
        </div>
        <button className="font-bold text-white">
          {/* {loading ? "Loading" : "Post"} */}
        </button>
      </div>

      <div className="">
        {/* {image ? (
          <div className="" onClick={() => setImage("")}>
            <img src={image} className="p-4" alt="" />
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default CreatePost;
