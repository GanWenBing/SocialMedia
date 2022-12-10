import React from 'react'
import { useNavigate } from 'react-router-dom'
import page from '../assets/page.png'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth'


const LoginForm = () => {
    
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(inputs);
          navigate("/Homepage");
          //window.location.reload("/Homepage");
        } catch (err) {
          setError('fail')
        }
        // event.target.value
        // event.preventDefault();
        
        // const data = Object.fromEntries(new FormData(event.target));
        // console.log(data);

        // fetch("api/user/login", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => {
        //         console.log(response)
        //         if (response.ok) {
        //            console.log("ok")
        //             navigate("/Homepage");
        //             window.location.reload("/Homepage");
        //         } else {
        //             setError("Invalid, please try again")
        //         }
        //         return response.json()
        //     })
        //     .then((data) => {
        //         localStorage.setItem("userInfo", JSON.stringify(data))
        //     });
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block'>
                    <img className='w-full h-full flex justify-center object-contain' src={page} alt="" />
                </div>
                <div className='bg-gray-100 flex flex-col justify-center'>
                    <div className='max-w-[400px] w-full mx-auto bg-white p-4'>
                        <h2 className='text-3xl font-bold text-center py-6'>Sign in</h2>
                        <div className='flex flex-col py-2'>
                            <label>Email:</label>
                            <input className='border p-2' name="email" type="email" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password:</label>
                            <input className='border p-2' name="password" type="password" onChange={handleChange}/>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label className='text-red-600'>{error}</label>
                        </div>
                        <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' onClick={handleSubmit} >Sign In</button>
                        <div className='flex justify-between'>
                            <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' onClick={()=> navigate("/CreateAccount")}>Create an account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default LoginForm
