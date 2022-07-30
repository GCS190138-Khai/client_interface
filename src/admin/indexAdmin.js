import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { offResgisterMD, onModal, onResgisterMD } from '../redux/authSlice'
import Users from './Users'

 function IndexAdmin() {
   const  dispatch = useDispatch()
 
   const isRegister = useSelector((state)=>state.auth.modal.isShowRegisterMD)
const handleAddNew =()=>{
 
    if(isRegister){
      dispatch(offResgisterMD())
    }else{
      dispatch(onResgisterMD())
    }
  
}
  return (
    <div className='flex gap-4 items-center justify-center h-screen w-screen pt-8 pl-[5vw] pr-[5vw]'>
    <div className='h-[80vh] w-[12%] border-2 border-red-600'  >
        <div className=' text-center uppercase text-[1rem] font-semibold'>
            User management
            <div onClick={()=>handleAddNew()} className= ' text-center uppercase text-[0.7rem] font-semibold cursor-pointer'>
            ADD NEW
        </div>
        </div>
        
    </div>
    <div className='h-[80vh] w-[88%] border-2 border-black-800 p-[0.5rem]'>
    <div className='fixed w-[77%] h-[5vh] flex gap-1 items-center text-[0.78rem] font-bold rounded-md p-1 bg-gradient-to-r from-amber-200 to-amber-300'>
                    <div className='w-[15%] '> USERNAME </div>
                    <div className='w-[20%]'> EMAIL </div>
                    <div className='w-[10%]'> ROLE </div>
                    <div className='w- w-[18%] whitespace-normal'> ADRESS </div>
                    <div className='w-[15%]'> PHONE NUMBER  </div>
                    <div className='w-[8%]'> CREATE DATE  </div>
                    <div className='w-[8%]'> UPDATE DATE  </div>
                    <div className='w-[7%] text-center'> ACTIONS </div>
                </div>
         <div className=' mt-10' >
        
        <Users/>
        </div>       
    </div>
    </div>
  )
}
export default IndexAdmin;
