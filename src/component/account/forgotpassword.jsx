import axios from 'axios';
import { useEffect, useState } from 'react';

 

import { useForm } from "react-hook-form";

import './this.css'

function ForgotPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
  
  });
  const [messOfEmail, setmessOfEmail] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const handleRepass = async (data)=>{
    try {
      setisLoading(true)
      const res = await axios.post('https://api.phobendoi.art/api/auth/repassword',data)
      if(res.data==='success'){
        setisSuccess(true)
        setisLoading(false)
      }
    } catch (error) {
      setisLoading(false)
      setmessOfEmail(error.response.data)
      return 
    }
        
    
  }
  const handeReturn =  ()=>{
    setisSuccess(false)
  }
  if(isSuccess){
    return( 
      <div className="justify-center items-center flex w-screen h-screen">
       <div className=" w-[32.5rem] gap-[50px]  flex flex-col">
          <div className=' flex flex-col gap-[20px]'>

          <div className=" text-[2rem] font-500 ">Tạo Mật Khẩu Mới</div>
          <div className=" font-400 text-aCaption">Link tạo lại mật khẩu đã được gửi đến email của bạn. Xin vui lòng kiểm tra mail.</div>
          </div>
          <form onSubmit={handleSubmit((e)=>{
         
         handeReturn(e)
       })}>
          <div className=' cont_input   '>
   
                  <button  type='submit'   className=' gap-[5px] items-center h-[2rem] w-fit flex cursor-pointer'> <img className="  object-fill h-[0.8rem] w-[0.8rem] " src={ require("../Events/ar.png")} alt="" /> <u className=" font-bold text-[0.875rem]">ĐIỀN LẠI MAIL</u> </button>
                  </div>
          </form>
        </div>

      </div>
      )
  }else{

    return ( 
      <div className=" bg-primary justify-center flex items-center w-screen h-screen">
        <div className=" w-[32.5rem] gap-[60px] flex flex-col">
          <div className=' flex flex-col gap-[20px]'>

          <div className=" text-[2rem] font-500 ">Tạo Mật Khẩu Mới</div>
          <div className=" font-400 text-aCaption">Chúng tôi sẽ gửi đường link tạo mật khẩu mới qua email của bạn. Hãy điền email của bạn tại đây.</div>
          </div>
          <form onSubmit={handleSubmit((e)=>{
         
         handleRepass(e)
       })}>
          <div className=' cont_input   '>
                    <input className=' bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("email", {required:"", pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message:"*Email không hợp lệ"
                    }})} type="text" placeholder='   Email*' 
                     />
                        
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{messOfEmail||errors.email?.message}</p> 
                  <div className=' spacer h-[60px]'></div>
                  <button disabled={isLoading} type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">GỬI LINK CHO TÔI</u> </button>
                  </div>
          </form>
          {isLoading?
          <div className="di">
            Hệ thống đang xử lý...
          </div>:""  
        }
        </div>
      </div>
     );
  }
}

export default ForgotPassword;