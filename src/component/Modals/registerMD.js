import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, registerUser } from '../../api';
import close from '../../Asset/Image/close.svg'
import { offResgisterMD } from '../../redux/authSlice';

const  RegisterMD=()=> {
  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const [passwordRe,setPasswordRe]= useState("");
  const [address,setAddress]= useState("");
  const [phone,setPhone]= useState("");
  const [email,setEmail]= useState("");
  const [roleInput,setRoleInput]= useState("");
  const dispatch = useDispatch();

  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  
  const role =useSelector((state)=>state.auth.role.isAdmin)
  const handleLogin=(e)=>{  
    
    e.preventDefault()
    if(password!==passwordRe){
      
        return alert('Retype password must be the same')
    }
    
    const newUser ={
        username:username,
        email:email,
        password:password,
        address:address,
        phone:phone,
        role:roleInput

    };
   
    registerUser(newUser,dispatch,role,currentUser)
 
  }
  
  
  
  const handleClickOut=()=>{
    dispatch(offResgisterMD())
  }
  return (
    


    <div className='flex justify-center items-center h-screen w-screen fixed  z-50'>
        <div onClick={handleClickOut} className=' h-[100%] w-[100%] bg-black absolute opacity-60 -z-10' >

        </div>
        <div className=' flex flex-col items-center h-[70vh] w-[40vw] bg-white '>
            <div className='flex'>Log in <div className=' translate-x-[17rem]'> <img onClick={handleClickOut} className='h-[1.5rem] w-[1.5rem] object-fill cursor-pointer'  src={close} alt=''/> </div></div>
            <form onSubmit={handleLogin} className=' flex flex-col items-center '>
              <label>USERNAME</label>
              <input type="text" placeholder='Enter your username' 
              onChange={(e)=>setUsername(e.target.value)}  />
              <label>PASSWORD</label>
              <input type="password" placeholder='Enter your password' 
              onChange={(e)=>setPassword(e.target.value)}/>
              <label>PASSWORD</label>
              <input type="password" placeholder='Enter your password' 
              onChange={(e)=>setPasswordRe(e.target.value)}/>
              <label>EMAIL</label>
              <input type="text" placeholder='Enter your email' 
              onChange={(e)=>setEmail(e.target.value)}/>
              <label>ADDRESS</label>
              <input type="text" placeholder='Enter your address' 
              onChange={(e)=>setAddress(e.target.value)}/>
              <label>PHONE</label>
              <input type="text" placeholder='Enter your phone number' 
              onChange={(e)=>setPhone(e.target.value)}/>
              {role?<>
              <label>ROLE</label> 
              <input type="text" 
              onChange={(e)=>setRoleInput(e.target.value)}/>
              <select >
               {/* { roles.map((role)=><option value={setRoleInput(role.name)}>{role.name}</option>)} */}
              </select>
              <button type='submit'>Continue</button>
              
              </>
              :""}
              
            </form>

        </div>
    </div>
  )
}
export default RegisterMD;
