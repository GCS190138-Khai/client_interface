import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
 

import { useForm } from "react-hook-form";
import { loginUser } from '../../api';
import './this.css'
function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isShowPass, setisShowPass] = useState(false)
  const dispatch =useDispatch()
  const handleLogin=(data)=>{ 
 
    const newUser ={
        username:data.username,
        password:data.password
    };
   
    loginUser(newUser,dispatch)
    
  }
  return (  
    <div className="dv"> 
      <form onSubmit={handleSubmit((e)=>{

        handleLogin(e)
      })} className=' flex flex-col gap-[15px] h-fit w-[86.5%]  '>
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("username",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên Người Dùng' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.username?.message}</p> 
                </div>
                <div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className=' pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' {...register("password",{required:"*Đây là trường bắt buộc"})} type={isShowPass?"text":"password"} placeholder='   Mật Khẩu' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                  </div>
              
                <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.password?.message}</p> 
                </div>
                <p className='   text-aCaption font-[400]'>*Khi bạn đăng nhập, chúng tôi sẽ tự động lưu lại phiên đăng nhập của bạn cho lần sau.</p>
                <div className=' spacer h-[6vh]'></div>
                <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ require('../../Asset/Image/arrContaCT.svg').default } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">ĐĂNG NHẬP</u> </button>
            </form>
    </div>
  );
}

export default Login;