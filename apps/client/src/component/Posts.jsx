import React from 'react'
import Post from './Post'

const Posts = () => {

  return (
    <div>
    <div className="w-screen -ml-20 sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
        <Post/>
        {/* {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
            timestamp={post.data().timestamp}
          />
        ))} */}
      </div>
    </div>
    </div>
  )
}

export default Posts
