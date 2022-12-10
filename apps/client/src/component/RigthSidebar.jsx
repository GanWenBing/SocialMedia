import React from 'react'
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import profile from '../assets/profile.png'

const RigthSidebar = () => {
    const profiles = [
        { name: "Albert E.", photo: profile },
        { name: "Arnold S.", photo: profile },
        { name: "Dr Phill", photo: profile},
        { name: "Elon Musk", photo: profile },
        { name: "Kobe Briant", photo: profile },
        { name: "Mike Tyson", photo: profile },
        { name: "Mr Beast", photo: profile },
        { name: "Rihana", photo: profile},
        { name: "The Rock", photo: profile },
      ];

  return (
    <div>
      <div className="hidden lg:block pt-4 sm:pt-8 pr-7">
        <div className="flex items-center ">
          <p className="pr-4 font-bold">Contacts</p>
          <div className="flex items-center space-x-2">
            <BsFillCameraVideoFill />
            <FiSearch />
            <div className="w-7 h-7">
              <img src={profile} />
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {profiles.map((profile) => (
            <div key={profile.name} className="flex items-center">
              <div className="relative w-12 h-12 flex  ">
                <img
                  src={profile.photo.src}
                  className="object-cover rounded-full"
                />
                <div className="absolute w-3.5 h-3.5 bg-green-500 rounded-full bottom-0 right-0.5 border-2 border-white"></div>
              </div>
              <p className="pl-3 font-semibold">{profile.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RigthSidebar
