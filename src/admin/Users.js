import React from 'react'
import EditIcon from '../Asset/Image/edit.svg'
import TrashIcon from '../Asset/Image/trash.svg'
import  { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../api';
import { createAxios } from '../createInstance'
import { loginSuccess } from '../redux/authSlice';

export default function Users() {
 
    const currentUser = useSelector((state)=>state.auth.login.currentUser)
    
    const dispatch = useDispatch()
    const users = useSelector((state)=>state.users.users.allUsers)
   let axiosJWT  = createAxios(currentUser,dispatch,loginSuccess)
    const check = useSelector((state)=>state.users.users.isLoadingFinish)
    
   
  
  
   useEffect(()=>{
       
        getAllUsers(currentUser.accessToken,dispatch,axiosJWT)
       
   },[currentUser,dispatch])
 
   const handleDelete=(id)=>{
    
    if(id===currentUser._id){
        alert('you can`t not delete yoursefle !')
        return
    }
    deleteUser(currentUser?.accessToken,dispatch,id,currentUser.role,axiosJWT)
   
   }
  return (

    <div className=' h-auto flex flex-col gap-2  '>
     
       { check?
           users.map((user)=>{
           var d1= new Date(user.createdAt)
           var d2= new Date(user.updatedAt)
               return(

                <div key={user._id} className=' h-auto flex gap-1 '>
                    <div className='border-2 rounded-md indent-1 whitespace-normal  w-[15%]'> {user.username} </div>
                    <div className='border-2 rounded-md indent-1 whitespace-normal  w-[20%]'> {user.email} </div>
                    <div className='border-2 rounded-md  text-center  w-[10%]'> {user.role[0]==="1"?<div className=' bg-orange-500 text-white rounded-md  '>ADMIN</div>:user.role[0]} </div>
                    <div className='border-2 rounded-md indent-1  w-[18%] whitespace-normal'> {user.address||"none"} </div>
                    <div className='border-2 rounded-md indent-1  w-[15%]'> {user.phone || "none"} </div>
                    <div className='border-2 rounded-md indent-1  w-[8%]'> {d1.toLocaleDateString()} </div>
                    <div className='border-2 rounded-md indent-1  w-[8%]'> {d2.toLocaleDateString()} </div>
                    <div className='border-2 rounded-md indent-1 flex justify-center gap-1  w-[7%]'> <img className='h-[1.5rem] w-[1.5rem] object-fill cursor-pointer'  src={EditIcon} alt=''/> <img className='h-[1.5rem] w-[1.5rem] object-fill cursor-pointer' onClick={()=>{if(window.confirm('Delete the item?'))handleDelete(user._id)}} src={TrashIcon} alt=''/>  </div>
                </div>

               )
           }) 
       :<div> Loading... </div>}
   
           
    </div>
  )
}
