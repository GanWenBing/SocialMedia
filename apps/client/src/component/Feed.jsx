import React from "react";
import LeftSidebar from "./LeftSidebar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { useState } from "react";

const Feed = () => {

  return (
    <div className="flex bg-[#f2f3f7] ">
      <LeftSidebar />
      <div className="">
        <CreatePost />
        <Posts/>
      </div>
    </div>
  );
};

export default Feed;
