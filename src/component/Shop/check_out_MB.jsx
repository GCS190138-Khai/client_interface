import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { offStatic, primaryBG, successBuy, updateNumber } from "../../redux/navSlice";
import { useForm } from "react-hook-form";
import Select, { components } from "react-select";
import axios from "axios";

import arrowDown from './arrowDonw.svg'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './arrowMobile.scss'
import { toVND } from "../../createInstance";
import { useRef } from "react";
import gsap from "gsap";
function CheckOutMB() {
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  const [citySelected, setcitySelected] = useState()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(true)
  const [cityList, setCityList] = useState([])
  const [isDoneSecond, setisDoneSecond] = useState(false)
  const [isOnlinePayment, setisOnlinePayment] = useState(true)
  const [isCod, setisCod] = useState(true) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(primaryBG())
    dispatch(offStatic())
    window.scrollTo(0,0)
  },[])
  useEffect(()=>{
    const handleAddCity= async()=>{ 
      const URL = 'https://phobendoi.art/api'

    
      const res = await axios.get('https://api.phobendoi.art/api/city/getShipments')
      
      setCityList(res.data)
      setcitySelected(res.data[29])
      setIsLoading(false)
    }
    if(isLoading){

      handleAddCity()
    
    }
  },[isLoading])

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img className=" w-[18px] h-[9px] " src={"https://live.staticflickr.com/65535/52258056629_db753da3c5_t.jpg"}alt="123" />
      </components.DropdownIndicator>
    );
  };

  // --------------cart logic
  const cart = useSelector((state)=>state.nav.cart)
  const [sum, setSum] = useState()
  const [checkCode, setCheckCode] = useState()
  const [message, setmessage] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [disCount, setdisCount] = useState(0)

const [data, setData] = useState()
  const orders = useRef()
  const arrow = useRef()
useEffect(()=>{
 if(isLoading){

 }else{

   handleSum()
 }
},[cart,isLoading])
const handleSum = ()=>{
  let initialValue = 0
 const res  = cart.reduce((total,currentvalue)=>{
  return total + currentvalue.cost*currentvalue.quantity
 },initialValue)
 return setSum(res + citySelected.cost)
}

const handleCheckCode = async ()=>{
  if(cart.length ===0){
    return alert('Gi??? h??ng c???a b???n ??ang tr???ng, vui l??ng th??m h??ng v??o gi??? r???i th??? l???i sau !')
   }
   if(!currentUser){

    let text = "B???n kh??ng th??? ??p d???ng giftcode n???u ch??a ????ng nh???p! Nh???p Ok ????? m??? trang ????ng nh???p v??o tab m???i ";
    if ( window.confirm(text) === true) {
     return window.open('https://phobendoi.art/account',"_blank")
    } else {
      
    }

   }else{

     let code ={
        name:checkCode
      }
      try {
        const res = await axios.post('https://api.phobendoi.art/api/discount/check',code)
    
    
      if(res.data[0].forWhat==="event"){
        alert('Giftcode n??y ch??? d??ng ???????c cho evet')
        handleSum()
        setIsCheck(false)
      }else{
        let check =  res.data[0].userUsed.find((i)=>i===currentUser._id)
        if(!check){
          alert("M?? code n??y c?? th??? s??? d???ng")
          if(res.data[0].percent===null){
            let newSum = sum - res.data[0].value
            newSum <0 ? setSum(0): setSum(newSum)
            setdisCount(res.data[0].value)
          }else{
            let newSum = sum - sum*(res.data[0].percent/100)
            setdisCount(sum*(res.data[0].percent/100))
            setSum(newSum)
          }
         
          return setIsCheck(true)
        }else{
          setIsCheck(false)
          handleSum()
          return  alert("B???n ???? s??? d???ng m?? code n??y, xin vui l??ng th??? l???i sau !")
        }
      }
        
      } catch (error) {
        handleSum()
        setIsCheck(false)
        return  alert(error.response.data)
      }
   }
  
}

const handleSubmitForm =(e)=>{
 
  if(!isDoneSecond){
    
    setData(e)

    setisDoneSecond(true)

   return 
  }
}
const hanldeBill = async ()=>{

  
   if(cart.length ===0){
    
    alert('Gi??? h??ng c???a b???n ??ang tr???ng, h??? th???ng kh??ng th??? t???o bill cho b???n !')
    return 
   }else{
   
    if(!checkCode){
      console.log("vao")
      setIsCheck(false)
      let newBill ={
      
        name: `????n h??ng c???a ${data.name} - ${data.phone}`,
        buyer:currentUser._id,
        shipmentDetail:{
          fullAdress:`${data.address},ph?????ng/x?? ${data.wards},qu???n/huy???n ${data.district}, ${citySelected.name}`,
          city:citySelected.name,
          district:data.district,
          wards:data.wards
        },
        products:cart,
        tolal_cost:sum,
        isOnlinePayment:isOnlinePayment,
        isUseShipmentService:isCod,
        isCOD:!isOnlinePayment,
        status:'pending',
        discount:isCheck? checkCode :null,
        message:message
  
        
      }
      try {
        const res = await axios.post('https://api.phobendoi.art/api/products/bill',newBill)
      
        dispatch(updateNumber([]))
        navigate('/shop')
        dispatch(successBuy())
      } catch (error) {
        console.log(error)
      }

    }else{
      let newBill ={
      
        name: `????n h??ng c???a ${data.name} - ${data.phone}`,
        buyer:currentUser._id,
        shipmentDetail:{
          fullAdress:`${data.address},ph?????ng/x?? ${data.wards},qu???n/huy???n ${data.district}, ${citySelected.name}`,
          city:citySelected.name,
          district:data.district,
          wards:data.wards
        },
        products:cart,
        tolal_cost:sum,
        isOnlinePayment:isOnlinePayment,
        isUseShipmentService:isCod,
        isCOD:!isOnlinePayment,
        status:'pending',
        discount:isCheck? checkCode :null,
        message:message
  
        
      }
      let code ={
        name:checkCode
      }
      try {
        const res = await axios.post('https://api.phobendoi.art/api/discount/check',code)
    
    
      if(res.data[0].forWhat==="event"){
        alert('Giftcode n??y ch??? d??ng ???????c cho evet')
        handleSum()
        setIsCheck(false)
      }else{
        let check =  res.data[0].userUsed.find((i)=>i===currentUser._id)
        if(!check){
      
          if(res.data[0].percent===null){
            let newSum = sum - res.data[0].value
            newSum <0 ? setSum(0): setSum(newSum)
            setdisCount(res.data[0].value)
          }else{
            let newSum =sum -  sum*(res.data[0].percent/100)
            setSum(newSum)
            setdisCount(sum*(res.data[0].percent/100))
          }
          setIsCheck(true)
          try {
            const res = await axios.post('https://api.phobendoi.art/api/products/bill',newBill)
          
            dispatch(updateNumber([]))
            navigate('/shop')
            dispatch(successBuy())
          } catch (error) {
            console.log(error)
          }
        
          return 
        }else{
          setIsCheck(false)
          handleSum()
          return  alert("B???n ???? s??? d???ng m?? code n??y, xin vui l??ng th??? l???i sau !")
        }
      }
        
      } catch (error) {
        handleSum()
        setIsCheck(false)
        return  alert(error.response.data)
      }
    }

 
   

   }


}
const chitietdonhang ={
  vn:"XEM CHI TI???T ????N H??NG",
  eng:" view order details "
}

const [isOpen, setIsOpen] = useState(false)
  const toggleOder = ()=>{
    if(!isOpen){
      gsap.to(arrow.current,{ rotateZ:"180",duration:0.5})
      gsap.to(orders.current,{ height:"auto",duration:0.3})
      gsap.to(orders.current,{display:"flex",opacity:"100",duration:0.3, delay:0.3})
      setIsOpen(true)
      console.log("open")
    }else{
      gsap.to(arrow.current,{ rotateZ:"0",duration:0.5})
      gsap.to(orders.current,{display:"hidden",opacity:"0",duration:0.3})
      gsap.to(orders.current,{ height:"0",duration:0.3, delay:0.3})
      setIsOpen(false)
      console.log("close")
    }
  }
  if(isLoading){
    return (
      <div className="">
        Loading...
      </div>
    )
  }else{

    return (
      <>
        <div onClick={()=>{
          toggleOder()
        }} className=" w-screen px-[20px] bg-[#E6DFD7] flex  justify-between items-center h-[4.375rem]" >
          <div className=" text-12px gap-[0.313rem] flex font-600 ">
            <span className="border-b border-black leading-[1]">{chitietdonhang.vn}</span> 
            <img ref={arrow} className=" h-[0.75rem] w-[0.75rem] object-fill" src={arrowDown} alt="" />
            </div>
            <div className=" text-16px font-[400]"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(sum)} </div>
        </div>
    <div className="flex flex-col px-[20px] gap-[1.25rem]  pb-[80px] justify-between    h-auto w-full">
      {/*right  */}
      <div ref={orders} className=" hidden h-0    text-primaryBlack  flex-col bg-white w-full    ">
      
        <div className=" max-h-[20rem] overflow-y-auto pt-[1rem]   pb-[1.25rem]   flex flex-col  w-full">
            {
              cart?.map((item,i)=>{
                return (
                  <div key={item.info.product+item.version} className="item h-fit justify-between    w-full flex">
                      <div className="  h-[3.75rem] relative w-[3.75rem]">
                        <span className=" translate-x-[50px] flex items-center justify-center text-primary translate-y-[-10px] absolute w-[1.25rem] h-[1.25rem] rounded-full bg-primaryBlack text-center text-aCaption font-caption-600 "> <span className=" w-fit h-fit ">{item.quantity}</span></span>
                        <img className=" w-[3.75rem] h-[3.75rem] object-cover object-center" src={item.thumnailPics} alt="" />
                      </div>
                      {/*  */}
                      <div className=" justify-between w-[14.563rem] flex flex-col h-fit">
                        <div className=" flex-col  flex gap-[2vw]">
                        <div className=" w-full ">
                            <div className=" text-12px font-caption-600  ">{item.name}</div>
                            <div className="  text-12px font-title2-caption text-[#767676]">{item.version}</div>
                        <div className=" w-full  text-12px font-title2-caption">
                          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)}
                        </div>
                        </div>
                        </div>
                        {/*  */}
                      
                      </div>
                  
                
                  </div>
                )
              })
            }
        </div>
        {/*  */}
        <div  className=" flex justify-center items-center border-opacity-30 h-[5.25rem] border-t border-b border-primaryBlack ">
            <div className="flex w-full justify-between">
              <input value={checkCode} onChange={(e)=>setCheckCode(e.target.value)} type="text" className={!isCheck?" h-[2.75rem] rounded-[5px] placeholder:text-12px   w-[13.75rem] ":" h-[2.75rem] rounded-[5px] text-green-400  w-[13.75rem] "} placeholder="  Nh???p m?? gi???m gi?? c???a b???n" />
              <button onClick={()=>handleCheckCode()} className=" bg-primaryBlack rounded-[5px] text-12px font-400 focus:ring-0 w-[6.688rem]"> <span className={" text-primary rounded-[5px] uppercase text-aCaption font-[400]"}>??p d???ng</span> </button>
            </div>
        </div>
        {/*  */}
        <div className=" pt-[1.25rem] border-b border-primaryBlack border-opacity-30 pb-[1.25rem]">

        <div className=" flex items-center  justify-between">
          <div className=" uppercase text-12px font-[400]" >t???m t??nh</div>
          <div className=" text-12px font-[400]"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(sum)} </div>
        </div>
        <div className=" flex items-center  justify-between">
          <div className=" uppercase  text-12px font-[400]" >ph?? giao h??ng</div>
          <div className="  text-12px font-[400]"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(0)} </div>
        </div>
        { !isCheck ? "":<div className=" flex items-center  justify-between">
          <div className=" uppercase text-12px font-[400]" >gi???m</div>
          <div className="  text-12px font-[400]">{-disCount}</div>
        </div>}
        </div>
        <div className=" flex items-center pt-[1.25rem]  justify-between">
          <div className=" uppercase text-16px font-[400]" >T???ng C???ng</div>
          <div className=" text-16px font-[500]"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(sum)} </div>
        </div>
        {/*  */}
      
      </div>
      <form onSubmit={handleSubmit((e)=>{

handleSubmitForm(e)
      })} className="gap-[2.5rem] pt-[2.5rem] flex flex-col w-full  ">
        {/* logo */}
        <div> <img className=" w-[146px] h-[96px] object-fill " src="https://live.staticflickr.com/65535/52260428311_97bfa58fc2_o.png" alt="" /> </div>
        {/* info */}
        <div className=" gap-[2.5rem]   flex flex-col ">
          {/* bread */}
          <div className=" gap-[0.313rem] items-center text-12px font-[400] uppercase flex">
            <span onClick={()=>navigate("/cart")} className=" opacity-50">gi??? h??ng</span>
            <img className=" w-[6px] h-[12px] object-fill " src="https://live.staticflickr.com/65535/52259473152_3b61dac0b6_o.png" alt="" />
            <span className={ isDoneSecond? " opacity-50":" border-b border-primaryBlack leading-[1] "}>th??ng tin</span>
            <img className=" w-[6px] h-[12px] object-fill " src="https://live.staticflickr.com/65535/52259473152_3b61dac0b6_o.png" alt="" />
            <span className={ !isDoneSecond? " opacity-50":" border-b border-primaryBlack leading-[1] "}>giao h??ng & thanh to??n</span>
          </div>
          {/* thong tin lien lac */}
          {!isDoneSecond?<div className=" flex gap-[1.25rem] flex-col">
          <div className=" text-aPara font-[500] capitalize text-[#8A8A8A] "> th??ng tin li??n l???c</div>
  
            <div className=" gap-[0.313rem] flex flex-col " >
            
            <div className="  flex items-center rounded-[5px] pl-[0.5rem] h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] w-[7.5rem] text-12px uppercase" htmlFor="email">EMAIL</label> 
              <input id="email" defaultValue={!currentUser ?'':currentUser.email} className=' text-16px w-[80%] font-[400]  focus:ring-0  outline-none border-none ' {...register("email", {required:"*????y l?? tr?????ng b???t bu???c", pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message:"*Email kh??ng h???p l???"
                    }})} type="text" placeholder='Email*' 
                     />
               <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.email?.message}</p>        
            </div>
            <div className="  flex items-center rounded-[5px] pl-[0.5rem] h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] w-[7.5rem] text-12px uppercase" htmlFor="name">h??? & t??n</label> 
              <input id="name" defaultValue={!currentUser ?'':currentUser.name} className=' text-16px w-[80%] font-[400]  focus:ring-0  outline-none border-none ' {...register("name", {required:"*????y l?? tr?????ng b???t bu???c"})} type="text" placeholder='H??? & T??n*' 
                     />
                      <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p>        
            </div>
            <div className="  flex items-center rounded-[5px] pl-[0.5rem] h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] w-[7.5rem]  text-12px uppercase" htmlFor="s??t">s??t</label> 
              <input id="s??t" defaultValue={!currentUser ?'':currentUser.phone} className=' text-16px w-[80%] font-[400]  focus:ring-0  outline-none border-none ' {...register("phone", {required:"*????y l?? tr?????ng b???t bu???c"})} type="number" placeholder='S??? ??i???n Tho???i*' 
                     />
                      <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.phone?.message}</p>        
            </div>
  
  
            </div>
          </div>:
          // ------Done2 ------//
          <div className=" flex gap-[1.25rem] flex-col">
          <div className=" gap-[8px] flex items-center text-12px font-[600] uppercase text-[#8A8A8A] "> 
          <img className=" w-[25px] object-fill h-[25px]" src="https://live.staticflickr.com/65535/52262732758_c65f4c1f20_o.png" alt="" />
          <span className=" leading-[1] border-b border-primaryBlack border-opacity-30">{currentUser?currentUser.username:"Customer"}</span>
          
          </div>
  
            <div className=" gap-[0.625rem] rounded-[5px] px-[0.625rem] py-[1.25rem] flex flex-col border border-primaryBlack   " >
            
           
            <div className=" flex-col  flex relative    w-full h-fit " >
              <p onClick={()=>setisDoneSecond(false)} className=' absolute  w-full text-right leading-[2] text-12px font-caption-600 text-[#767676]'>S???a</p>        
              <label className="text-[#8A8A8A]  text-12px w-full uppercase" htmlFor="name">Ng?????i nh???n
              </label> 
              {/* <input id="name" value={data.name} disabled className=' text-aButtonVw font-[400]  focus:ring-0 w-full outline-none border-none '  type="text" 
                     /> */}
                      <div className=" w-full text-12px font-[400]  focus:ring-0  outline-none border-none">{data.name}</div>
                     
            </div>
            <div className=" w-full border-b border-primaryBlack opacity-50"></div> 
            <div className=" flex-col relative    w-full h-fit" >
            <p onClick={()=>setisDoneSecond(false)} className=' absolute w-full text-right leading-[2] text-12px font-caption-600 text-[#767676]'>S???a</p>        
              <label className="text-[#8A8A8A] text-12px w-full uppercase" htmlFor="name">Giao t???i</label> 
  
                     <div className=" w-full text-12px font-[400]  focus:ring-0  outline-none border-none">{`${data.address},ph?????ng/x?? ${data.wards},qu???n/huy???n ${data.district}, ${citySelected.name}`}</div>
                    
            </div>
            <div className=" w-full border-b border-primaryBlack opacity-50"></div>
            <div className=" flex-col  flex relative    w-full h-fit " >
            <p onClick={()=>setisDoneSecond(false)} className=' absolute w-full text-right leading-[2] text-12px font-caption-600 text-[#767676]'>S???a</p>        
              <label className="text-[#8A8A8A] text-12px w-full uppercase" htmlFor="s??t">s??t</label> 
              {/* <input id="s??t" defaultValue={!currentUser ?'':currentUser.phone} className=' text-aButtonVw font-[400]  focus:ring-0 w-full outline-none border-none ' {...register("phone", {required:"*????y l?? tr?????ng b???t bu???c"})} type="number" placeholder='S??? ??i???n Tho???i*' 
                     /> */}
                                    <div className=" w-full text-12px font-[400]  focus:ring-0  outline-none border-none">{data.phone}</div>
                   
            </div>
            <div className=" w-full border-b border-primaryBlack opacity-50"></div>
            <div className=" relative flex-col  flex    w-full  " >
            <p onClick={()=>setisDoneSecond(false)} className=' absolute w-full text-right leading-[2] text-12px font-caption-600 text-[#767676]'>S???a</p>        
              <label className="text-[#8A8A8A] text-12px w-full uppercase" htmlFor="email">EMAIL</label> 
              {/* <input id="email" value={data.email} disabled  className=' text-aButtonVw font-[400]  focus:ring-0 w-full outline-none border-none '  type="email" placeholder='Email*' 
                     /> */}
                                     <div className="  w-full text-12px font-[400]  focus:ring-0  outline-none border-none">{data.email}</div>
                    
            </div>
  
            </div>
          </div>}
          {/* thong tin giao hang */}
          {!isDoneSecond?<div className=" flex gap-[1.25rem] flex-col">
          <div className=" text-aPara font-[500] capitalize text-[#8A8A8A] "> th??ng tin giao h??ng</div>
  
            <div className=" gap-[0.313rem] flex flex-col " >
            
            <div className="  flex items-center rounded-[5px] pl-[0.5rem] h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] text-12px  w-[7.5rem]  uppercase" htmlFor="address">?????a ch???</label> 
              <input id="address" defaultValue={!currentUser ?'':currentUser.address} className=' text-16px w-[80%] font-[400]  focus:ring-0  outline-none border-none ' {...register("address", {required:"*????y l?? tr?????ng b???t bu???c"})} type="text" placeholder='?????a Ch???*' 
                     />
               <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.address?.message}</p>        
            </div>
            {/*  */}
            <div className="  flex items-center rounded-[5px] pl-[0.5rem]  h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] text-12px w-[7.5rem] uppercase" htmlFor="city">t???nh th??nh</label> 
              <Select id="city"
          className=" cursor-pointer text-16px w-[80%] font-[400]  "
          
          components={{  DropdownIndicator }}
          options ={cityList}
          getOptionLabel={option => option.name}
          getOptionValue={option => option}
          onChange={(e)=>{
            setcitySelected(e)
          }}
          defaultValue={citySelected}
          placeholder={"T???nh th??nh*"}
          isSearchable={true}
         
      
          styles={{
            indicatorSeparator:(provided,state)=>({
              ...provided,
              display:"none"
            }),
            control: (provided,state) => ({
              ...provided,
              height:"2.6rem",
              border:"none",
              outline:"none",
              boxShadow: 'none',
              paddingLeft:"0px",
              cursor:"pointer",
              width:"full"
            }),
            indicatorsContainer:(provided,state)=>({
              ...provided,
              paddingRight:"1rem"
            }
            ),
            option:(provided,state)=>({
              ...provided,
              background:state.isSelected?"#1B1D21":"",
     
          
            }) 
          }}
        />
                     
            </div>
            {/*  */}
            <div className="  flex items-center rounded-[5px] pl-[0.5rem] h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] text-12px w-[7.5rem]  uppercase" htmlFor="district">qu???n huy???n</label> 
              <input id="district"  className=' text-16px w-[80%] font-[400]  focus:ring-0  outline-none border-none ' {...register("district", {required:"*????y l?? tr?????ng b???t bu???c"})} type="text" placeholder='Qu???n Huy???n*' 
                     />
                      <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.district?.message}</p>        
            </div>
            {/*  */}
            <div className="  flex items-center rounded-[5px] pl-[0.5rem] h-[2.75rem] w-full border border-primaryBlack " >
              <label className="text-[#8A8A8A] text-12px w-[7.5rem]  uppercase" htmlFor="wards">ph?????ng x??</label> 
              <input id="wards"  className=' text-16px w-[80%] font-[400]  focus:ring-0  outline-none border-none ' {...register("wards", {required:"*????y l?? tr?????ng b???t bu???c"})} type="text" placeholder='Ph?????ng X??*' 
                     />
                      <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.wards?.message}</p>        
            </div>
  
  
            </div>

          </div>:
          
          // ------Done2-sct2 ------//
          <div className=" flex gap-[1.25rem] flex-col">
          <div className=" text-aPara font-[500] capitalize text-[#8A8A8A] ">ph????ng th???c giao h??ng</div>
  
            <div className="  flex flex-col " >
            
            <div className=" min-h-[7vh] border-b border-primaryBlack w-[100%]">
  {/* radio */}
  <div className=" flex pb-[15px]   gap-[15px]">

      <input className="np focus:ring-0 focus:ring-transparent  " onClick={()=>setisCod(false)}  name="Developer2"  type="radio"  />
          <span className=" text-16px font-300 leading-[1.2] w-[90%] ">?????n nh???n h??ng tr???c ti???p t???i Ph??? B??n ?????i Studio (10 L?? T??? Tr???ng, ph?????ng 2, ???? L???t, L??m ?????ng)</span>
  </div>
  {/* radio */}
  {isCod ?
  <div className=" pb-[1vh] text-[#000000] pt-[15px]  text-[14px] font-title2-caption  ">
   
  </div>:""}
    </div>
    <div className=" min-h-[7vh] pb-[15px] pt-[15px]  border-b border-primaryBlack w-[100%]">

<div className=" flex gap-[15px]   ">
<input name="Developer2" onClick={()=>setisCod(true)} className="np focus:ring-0 focus:ring-transparent   " defaultChecked={isCod}  type="radio"  />
<span className=" text-16px font-300 leading-[1.2] w-[90%] ">S??? d???ng d???ch v??? giao h??ng</span>
</div>
{isCod ?<div className="  text-[#000000] pt-[15px] text-aCaption font-title2-caption  ">
  <div className=" bg-[#F7F3EE] w-full px-[0.625rem] py-[1.25rem] ">
        <div className=" normal-case text-12px font-[400] ">Ph?? giao h??ng d??? ki???n cho  {<span className=" font-[600]">{citySelected.name}: {toVND(citySelected.cost)}</span>}</div>
  </div>
</div>:""}
  </div>
  
  
            </div>

          </div>}
          {/* Done2-sct3 */}
          {!isDoneSecond ?"":  <div className=" flex gap-[1.25rem] flex-col">
          <div className=" text-aPara font-[500] capitalize text-[#8A8A8A] ">ph????ng th???c thanh to??n</div>
  
            <div className="  flex flex-col " >
            
            <div className=" min-h-[7vh] pb-[15px] pt-[15px]  border-b border-primaryBlack w-[100%]">

<div className=" flex gap-[15px]   ">
<input name="Developer" onClick={()=>setisOnlinePayment(false)} className="np focus:ring-0 focus:ring-transparent   "  type="radio" value="Yes" />
<span className=" text-16px leading-[1.2]  font-[400] w-[90%] ">Thanh to??n khi nh???n h??ng ho???c COD</span>
</div>
{!isOnlinePayment ?<div className="  text-[#000000] pt-[15px] text-12px font-title2-caption  ">
  <div className=" bg-[#F7F3EE] w-full px-[0.625rem] py-[1.25rem] ">
        <div className=" normal-case text-12px font-[300] ">N???u s??? d???ng d???ch v??? giao h??ng: chi ph?? mua h??ng c???a b???n s??? ???????c thanh to??n b???ng ti???n m???t v???i shipper khi ki???n h??ng ???????c giao t???i b???n.</div>
  </div>
</div>:""} 
  </div>
    <div className=" min-h-[7vh] pb-[15px] pt-[15px]  border-b border-primaryBlack w-[100%]">

<div className=" flex gap-[15px]   ">
<input name="Developer" onClick={()=>setisOnlinePayment(true)} className="np focus:ring-0 focus:ring-transparent   " defaultChecked={isOnlinePayment} type="radio" value="Yes" />
<span className=" text-16px leading-[1.2] font-[300] w-[90%] ">Thanh to??n qua chuy???n kho???n</span>
</div>
{isOnlinePayment ?<div className="  text-[#000000] pt-[15px] text-12px font-title2-caption  ">
  <div className=" bg-[#F7F3EE] w-full px-[0.625rem] py-[1.25rem] ">
  <div className=" uppercase">TH??ng tin thanh to??n:</div>
      <div>Ch??? t??i kho???n : <span className=" uppercase">{"C??NG TY TNHH NGH??? THU???T S??? B???Y"}</span>  </div>
      <div>S??? t??i kho???n : <span className=" uppercase">{ "13010001943008"}</span>  </div>
      <div className=" pb-[1vh]">T???i ng??n h??ng : <span className=" uppercase">{ "BIDV chi nh??nh S??? Giao D???ch 2 - Tp. HCM"}</span>  </div>
      <div className=" py-[1vh]  ">N???I DUNG CHUY???N KHO???N: <span className=" uppercase"> {`PBD SHOP - ${data.name} - ${data.phone}`}</span>  </div>
      <div className=" py-[1vh]  ">BTC s??? g???i th??ng tin x??c nh???n thanh to??n qua email t??i kho???n c???a b???n trong v??ng 48 gi??? sau khi nh???n ???????c chuy???n kho???n theo n???i dung tr??n.</div>
      <div className="py-[1vh] ">*?????i v???i c??c ????n ????ng k?? s??? d???ng m?? gi???m gi??, qu?? kh??ch s??? nh???n ???????c th??ng tin t??nh t???ng chi ph?? qua SMS/email trong v??ng 24 gi???. Qu?? kh??ch vui l??ng chuy???n kho???n sau khi nh???n th??ng tin tr??n.</div>
  </div>
</div>:""}
  </div>
  
  
            </div>

          </div>}
     
       
          {/* ----------- */}
          {!isDoneSecond? "":
          // ------Done2--------------//
          <div  className=" items-center h-[5.313rem] flex">
            <textarea onChange={(e)=>setmessage(e.target.value)} value={message} maxLength={200} placeholder="ghi ch??" className=" rounded-[5px] placeholder:uppercase text-16px font-[300] h-full w-full resize-none" >

            </textarea>
          </div>
  
          }
          <div className=" flex flex-col gap-[2.5rem]">
                 {!isDoneSecond? "":
          // ------Done2--------------//
          <div   className=" items-center h-[fit] flex">
            <span className=" placeholder:text-12px text-12px font-[300]">L??u ??: Ch???n ???X??c Nh???n Mua H??ng??? t???c l?? b???n ???? xem qua v?? ?????ng ?? v???i c??c ??i???u kho???n trong <span onClick={()=> window.open("https://www.facebook.com/phobendoi","_blank")} className=" capitalize font-[600] border-b cursor-pointer border-primaryBlack leading-[0.5]">ch??nh s??ch ho??n h???y</span> c???a ch??ng t??i.</span>
          </div>
  
          }
          <div id="456" key={"456"} className=" gap-[1.25rem] flex-col items-center  flex">
            
            <button onClick={()=>{
              isDoneSecond? hanldeBill() : console.log("123")
            }}  type={isDoneSecond? "none":"submit"} className=" bg-primaryBlack  rounded-[5px] cursor-pointer h-[3.75rem] flex items-center justify-center w-full" >
              <span className=" text-primary uppercase text-16px  font-[500] ">{ isDoneSecond? "x??c nh???n thanh to??n":"?????n giao h??ng & thanh to??n" }</span>
            </button>
            <Link className=" w-fit " onClick={()=>{isDoneSecond? setisDoneSecond(false): console.log() }}  to={isDoneSecond?'/check_out':'/cart'}>
            <div  className=" cursor-pointer flex items-center gap-[10px]">
              <img className=" w-[16px h-[12px]" src="https://live.staticflickr.com/65535/52258056589_014297f053_o.png" alt="" />
                <span className=" uppercase">
                  <div className=" text-12px font-600 ">{ isDoneSecond? "quay l???i gi??? h??ng th??ng tin":"quay l???i gi??? h??ng" }</div>
                  <div className=" border-b border-primaryBlack"></div>
                </span>
            </div>
            </Link>
          </div>
          </div>
          
        </div>
      </form>
      
      {/* left  */}
      
      </div>
      </>
     );
  }
}

export default CheckOutMB;




