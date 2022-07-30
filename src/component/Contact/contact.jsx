import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { primaryBG } from '../../redux/navSlice';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

import { createContact } from '../../api';



function Contact() {
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSuccess, setIsSuccess] = useState(false)
  const [info, setinfo] = useState(false)
  const [isVeryfy, setIsVeryfy] = useState(false)
  function onChange(value) {
    console.log("Captcha value:", value);
    if(value){

     return setIsVeryfy(true)
    }
    return setIsVeryfy(false)
  }
 useEffect(()=>{
    dispatch(primaryBG())
    window.scrollTo({  top: 0})
  
 },[])


   const hanleContact = async (data)  =>{
          
      const res = await createContact(data)
       if(res.data.message==="success"){
        setinfo(res.data.contact)
        setIsSuccess(true)
        setTimeout(()=>{
          setinfo(false)
          setIsSuccess(false)
        },30000)
       }
      return     
   }
  return (  
  <div className=" h-screen w-screen flex justify-center font-BVP pt-[14vh] " >
        <div className=" h-[86vh] w-[96vw] justify-between  flex " >
          <div className=" flex flex-col justify-between w-[50%] ">
             <div className=' w-[70%] capitalize text-aTitle1 font-caption-600'>Liên hệ chúng tôi</div>
             <div>
             <div className=" w-[77%] flex pb-[5vh] font-[400] justify-between ">

               {/*  */}
                <div className='flex flex-col gap-[1rem] w-[45%]  '>
                  <div className='text-[0.875rem]   uppercase'>
                  Văn Phòng
                  </div>
                  <div className=' flex flex-col'>
                  <div className='text-[0.875rem] capitalize '>
                  10 Lý tự trọng, phường 2, Đà Lạt, Lâm Đồng
                  </div>
                  <div className='text-[0.875rem]'>
                  +84 93 300 2407
                  </div >
                  </div>
                  <div className='text-[0.875rem] flex gap-[0.2rem]    uppercase'>
                    <u>phobendoi@gmail.com</u> <img className=" mt-[0.2rem] h-[0.875rem] w-[0.875rem] object-contain rounded-none  " src={ require('../../Asset/Image/arrowlink.svg').default } alt="" /> 
                  </div>
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className='flex flex-col gap-[1rem] w-[33%]   '>
                  <div className='text-[0.875rem]   uppercase'>
                  Studio
                  </div>
                  <div className=' flex flex-col'>

                  <div className='text-[0.875rem] capitalize'>
                  232/6 Võ thị sáu, Quận 3, HCM City
                  </div>
                  <div className='text-[0.875rem]'>
                  +84 93 300 2407
                  </div >
                  
                  </div>
                  <div className='text-[0.875rem] flex gap-[0.2rem]  uppercase'>
                    <u>facebook</u> <img className=" mt-[0.2rem] h-[0.875rem] w-[0.875rem] object-contain rounded-none  " src={ require('../../Asset/Image/arrowlink.svg').default } alt="" /> 
                  </div>

                  </div>
                  {/*  */}            
          </div>
             </div>
          </div>

          <div className=" h-full pb-[5vh] w-[50%]">
      
      {!isSuccess?<form className='flex  flex-col justify-between w-full h-full' onSubmit={handleSubmit((data)=>{
        console.log({data})
        hanleContact(data)
      })}>

                <input {...register("name",{required:"*Đây là trường bắt buộc"})} className="w-[83%] text-[1.125rem] outline-none  border-b-2" placeholder="   Họ và Tên*"></input>
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                <input {...register("address",{required:"*Đây là trường bắt buộc"})} className="w-[83%] text-[1.125rem] outline-none  border-b-2" placeholder="   Địa chỉ*"></input>
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.address?.message}</p> 
                <input {...register("position",{required:"*Đây là trường bắt buộc"})} className="w-[83%] text-[1.125rem] outline-none  border-b-2" placeholder="   Chức vụ*"></input>
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.position?.message}</p> 
                <input {...register("company",{required:"*Đây là trường bắt buộc"})} className="w-[83%] text-[1.125rem] outline-none  border-b-2" placeholder="   Công ty*"></input>
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.company?.message}</p> 
                <textarea {...register("message",{required:"*Đây là trường bắt buộc"})} className="w-[83%] rounded-[6px] h-[32.5vh] text-[1.125rem] outline-none resize-none border-b-2"  placeholder="Nội dụng*"></textarea>
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.message?.message}</p> 
                <div className=' relative w-[83%] flex'>

                <div className={isVeryfy?" delay-1000 absolute ml-[20vw] mt-[-5vh] opacity-0":" ml-[20vw]  mt-[-5vh] absolute opacity-100"}>
                        <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                        />
                </div>
                <button  type='submit' disabled={!isVeryfy}  className='flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ require('../../Asset/Image/arrContaCT.svg').default } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">GỬI LỜI NHẮN</u> </button>
                
                </div>
      </form>:
      <div className="di">
          <div className=' text-aSubtitle font-title2-caption'>Cám ơn bạn {info?.name} đã để lại thông tin, chúng tôi sẽ liên lạc với bạn trong thời gian ngắn nhất.</div>
          <div>Lời nhắn đã gửi: {info?.message}</div>

      </div>
      }
          </div>
      
        </div>
  </div>
  );
}

export default Contact;
