import React from "react";
import { useState } from "react";
//import CreatePost from './CreatePost'
import profile from "../assets/profile.png";
import page from "../assets/page.png";
import { MdHome } from "react-icons/md";
import { FiPlayCircle, FiFlag, FiMessageCircle } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { GrGroup, GrAppsRounded } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/router";

const Header = () => {
  // const { data: session } = useSession();
  // const router = useRouter();
  // console.log(session);
  const { currentUser } = useContext(AuthContext);
  //console.log(currentUser);

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    fetch("api/Logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentUser.token}`,
      },
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          window.localStorage.clear();
          navigate("/");
        } else {
          setError("Invalid, please try again");
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
      });
    // window.localStorage.clear();
    // navigate('/')
  };

  useEffect(() => {
    const loaddata = async () => {
      await fetch("/api/SearchAllUsers")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setData(data);
        });
    };
    loaddata();
  }, []);

  const handleClick = (searchTerm) => {
    setValue(searchTerm);
    //console.log({ value });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    navigate("/friend", { state: { name: { value } } });
  };

  return (
    <>
      <div className="p-4 flex items-center justify-between border-b lg:px-10">
        {/* LeftSide */}
        <div className="flex items-center mr-2">
          <div>
            <div className="ml-2 flex">
              <div className="w-12 h-12">
                <img src={page} className="rounded-full w-12 h-12" />
              </div>
              <div className="w-2" />
              <input
                type="text"
                placeholder="Search Friend"
                className="outline-0 bg-[#f2f3f7] p-2 rounded-lg pl-4 hidden sm:block"
                value={value}
                onChange={handleChange}
              />
              <div className="w-2" />
              <button
                className="bg-[#2563eb] p-2 rounded-lg text-neutral-50 "
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="absolute pl-16">
              {data
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const name = item.username.toLowerCase();

                  return (
                    searchTerm &&
                    name.startsWith(searchTerm) &&
                    name !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <div div className="bg-[#e3e4e9] pr-28">
                    <div
                      className="pr-3 mr-10 font-semibold p-2"
                      key={item.iduser}
                      onClick={() => handleClick(item.username)}
                    >
                      {item.username}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="flex items-center space-x-6 -ml-80 ">
          <p className="text-blue-600 text-2xl"></p>
        </div>
        {/* RightSide */}
        <div className="flex space-x-6 items-center ml-0">
          <div className="w-12 h-12 text-xl mr-4 pt-2 text-blue-600">{currentUser.user.username}</div>
          <div className="md:flex space-x-6 hidden ">
            <CiLogout className="w-7 h-7" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
