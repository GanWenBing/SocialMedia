import React from "react";
import LeftSidebar from "./LeftSidebar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { useState } from "react";

const Feed = () => {
  const [fetch, setFetch] = useState(true)

  return (
    <div className="flex bg-[#f2f3f7] ">
      <LeftSidebar />
      <div className="mx-auto">
        <CreatePost />
        <Posts fetch={fetch} setFetch={setFetch}/>
      </div>
    </div>
  );
};

export default Feed;
