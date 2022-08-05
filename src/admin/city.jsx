import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 

import { useForm } from "react-hook-form";
import axios from 'axios';


function City() {

    const [isError, setIsError] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isShowPass, setisShowPass] = useState(false)
  const dispatch =useDispatch()
  const handleAddCity= async(data)=>{ 
    const URL = 'https://phobendoi.art/api'
  const   newCity ={
      name: data.name,
      cost: data.cost
    }
  
    const res = await axios.post('https://phobendoi.art/api/city/shipment',newCity)
   alert(res.data.name)
   
   
  }
 
  return (  
    <div className="dv"> 
      {/* <form onSubmit={handleSubmit((e)=>{

        handleAddCity(e)
      })} className=' flex flex-col gap-[15px] h-fit w-[57.2vw]  '>
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   tên tỉnh thành ví dụ: TP Hồ Chí Minh' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>
                <div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input defaultValue={30000}  className=' pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' {...register("cost",{required:"*Đây là trường bắt buộc"})} type={"number"} placeholder='   Ví dụ: 30000' 
                 />
                 <span  className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {"VND"}</span>
                  </div>
              
                <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.cost?.message}</p> 
                </div>
              
                <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">ĐĂNG NHẬP</u> </button>
            </form> */}
    </div>
  );
}

export default City;