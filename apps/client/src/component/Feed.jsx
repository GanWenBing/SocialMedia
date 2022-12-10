import React from 'react'
import LeftSidebar from './LeftSidebar'
import Stories from './Stories'
import CreatePost from './CreatePost'
import Posts from './Posts'
import RightSidebar from './RigthSidebar'

const Feed = () => {
  return (
    <div className="flex  bg-[#f2f3f7] ">
        <LeftSidebar/>

        <div className="mx-auto">
       
        {/* <Stories /> */}
        
        <CreatePost />
     
        <Posts />
      </div>
      {/* <RightSidebar /> */}
      
    </div>
  )
}

export default Feed
