import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
 

import { useForm } from "react-hook-form";
import {   registerUser } from '../../api';
import './this.css'
import { useNavigate } from 'react-router-dom';

function Register() {
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
    
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    password:"",
    repassword:""  
  });

  const [isShowPass, setisShowPass] = useState(false)
  const [isCormfim, setisCormfim] = useState(true)
  const [messageErrOfUsername, setMessageErrOfUsername] = useState(true)
  const [messOfEmail, setmessOfEmail] = useState(true)
  const dispatch =useDispatch()
  const navigate = useNavigate()
    // if(!currentUser){
  //   navigate('/account')
  // }
  const handleLogin= async (data)=>{ 
    
    console.log({data})
    const newUser ={
        username:data.username.trim(),
        name:data.name,
        email:data.email,
        password:data.password.trim(),
        phone:data.phone.trim()

    };
   
    // loginUser(newUser,dispatch)
   const res = await  registerUser(newUser,dispatch,false,false,navigate)

    if(res==="*Email được sử dụng. Vui lòng chọn một tên người dùng khác."){
      setmessOfEmail(false)
    }else{
      setmessOfEmail(true)
    }
    if(res==="*Tên người dùng đã được sử dụng. Vui lòng chọn một tên người dùng khác."){
      setMessageErrOfUsername(false)
    }else{
      setMessageErrOfUsername(true)
    }
  }

  useEffect(()=>{
      const subscription= watch((data)=>{
        setmessOfEmail(true)
        setMessageErrOfUsername(true)
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
  return (  
    <div className="dv"> 
      <form onSubmit={handleSubmit((e)=>{
       
        handleLogin(e)
      })} className=' flex flex-col gap-[15px] h-fit w-[57.2vw]  '>
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Họ & Tên*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>
                {/**/}
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("email", {required:"", pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:"*Email không hợp lệ"
                  }})} type="text" placeholder='   Email*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{messOfEmail?errors.email?.message:"*Email được sử dụng. Vui lòng chọn một tên người dùng khác."}</p> 
                <p className='text-aCaption font-title2-caption ' >*Mọi tương tác với Phố Bên Đồi đều sẽ được thực hiện thông qua email này. Hãy chắc rằng bạn là chủ sỡ hữu hiện tại của nó.</p>
                </div>
                {/*  */}
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("phone",{required:"*Đây là trường bắt buộc",min:{
                    value:9,
                    message:"*Số điện thoại phải có ít nhất 9 chữ số"
                  }})} type="tel" placeholder='   Số Điện Thoại*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.phone?.message}</p> 
                </div>
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("username",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên Người Dùng*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{messageErrOfUsername?errors.username?.message:"*Tên người dùng đã được sử dụng. Vui lòng chọn một tên người dùng khác."}</p> 
                </div>
                {/* repassword */}
                <div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className=' pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
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

                 <input className=' pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                 {...register("repassword",{required:"*Đây là trường bắt buộc",
                  
                })} type={isShowPass?"text":"password"} placeholder='   Nhập Lại Mật Khẩu*' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                  </div>
              
                <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{isCormfim?errors.repassword?.message:"*Mật khẩu không khớp"}</p> 
                </div>
              
                <div className=' spacer h-[6vh]'></div>
                <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">ĐĂNG KÝ</u> </button>
            </form>
    </div>
  );
}

export default Register;