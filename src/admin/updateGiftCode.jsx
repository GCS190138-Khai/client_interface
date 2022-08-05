import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'rc-table';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { parseISO } from 'date-fns/esm';
import { toVND } from '../createInstance';



function UpdateGiftcode({data,success}) {

    const [isPercent, setIsPercent] = useState(!data.percent?false:true)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
   
    });
   
   
  const handleLogin= async(dataNew)=>{ 
    let newData = {
      ...dataNew,
      _id:data._id
    }
   
try {
  const res = await axios.post('https://phobendoi.art/api/discount/update',newData)
  alert("Đã cập nhật thành công vé",res.data.name)
  success()
} catch (error) {
  alert(error.response.data)
}
    

   
   
  }
  const cellStyle ="py-3 px-6 border-r border-black"
 
      
  
  useEffect(()=>{
    (async () => {
        
     
    })();

  },[])

  return (  
    <div className="dv flex "> 
      <form onSubmit={handleSubmit((e)=>{

        handleLogin(e)
      })} className=' flex flex-col gap-[15px] h-fit w-[100%]  '>
                <div className=' cont_input   '>
                  <input defaultValue={data.name} className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên gifcode, lưu ý: Không đc trùng tên với giftcode đã có' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>
                
                <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'><label htmlFor="">Giftcode trừ theo số tiền:</label><input onChange={()=>setIsPercent(false)} name={'123'}  defaultChecked={data.value?true:false}  type="radio" value="Value" /></div>
                <div className='flex gap-2 items-center'><label htmlFor="">Giftcode trừ phần trăm số tiền:</label> <input onChange={()=>setIsPercent(true)} name={'123'} defaultChecked={!data.percent?false:true}  type="radio" value="Percentage" /></div>
                </div>

                {isPercent?<div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' defaultValue={data.percent} {...register("percent",{valueAsNumber: true},{required:"*Đây là trường bắt buộc"})} type="number" min={0} max={100} placeholder='   Điền số phần trăm muốn giảm, ví dụ: 10 = -10% tổng bill' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.percent?.message}</p> 
                </div>:
                <div className=' cont_input   '>
                  <input defaultValue={data.value}  className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("value",{valueAsNumber: true},{required:"*Đây là trường bắt buộc"})} type="number" min={0}  placeholder='   Điền số tiền muốn giảm, ví dụ 100.000 = -100k tổng bill ' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.value?.message}</p> 
                </div>
                }
                   <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' defaultValue={data.number}  {...register("number", {valueAsNumber: true},{required:"*Đây là trường bắt buộc"})} type="number" min={0} placeholder='   Điền số lượng giftcode' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.number?.message}</p> 
                </div>
                {/*  */}
                <div className=' cont_input   '>
                  start date time
                  <input defaultValue={new Date(data.startDate ).toISOString().slice(0, -8)} min={new Date().toISOString().slice(0, -8)} className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp'  {...register("startDate", {valueAsDate: true},{required:"*Đây là trường bắt buộc"})} type="datetime-local"  
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.startDate?.message}</p> 
                </div>
                {/*  */}
                <div className=' cont_input   '>
                  end date time
                  <input defaultValue={new Date(data.endDate).toISOString().slice(0, -8)} min={new Date().toISOString().slice(0, -8)} className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp'  {...register("endDate", {valueAsDate: true},{required:"*Đây là trường bắt buộc"})} type="datetime-local"  
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.endDate?.message}</p> 
                </div>
                {/*  */}
                <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'><label htmlFor="">For product:</label><input {...register("forWhat")} checked     type="radio" value="product" /></div>
                {/* <div className='flex gap-2 items-center'><label htmlFor="">For event:</label> <input  {...register("forWhat")}   type="radio" value="event" /></div> */}
                </div>
              
                <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">Cập nhật giftcode</u> </button>
      </form>
    </div>
  );
}

export default UpdateGiftcode;