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



function BillList() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listGiftCode, setlistGiftCode] = useState(false)
 

//  const success = ()=>{
//   setIUpdate(false)
//  }
//   const getOne = async (id)=>{
//     console.log(id)
  
//     const res =  await axios.get('https://phobendoi.art/api/discount/'+id)
//     setIUpdate(res.data)
//     return 
//   }
  const cellStyle ="py-3 px-6 border-r border-black"
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:300,
      className:cellStyle
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      className:cellStyle,
      render:(val,row,i)=>{
        
        let time =   parseISO(val) 
      
        const prse = format(time,"dd-MM-yyy / HH:mm",{locale: vi})
       
          return prse
 
      
      }
    },
    {
      title: 'Tổng',
      dataIndex: 'tolal_cost',
      key: 'tolal_cost',
      width: 120,
      className:cellStyle,
      render:(val,row,i)=>{
        return toVND(val)},
    },
    {
      title: 'Địa chỉ ship đến',
      dataIndex: 'shipmentDetail',
      key: 'shipmentDetail',
      width: 350,
      className:cellStyle,
      render:(val)=>{
        return val.fullAdress
      }
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      className: cellStyle,
      render:(val,row,i)=>{
       
        if(val==='pending'){
            return <span className=' px-6 py-3 text-aButtonVw bg-primaryBlack text-white'>{val}</span>
        }
        if(val==='repare'){
          return <span className=' px-6 py-3 text-aButtonVw text-primaryBlack bg-primaryYellow '>{val}</span>
      }
      
      if(val==='shipping'){
        return <span className=' px-6 py-3 text-aButtonVw text-primary bg-purple-600  '>{val}</span>
    }
    
    if(val==='done'){
      return <span className=' px-6 py-3 text-aButtonVw text-primary bg-green-500'>{val}</span>
  }
  
        
       }
    },
    {
      title: 'xem chi tiết',
  
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
              window.open(`http://phobendoi.art/adminPhobendoi/thisbill/${e._id}`)
            }
            }
        },
    }
  ]
      
  
  useEffect(()=>{
    (async () => {
        
      const res =  await axios.get('https://phobendoi.art/api/bill')
      console.log(res.data)
      return setlistGiftCode(res.data)
    })();

  },[])

  return (  
    <div className="dv flex flex-col gap-36"> 

     <div>
        {!listGiftCode? <div>Loading....</div> :<Table onRow={((e,i)=>{

        })} rowClassName='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400' className='w-full text-sm text-left text-gray-500 dark:text-gray-400' tableLayout="auto" columns={columns} data={listGiftCode} ></Table>}
      </div>
   
        
    </div>
  );
}

export default BillList;