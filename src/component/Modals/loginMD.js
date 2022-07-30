import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../api';

const  LoginMD=()=> {
  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const dispatch = useDispatch();

  console.log("user:",username)
  console.log("user:",password)
  const handleLogin=(e)=>{ 
    e.preventDefault()
    const newUser ={
        username:username,
        password:password
    };
    console.log("newUser: ",newUser)
    loginUser(newUser,dispatch)
    
  }
  
  return (
    


    <div className='flex justify-center items-center h-screen w-screen fixed  z-50'>
        <div className=' h-[100%] w-[100%] bg-black absolute opacity-60 -z-10' >

        </div>
        <div className=' flex flex-col items-center h-[70vh] w-[40vw] bg-white '>
            <div className=''>Log in</div>
            <form onSubmit={handleLogin} className=' flex flex-col items-center '>
              <label>USERNAME</label>
              <input type="text" placeholder='Enter your username' 
              onChange={(e)=>setUsername(e.target.value)}  />
              <label>PASSWORD</label>
              <input type="password" placeholder='Enter your username' 
              onChange={(e)=>setPassword(e.target.value)}/>
              <button type='submit'>Continue</button>
            </form>

        </div>
    </div>
  )
}
export default LoginMD;
