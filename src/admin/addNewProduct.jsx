import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 

import { useForm,useFieldArray } from "react-hook-form";
import axios from 'axios';
import { useLayoutEffect } from 'react';
import { getAllGen } from '../api';
import { getAllCate } from '../selector';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


function NewProduct() {

  const animatedComponents = makeAnimated();
  const { register, handleSubmit, watch,control, formState: { errors } } = useForm({
    defaultValues: {
      pics: ["Hãy dán link vào đây"],
      moreInfo:["Kích thước: 32cmx18cm","Cân nặng: 1.4kg","Chất liệu: giấy mĩ thuật"],
      option:[{
        style:"Phiên bản 1",
        cost:0,
        thumnailPics:"Hãy dán link ảnh vào đây",
        number:0
      }]
    }
  });
  
  const {
    fields:pics,
    append:appendPics,
    remove:removePics,
  } = useFieldArray({
    control,
    name: "pics"
  })
  const {
    fields:moreInfo,
    append:appendMoreInfo,
    remove:removeMoreInfo,
  } = useFieldArray({
    control,
    name: "moreInfo"
  })
  const {
    fields:option,
    append:appendOption,
    remove:removeOption,
  } = useFieldArray({
    control,
    name: "option"
  })


 
  const [isLoading, setLoading] = useState(true);
  
  const listOfCate = useSelector((state)=>getAllCate(state))
  const [listOfGen, setlistOfGen] = useState('')
  const dispatch = useDispatch()

   useLayoutEffect(()=>{
    if(isLoading){
      (async () => {
        
        await getAllGen(dispatch)
        return setLoading(false)
      })();
    
      
    }
   },[isLoading])

  useEffect(()=>{

  },[])
  const handleAddCity= async(data)=>{ 
    const URL = 'https://phobendoi.art/api'
    let listGen=[]
    listOfGen.map((i)=>{
      return listGen.push(i._id)
    })
 
  const   newProduct ={
    name:data.name,

  productCode:data.productCode,
  genres:listGen,

  pics:data.pics,
  discription:data.discription,
  moreInfo:data.moreInfo,
  option:data.option,
  isNewest:data.isNewest,
  isBestSeller:data.isBestSeller,

  isHidden:data.isHidden
    }
    console.log(newProduct)
  
    const res = await axios.post('https://phobendoi.art/api/products/create',newProduct)
    if(!res){
      alert('Tạo thất bại')
    }else{

      alert("Bạn tạo thành công sản phẩm:",res.data.name)
    }
   
   
  }
 
  if(isLoading){
    return(
      <div className="">
        Loading....
      </div>
    )
  }else{

    return (  
      <div className="dv"> 
        <form onSubmit={handleSubmit((e)=>{
  
          handleAddCity(e)
        })} className=' flex flex-col gap-[15px] h-fit w-[57.2vw]  '>
                  <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên sản phẩm' 
                     />
                        
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                  </div>
                  <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("productCode",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Mã sản phẩm' 
                     />
                        
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.productCode?.message}</p> 
                  </div>
                  <div className=' cont_input   '>
                  <Select
                  onChange={(e)=>setlistOfGen(e)}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option._id}
                  isMulti
                  options={listOfCate}/>
                  </div>
                  <div className=' cont_input   '>
                  <ol className='list-decimal list-inside'>
                 {pics.map((item, index) => {
         
                   return (
                      <li className=' h-[10vh] flex flex-col justify-between  ' key={item.id}>
                        <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`pics.[${index}]`)} />
                        {index <1?"": <button className=' rounded-lg h-[4vh] bg-red-500 text-primary ' type="button" onClick={() => removePics(index)}>
                          Delete
                        </button>}
                      </li>
                    );
                  })}
                   </ol>
                   {pics.length<5?<button
                   type="button"
                   className='rounded-lg h-[4vh] bg-green-500 text-primary'
                   onClick={() => {
                    appendPics("Hãy dán link vào đây");}}>
                  add {`(max 5 hình)`} </button>:""}    
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.pics?.message}</p> 
                  </div>
                  <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("discription",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Mô tả' 
                     />
                        
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.discription?.message}</p> 
                  </div>
                  <div className=' cont_input   '>
                  <ol className='list-decimal list-inside'>
                 {moreInfo.map((item, index) => {
         
                   return (
                      <li className=' h-[10vh] flex flex-col justify-between  ' key={item.id}>
                        <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`moreInfo.[${index}]`)} />
                        {index <1?"": <button className=' rounded-lg h-[4vh] bg-red-500 text-primary ' type="button" onClick={() => removeMoreInfo(index)}>
                          Delete
                        </button>}
                      </li>
                    );
                  })}
                   </ol>
                   {moreInfo.length<10?<button
                   type="button"
                   className='rounded-lg h-[4vh] bg-green-500 text-primary'
                   onClick={() => {
                    appendMoreInfo("Tính chất: xyz");}}>
                  add {`(max 10)`} </button>:""}    
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.moreInfo?.message}</p> 
                  </div>
                  {/*  */}
                  <div className=' cont_input   '>
                  <ol className='list-decimal flex flex-col py-[5%] gap-y-[1vh] list-inside'>
                 {option.map((item, index) => {
         
                   return (
                      <li className=' border-2 rounded-sm  h-[60vh] gap-[2vh] flex flex-col justify-between  ' key={item.id}>
                        <label className=' border border-gray-600 rounded-xl' htmlFor="">Tên của phiên bản này:<input className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.style`,{required:"*Đây là trường bắt buộc"})}  /></label>
                       
                       
                       <label className=' border border-gray-600 rounded-xl' htmlFor="">Giá bán của phiên bản này:<input type='number' className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.cost`, {valueAsNumber: true},{required:"*Đây là trường bắt buộc",min:0})} min={0}/></label> 
                        
                       <label className=' border border-gray-600 rounded-xl' htmlFor="">Link ảnh thumbnail của phiên bản này:<input type={"url"} className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.thumnailPics`,{required:"*Đây là trường bắt buộc"})} /></label> 
                      
                      <label className=' border border-gray-600 rounded-xl' htmlFor="">Số lượng của phiên bản này:<input type='number' className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.number`, {valueAsNumber: true},{required:"*Đây là trường bắt buộc",min:0})} min={0} /></label>  
                       
                        {index <1?"": <button className=' rounded-lg h-[4vh] bg-red-500 text-primary ' type="button" onClick={() => removeOption(index)}>
                          Delete
                        </button>}
                      </li>
                    );
                  })}
                   </ol>
                   {option.length<10?<button
                   type="button"
                   className='rounded-lg h-[4vh] bg-green-500 text-primary'
                   onClick={() => {
                    appendOption({
                      style:"Tên phiên bản",
                      cost:0,
                      thumnailPics:"Hãy dán link của phiên bản này ảnh vào đây",
                      number:0
                    });}}>
                  add {`(max 10)`} </button>:""}    
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.moreInfo?.message}</p> 
                  </div>
                  <div className='    cont_input '>
                    <div>Đặt lên tab mới nhất:</div>
                    <div className=' flex gap-[2rem]   justify-center '>
                      <input type="checkbox" placeholder="isNewest" {...register("isNewest", {})} />
                      {/* <div className='items-center  flex gap-[0.3rem]'>
                        <label htmlFor=""> Yes</label>
                    <input {...register("isNewest", { required: true })} type="radio" value={true} />
                      </div>
                      <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isNewest", { required: true })} type="radio" value={false} />
                 
                      </div> */}
                    </div>
                
                 
                  </div>
                  <div className='    cont_input '>
                    <div>Đặt lên tab bán chạy nhất:</div>
                    <div className=' flex gap-[2rem]   justify-center '>
                    <input type="checkbox" placeholder="" {...register("isBestSeller", {})} />
                      {/* <div className='items-center  flex gap-[0.3rem]'>

                        <label htmlFor=""> Yes</label>
                    <input {...register("isBestSeller", { required: true })} type="radio" value={true} />
                      </div> */}
                      {/* <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isBestSeller", { required: true })} type="radio" value={false} />
                 
                      </div> */}
                    </div>
                
                 
                  </div>
                  {/* <div className='    cont_input '>
                    <div>Đặt lên tab preOder:</div>
                    <div className=' flex gap-[2rem]   justify-center '>
                      <div className='items-center  flex gap-[0.3rem]'>

                        <label htmlFor=""> Yes</label>
                    <input {...register("isPreOrder", { required: true })} type="radio" value="Yes" />
                      </div>
                      <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isPreOrder", { required: true })} type="radio" value="No" />
                 
                      </div>
                    </div>
                
                  <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.cost?.message}</p> 
                  </div> */}
                   <div className='    cont_input '>
                    <div>Có ẩn đi không ?</div>
                    <input type="checkbox" placeholder="isNewest" {...register("isHidden", {})} />
                    {/* <div className=' flex gap-[2rem]   justify-center '>
                      <div className='items-center  flex gap-[0.3rem]'>

                        <label htmlFor=""> Yes</label>
                    <input {...register("isHidden", { required: true })} type="radio" value={true} />
                      </div>
                      <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isHidden", { required: true })} type="radio" value={false} />
                 
                      </div>
                    </div> */}
                
                
                  </div>
                
                  <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">Thêm mới sản phẩm</u> </button>
              </form>
      </div>
    );
  }
}

export default NewProduct;