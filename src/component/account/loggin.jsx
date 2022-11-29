import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 

import { useForm } from "react-hook-form";
import { loginUser } from '../../api';
import './this.css'
import { Link } from 'react-router-dom';
function Login() {

    const [isError, setIsError] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isShowPass, setisShowPass] = useState(false)
  const dispatch =useDispatch()
  const handleLogin= async(data)=>{ 
 
    const newUser ={
        username:data.username,
        password:data.password
    };
   
   const res = await loginUser(newUser,dispatch)
   if(res){
    setIsError(res)
   }else{
   return
   }
   
  }
 
  return (  
    <div className="dv"> 
      <form onSubmit={handleSubmit((e)=>{

        handleLogin(e)
      })} className=' mb:pt-[3.75rem] flex flex-col gap-[15px] mb:gap-[2.5rem] h-fit w-[57.2vw] mb:w-full  '>
                <div className=' cont_input   '>
                  <input className=' bg-primary pb-[0.875vh] focus:border-primaryBlack placeholder:pl-[1rem] mb:placeholder:pl-0 mb:pl-0  focus:ring-0 w-full  inp' {...register("username",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='Tên Người Dùng' 
                   />
                      
                <p className=' text-aCaption mb:text-12px  font-title2-caption text-[#FF0000]'>{errors.username?.message}</p> 
                </div>
                <div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className=' bg-primary pb-[0.875vh] focus:border-primaryBlack placeholder:pl-[1rem] mb:placeholder:pl-0 mb:pl-0 focus:ring-0 w-full inp ' {...register("password",{required:"*Đây là trường bắt buộc"})} type={isShowPass?"text":"password"} placeholder='Mật Khẩu' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit mb:text-12px h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                  </div>
              
                <p className=' self-start text-aCaption mb:text-12px  font-title2-caption text-[#FF0000]'>{errors.password?.message}</p> 
                </div>
                <Link className='pt-[10px] mb:pt-0 ' to={'/forgotpassword'}> <p className=' border-b mb:text-12px  border-primaryBlack w-fit leading-[0.8] text-aCaption font-[400]'>Bạn quên mật khẩu ?</p></Link>
                <div className=' spacer mb:hidden h-[3vh]'></div>
                {!isError?"":<p className='mb:text-12px   text-[#FF0000]  text-aCaption font-[400]'>{isError}</p>}
                <div className=' spacer mb:hidden h-[3vh]'></div>
                <button  type='submit'   className=' w-fit flex mb:gap-1x  cursor-pointer'> <img className="  ml-[-0.5rem] mb:ml-0 mb:object-cover object-contain mb:h-[2rem] mb:w-[1.406rem] h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] mb:text-12px mb:mt-[1rem]  font-bold text-[0.875rem]">ĐĂNG NHẬP</u> </button>
            </form>
    </div>
  );
}

export default Login;