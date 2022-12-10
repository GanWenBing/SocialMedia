import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {

    //const auth = 'happy'
    // const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userInfo"))|| null);
  
    // const login = async (inputs) => {
    //   console.log('Hi')
    //   const res = await axios.post("http://127.0.0.1:3000/api/user/login", inputs,{
    //     withCredentials:true});
    //     console.log(res)
    //   setAuth(res.data)
    // };
  
    // useEffect(() => {
    //   localStorage.setItem("userInfo", JSON.stringify(auth))
    // }, [auth]);
  
    return (
      <UserContext.Provider value={{ auth}}>
        {children}
      </UserContext.Provider>
    );
  }