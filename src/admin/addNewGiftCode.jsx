import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'rc-table';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { parseISO } from 'date-fns/esm';
import { toVND } from '../createInstance';
import UpdateGiftcode from './updateGiftCode';



function AddNewGiftCode() {

    const [isPercent, setIsPercent] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listGiftCode, setlistGiftCode] = useState(false)
    const [isAdd, setisAdd] = useState(false)
    const [isUpdate, setIUpdate] = useState(false)
  const handleLogin= async(data)=>{ 
 
try {
  const res = await axios.post('https://phobendoi.art/api/discount/create',data)
  alert("Đã tạo thành công vé",res.data.name)
} catch (error) {
  alert(error.response.data)
}
    

   
   
  }
 const success = ()=>{
  setIUpdate(false)
 }
  const getOne = async (id)=>{
    console.log(id)
  
    const res =  await axios.get('https://phobendoi.art/api/discount/'+id)
    setIUpdate(res.data)
    return 
  }
  const cellStyle ="py-3 px-6 border-r border-black"
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:200,
      className:cellStyle
    },
    {
      title: 'Số lượng',
      dataIndex: 'number',
      key: 'number',
      width: 100,
      className:cellStyle
    },
    {
      title: 'Trị giá %',
      dataIndex: 'percent',
      key: 'percent',
      width: 120,
      className:cellStyle,
      render:(val,row,i)=>{
            return val? `${val}%`:"////"}
    },
    {
      title: 'Trị giá VND',
      dataIndex: 'value',
      key: 'value',
      width: 150,
     
        render:(val,row,i)=>{
          return val? toVND(val):"////" },
      className:cellStyle,
      
    },
    {
      title: 'Ngày có hiệu lực',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 200,
      className:cellStyle,
      render:(val,row,i)=>{
        
        let time =   parseISO(val) 
      
        const prse = format(time,"dd-MM-yyy / HH:mm",{locale: vi})
       
          return prse
 
      
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 200,
      className:cellStyle,
      render:(val,row,i)=>{
        
        let time =   parseISO(val) 
     
        const prse = format(time,"dd-MM-yyy / HH:mm",{locale: vi})
   
          return prse
  
      
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      className: cellStyle,
      render:(val,row,i)=>{
        if(val){
            return <span className=' text-green-500'>{"Active"}</span>
        }else{
          return <span className=' text-red-500'>{"Unactive"}</span>
        }
       }
    },
    {
      title: 'Sửa đổi',
  
      key: 'edit',
      width: 50,
      className: cellStyle,
      render:(val,row,i)=>{
      
            return <span className=' cursor-pointer '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg></span>
      
       },
       onCell:(e,i)=>{ 
        return{
            onClick:  async()=>{
             await getOne(e._id)
            }
            }
        },
    }
  ]
      
  
  useEffect(()=>{
    (async () => {
        
      const res =  await axios.get('https://phobendoi.art/api/discount')
      return setlistGiftCode(res.data)
    })();

  },[])

  return (  
    <div className="dv flex flex-col gap-36"> 
      <form onSubmit={handleSubmit((e)=>{

        handleLogin(e)
      })} className=' flex flex-col gap-[15px] h-fit w-[60%]  '>
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên gifcode, lưu ý: Không đc trùng tên với giftcode đã có' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>
                
                <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'><label htmlFor="">Giftcode trừ theo số tiền:</label><input onChange={()=>setIsPercent(false)} name={'123'}  defaultChecked={!isPercent}  type="radio" value="Value" /></div>
                <div className='flex gap-2 items-center'><label htmlFor="">Giftcode trừ phần trăm số tiền:</label> <input onChange={()=>setIsPercent(true)} name={'123'}  type="radio" value="Percentage" /></div>
                </div>

                {isPercent?<div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("percent",{valueAsNumber: true},{required:"*Đây là trường bắt buộc"})} type="number" min={0} max={100} placeholder='   Điền số phần trăm muốn giảm, ví dụ: 10 = -10% tổng bill' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.percent?.message}</p> 
                </div>:
                <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("value",{valueAsNumber: true},{required:"*Đây là trường bắt buộc"})} type="number" min={0}  placeholder='   Điền số tiền muốn giảm, ví dụ 100.000 = -100k tổng bill ' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.value?.message}</p> 
                </div>
                }
                   <div className=' cont_input   '>
                  <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp'  {...register("number", {valueAsNumber: true},{required:"*Đây là trường bắt buộc"})} type="number" min={0} placeholder='   Điền số lượng giftcode' 
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.number?.message}</p> 
                </div>
                {/*  */}
                <div className=' cont_input   '>
                  start date time
                  <input min={new Date().toISOString().slice(0, -8)} className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp'  {...register("startDate", {valueAsDate: true},{required:"*Đây là trường bắt buộc"})} type="datetime-local"  
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.startDate?.message}</p> 
                </div>
                {/*  */}
                <div className=' cont_input   '>
                  end date time
                  <input min={new Date().toISOString().slice(0, -8)} className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp'  {...register("endDate", {valueAsDate: true},{required:"*Đây là trường bắt buộc"})} type="datetime-local"  
                   />
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.endDate?.message}</p> 
                </div>
                {/*  */}
                <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'><label htmlFor="">For product:</label><input {...register("forWhat")} checked     type="radio" value="product" /></div>
                {/* <div className='flex gap-2 items-center'><label htmlFor="">For event:</label> <input  {...register("forWhat")}   type="radio" value="event" /></div> */}
                </div>
              
                <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">Tạo mới giftcode</u> </button>
      </form>
      {!isUpdate?<div>
        {!listGiftCode? <div>Loading....</div> :<Table onRow={((e,i)=>{

        })} rowClassName='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400' className='w-full text-sm text-left text-gray-500 dark:text-gray-400' tableLayout="auto" columns={columns} data={listGiftCode} ></Table>}
      </div>:""}
      {isUpdate? <UpdateGiftcode success={success} data ={isUpdate} ></UpdateGiftcode>:""}
        
    </div>
  );
}

export default AddNewGiftCode;