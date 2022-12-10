import React from 'react'
import mikeprofile from '../assets/profile.png'
import mike from '../assets/profile.png'
import mrbeast from '../assets/profile.png'
import mrbeastbackground from '../assets/profile.png'
import kobe from '../assets/profile.png'
import kobebackground from '../assets/profile.png'
import arnold from '../assets/profile.png'
import arnoldbackground from '../assets/profile.png'

const Stories = () => {

    const stories = [
        { profile: mikeprofile, background: mike, uid: "1" },
        { profile: mrbeast, background: mrbeastbackground, uid: "2" },
        { profile: kobe, background: kobebackground, uid: "3" },
        { profile: arnold, background: arnoldbackground, uid: "4" },
      ];

  return (
    <div className="flex items-center w-screen h-36  sm:w-full px-2 mt-4 sm:mt-8">
      <div className="w-full   flex justify-between space-x-1 sm:space-x-4 p-1 mx-auto max-w-[25rem] sm:max-w-[33rem] px-2 bg-white rounded-[1rem] py-3 ">
        {/* My story */}
        <div
          key={"mystory"}
          className="relative flex  w-[4.4rem] h-32  sm:w-24 sm:h-40 rounded-[1rem] "
        >
          <div className="flex">
            <img
            //   src={session ? session?.user?.image : therock20.src}
            src={kobebackground}
              className="flex object-cover rounded-[1rem]"
            />
            <div className="flex absolute top-1 left-1 w-9 h-9 p-1 bg-blue-500 rounded-full">
              <img
                // src={session ? session?.user?.image : therock.src}
                src={kobebackground}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Celeb Stories */}
        {stories.map((story) => (
          <div
            key={story.uid}
            className="relative flex  w-[4.4rem] h-32  sm:w-24 sm:h-40 rounded-[1rem] "
          >
            <div className="flex">
              <img
                src={story.background}
                className="flex object-cover rounded-[1rem]"
              />
              <div className="flex absolute top-1 left-1 w-9 h-9 p-1 bg-blue-500 rounded-full">
                <img
                  src={story.profile}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stories
