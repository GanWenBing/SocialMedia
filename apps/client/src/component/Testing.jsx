import React from 'react'
import { useLocation } from 'react-router-dom'

const testing = () => {
  const {state} = useLocation()
  console.log(state)
  return (
    <div>
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
                  <div div className="relative w-12 h-12 flex  ">
                    <div
                      className="pl-3 font-semibold"
                      key={item.iduser}
                      onClick={() => handleClick(item.username)}
                    >
                      {item.username}
                    </div>
                  </div>
                ))}
    </div>
  )
}

export default testing
