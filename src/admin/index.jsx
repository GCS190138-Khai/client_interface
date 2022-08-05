import React, {  } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import InputEvent from '../component/Events/inputEvent'
import { offResgisterMD, onResgisterMD } from '../redux/authSlice'


 function IndexAdmin() {
   const  dispatch = useDispatch()
   const currentUser = useSelector((state)=>state.auth.login.currentUser)
   const isRegister = useSelector((state)=>state.auth.modal.isShowRegisterMD)
   const [isModal, setisModal] = useState(false)
   
const handleAddNew =()=>{
 
    if(isRegister){
      dispatch(offResgisterMD())
    }else{
      dispatch(onResgisterMD())
    }
  
}

if(currentUser.role==="1"||currentUser.role==="admin"){

  return (
    <div className='flex gap-4 items-center justify-center h-screen w-screen pt-8 '>
    <div className='h-[80vh] flex-col flex gap-[2vh] w-[20%] '  >
        <div className=' text-center uppercase text-[1rem] font-semibold'>
            User management
            <div onClick={()=>handleAddNew()} className= ' text-center uppercase text-[0.7rem] font-semibold cursor-pointer'>
            ADD NEW
        </div>
        </div>
        <div className=' text-center uppercase text-[1rem] font-semibold'>
            Event
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink   onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="EventAdmin">View all event</NavLink>
            </div>
        </div>
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>setisModal(!isModal)}>Add new event</button>
        <div className=' text-center uppercase text-[1rem] font-semibold'>
            Contact
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="ContactAdmin">View all contacts</NavLink>
            </div>
        </div>
        <div className=' text-center uppercase text-[1rem] font-semibold'>
            Quản lí phí giao hàng
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="city"> Sửa đổi phí giao hàng </NavLink>
            </div>
        </div>
        <div className=' text-center uppercase text-[1rem] font-semibold'>
            Quản lí sản phẩm
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="newProduct">Thêm sản phẩm mới</NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="new_giftcode">Giftcode </NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="bill">Quản lí bill </NavLink>
            </div>
        </div>
        
    </div>
    <div className='h-[80vh] overflow-auto w-[85%] border-2 border-black-800 p-[0.5rem]'>
    {isModal?<InputEvent></InputEvent>:<Outlet></Outlet> } 
    </div>
    </div>
  )
}else{
  return ( <div className="d"></div> )
}
}
export default IndexAdmin;
