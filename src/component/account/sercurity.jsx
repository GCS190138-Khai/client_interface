import { useLocation } from "react-router-dom";
import queryString from 'query-string'
import checked from '../../checked.svg'
import axios from "axios";

import { useEffect, useState } from 'react';

 

import { useForm } from "react-hook-form";

import './this.css'

function Repass() {
 
    
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    password:"",
    repassword:""  
  });

  const [isShowPass, setisShowPass] = useState(false)
  const [isCormfim, setisCormfim] = useState(true)
  const [isLoading, setisLoading] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const{search} = useLocation()
  const [isValid, setisValid] = useState(false)
  const {token ,id} = queryString.parse(search)
    useEffect(()=>{
      
    
      (async () => {
        
        
      const result =  await   axios.post(`https://api.phobendoi.art/api/auth/verify-re-pass`,{},{
          params: { token: token,
            id:id
           }
        })
  
            if(result.data._id){

              setisValid(true)
            }else{
              setisValid(false)
            }
       
        return 
      })();
    },[])
    useEffect(()=>{
      const subscription= watch((data)=>{

          if(data.password!==data.repassword){
            setisCormfim(false)
          }
          if(data.password===data.repassword){
            setisCormfim(true)
          }
      })
      return ()=>{
        subscription.unsubscribe()
      }
  },[watch])
    const handleLogin= async (data)=>{ 
      if(!isCormfim){
        return alert("Mật Khẩu Không Khớp")
      }
      try {
        setisLoading(true)
        const res =  await   axios.post(`https://api.phobendoi.art/api/auth/re-pass`,{

        password:data.password
        },{
          params: { token: token,
            id:id
           }
        })
        if(res.data==='success'){ 
          setisSuccess(true)
          setisLoading(false)}
        return 
      } catch (error) {
        if(error.response.data==='Không tìm thấy token !'){
          setisValid(false)

        }else{
          setisLoading(false)
        }
       return alert(error.response.data)
      }
  
    }

if(!isValid){
  return <div className=" w-screen h-screen items-center flex justify-center">
    <div className=" text-[2rem] font-500"> Link này đã hết hạn vui lòng thử lại !</div>
  </div>
}
if(isLoading){
  return(
    <div className=" h-screen w-screen flex justify-center items-center text-[2rem] font-500 ">
      Hệ thống đang sử lý yêu cầu của bạn xin vui lòng chờ trong vài giây !
    </div>
  )
}else{
  if(isSuccess){
    return <div className=" flex flex-col gap-[30px] justify-center items-center w-screen h-screen">
      <div><img src={checked} className=" w-[15.625rem] h-[15.625rem]" alt="" /></div>
      <div className=" capitalize text-[2rem] font-500">Mật khẩu của bạn đã được đổi!</div>
    </div>
  }else{

    return ( 
      <div className=" bg-primary justify-center items-center flex flex-col w-screen h-screen">
        <div className=" flex flex-col gap-[60px] w-[26.25rem]">
        <div className=" text-[2rem] font-500">Tạo Mật Khẩu Mới</div>
  
        <form onSubmit={handleSubmit((e)=>{
         
         handleLogin(e)
       })} className=' flex flex-col gap-[15px] h-fit w-[26.25rem]  '>
            
          
           
           
                 {/* repassword */}
                 <div className='    cont_input '>
                   <div className=' flex flex-col items-end justify-center '>
  
                  <input className=' bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                  {...register("password",{required:"*Đây là trường bắt buộc",
                   pattern: {
                     value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/i,
                     message: "*Mật khẩu phải có độ dài từ 8 đến 16 kí tự, ít nhất một chữ cái viết hoa, một chữ số"
                   }})} type={isShowPass?"text":"password"} placeholder='   Mật Khẩu*' 
                  />
                  <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                   </div>
               
                 <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.password?.message}</p> 
                 </div>
                 {/*  */}
                 <div className='    cont_input '>
                   <div className=' flex flex-col items-end justify-center '>
  
                  <input className=' bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                  {...register("repassword",{required:"*Đây là trường bắt buộc",
                   
                 })} type={isShowPass?"text":"password"} placeholder='   Nhập Lại Mật Khẩu*' 
                  />
                  <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                   </div>
               
                 <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{isCormfim?errors.repassword?.message:"*Mật khẩu không khớp"}</p> 
                 </div>
               
                 <div className=' spacer h-[40px]'></div>
                 <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">XÁC NHẬN</u> </button>
             </form>
        </div>
       
      </div>
    );
  }
}
}

export default Repass;