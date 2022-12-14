import React from 'react'
import Post from './Post'
import { useState } from "react";

const Posts = () => {
  const [befetch, setBeFetch] = useState(true)
  return (
    <div>
    <div className="w-full flex -ml-20 sm:w-full">
      <div className="my-0 max-w-[40rem] sm:max-w-[60rem] mx-auto">
        <Post befetch={befetch} setBeFetch={setBeFetch}/>
      </div>
    </div>
    </div>
  )
}

export default Posts
