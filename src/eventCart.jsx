import { useEffect, useState } from "react"
import { Calendar } from "react-date-range"
import { useDispatch, useSelector, useStore } from "react-redux"
import { offEventCart } from "./redux/navSlice"
import './App.css'
import {  format, parseISO, startOfDay } from 'date-fns'
import Select, { components } from "react-select";
import {  getEventPayment } from "./selector"
import { createTicket } from "./api"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from "axios"


const EventCart= ()=> {

  const eventCart = useSelector((state)=>getEventPayment(state))
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  
  const event = eventCart?.eventDetail

  const dispatch = useDispatch()
  const [date, setdate] = useState(parseISO(event.startDate))
  const [isShowCalendar, setisShowCalendar] = useState(false)
  const [tickets,setTickets] =useState(event.dateRange[0].tickets)
  const [ticket,setTicket] = useState(null)
  const [sessions, setSessions] = useState(event.dateRange[0].tickets[0].session)
  const [session, setSession] = useState(null)
  const [slot, setslot] = useState(1)
  const [isOnlinePayment, setisOnlinePayment] = useState(true)
  const [isClickOne, setisClickOne] = useState('')
  const [isLock, setisLock] = useState(false)
  const [isDone, setisDone] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  const [checkCode, setCheckCode] = useState()
  const [errorGifcode, seterrorGifcode] = useState(false)
  const pickTicket =(e)=>{
    let newElemt=[]
    const thisTick = event.dateRange.find( item=> format( startOfDay(parseISO(item.date))  ,"dd/MM/yyyy")=== format(e,"dd/MM/yyyy"))  
    if(!thisTick){
      setTicket(null)
      setTickets([ {label:" Ngày đã được chọn không có sự kiện nào diễn ra, xin hãy thử lại !",session:[{
        time:"00",
        min:"00",
        maxTicket:-1

      },
      {
        time:"00",
        min:"00",
        maxTicket:-1

      },
      {
        time:"00",
        min:"00",
        maxTicket:-1

      }
    
    ]} ])

      setSessions([{
        time:"00",
        min:"00",
        maxTicket:-1

      },
      {
        time:"00",
        min:"00",
        maxTicket:-1

      },
      {
        time:"00",
        min:"00",
        maxTicket:-1

      }
    
    ])
     
      return 
    
    }
    thisTick.tickets.map((item,index)=>{
      return newElemt.push({ ...item, value:item,label:`${item.name}: ${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)} `})
    })
    setTickets(newElemt)
    setTicket(newElemt[0])
    
    setSessions(newElemt[0].session)

    return 
  }
  useEffect(()=>{
    pickTicket(date)
  },[])
  const newTicket ={
    name : ticket?.name,
    eventInfo: event._id,
    eventCode:event.eventCode,
    buyerInfo:currentUser._id,
    date: date,
  
    time:session?.time,
    min:session?.min,
    slot:slot,
    isOnlinePayment:isOnlinePayment,
    costPerTicket:ticket?.cost,
    giftcode:isCheck?checkCode:"none"
    
  }
 
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img className=" w-[18px] h-[9px] " src={"https://live.staticflickr.com/65535/52258056629_db753da3c5_t.jpg"}alt="123" />
      </components.DropdownIndicator>
    );
  };

  const hanleToggle =(id,item) =>{

        
        setisClickOne(id)
        setSession(item)

  }
  const handlePayment= ()=>{

    if(newTicket.name&&
      newTicket.date&&
      newTicket.buyerInfo&&
      newTicket.costPerTicket&&
      newTicket.eventInfo&&
      newTicket.time&&
      newTicket.slot){
        setisLock(true)
    }else{
      console.log("chua dc")
    }

   
  }
  const hanleCreateTicket = async ()=>{
     const res = await createTicket(dispatch,newTicket)
      if(res._id){
        setisDone(true)
      }
     return 
  }

  const handleCheckCode= async  ()=>{
    if(!checkCode){
      return alert('Hãy nhập mã code vào !')
    }
    try {
      
      const res = await axios.post('https://api.phobendoi.art/api/discount/check_for_event',{
        name: checkCode,
        eventInfo: event._id,
      })
      console.log(res.data[0].userUsed)
      if(res.data[0].userUsed.length===0){
        seterrorGifcode(false)
        setIsCheck(true)
        alert(`Bạn sử dụng thành công gifcode này.`)
        return
      }else{

        const checkUsed = res.data[0].userUsed.find( item=>item===currentUser._id)
        console.log(checkUsed)
        if(checkUsed.length!==0){
         seterrorGifcode("Bạn đã sử dụng giftcode này rồi, xin vui lòng thử lại sau !")
         setIsCheck(false)
         return 
        }else{
          seterrorGifcode(false)
          setIsCheck(true)
          alert(`Bạn sử dụng thành công gifcode này.`)
     
        }
      }
    } catch (error) {
      seterrorGifcode(error.response.data)
      setIsCheck(false)
      return  alert(error.response.data)
    }
  }
  return(
    <div className=" z-[1000] ">
     <div className=" w-screen h-screen    fixed  z-30 flex justify-end  "> 
<div onClick={()=>dispatch(offEventCart())}  className=" w-screen h-screen absolute opacity-30 bg-black "  ></div>
<div className=" z-20 px-[4%] mb:w-full mb:px-[20px] py-[2%] mb:py-[20px] overflow-auto  w-[50vw]   bg-[#E6DFD7] " >
<div className=" flex flex-col h-auto pb-[4vh] mb:gap-[2.5rem]    ">
<div className=" border-primaryBlack mb:justify-between border-b flex mb:pb-[0.938rem]  h-[10%]">
<div className=" items-center mb:w-[16.5rem] w-[94%]  mb:text-16px capitalize text-aSubtitle font-title-Subtitle">{event.name}</div>
<button onClick={()=>dispatch(offEventCart())} className=" h-fit flex justify-end w-fit"> <img className=" h-[1.875rem] w-[1.875rem] " src={require("./crossBlack.png")} alt="" /></button>
</div>
{/* ---------- */}
{!isDone?<div className=" mb:flex mb:flex-col mb:mb:gap-[1.25rem]">

<div className=" mb:h-fit mb:text-12px h-[15vh] flex items-center text-aCaption   gap-3  font-title2-caption" >
<button onClick={()=>setisLock(false)} className={isLock?" opacity-50 uppercase":" underline uppercase"} >bước 1: Đăng ký vé</button> <span> <img className="  h-[0.438rem] w-[0.438rem] " src={require("./Asset/arrownext.svg").default} alt="" /></span> <button className={isLock?" underline uppercase":" opacity-50 uppercase"} disabled={true} >bước 2: Thanh toán</button>
</div>
{/* ghi chu */}
{ !isLock? <div>

{ event.ticketLimitationAtOnce ===1? <div className=" mb:text-12px mb:h-fit text-aCaption font-title2-caption h-[10vh]  ">
Ghi chú: Do không gian hạn chế nên để đảm bảo trải nghiệm tốt nhất cho quý vị, sự kiện này chỉ cho phép đăng ký một vé với mỗi một tài khoản.
</div>:""}
<div className=" flex flex-col mb:gap-[1.25rem] gap-[5vh]">

<div onClick={()=>setisShowCalendar(!isShowCalendar)} className=" relative mb:flex-col flex items-center mb:items-start  justify-end ">
  <span className=" mb:w-full mb:flex mb:justify-end mb:pr-[0.938rem] w-auto pr-[23px] cursor-pointer mb:h-[3rem] mb:items-center absolute"><img className="h-[18px] w-[18px] " src={"https://live.staticflickr.com/65535/52258056564_e463c1bf4d_t.jpg"} alt="123" /></span> 
  <label className=" w-[25%] uppercase font-title2-caption mb:text-12px mb:w-full text-aCaption" htmlFor="lich"> ngày tham gia</label>
  <input value={format(date,"dd/MM/yyyy")} type="text" className=" mb:text-16px mb:pl-[0.938rem] pl-[25px] rounded-[6px] text-aPara font-p outline-none border-none mb:w-full mb:h-[3rem]  h-[3.5rem] w-[75%]" disabled name="" id="lich" /> 
{isShowCalendar?<div className=" z-20 translate-y-[25vh] absolute">
  <Calendar 
  className="  text-primaryBlack "
  color="#ffdd00"
  date={date}
  minDate={new Date() > parseISO(event.startDate) ?new Date():parseISO(event.startDate)}
  maxDate={new Date()> parseISO(event.endDate) ?new Date():parseISO(event.endDate)}
  
  onChange={(e)=>{setdate(e)
    pickTicket(e)
  }} 
  
  />

</div>:""}
</div>
<div  className=" mb:flex-col mb:items-start flex items-center justify-end ">
  <label className=" mb:w-full mb:text-12px w-[25%] uppercase font-title2-caption text-aCaption" htmlFor="lich"> loại vé</label>

       <Select
        className=" mb:w-full mb:text-16px cursor-pointer text-aPara font-p w-[75%] "
        
        components={{  DropdownIndicator }}
        options ={tickets}
        onChange={(e)=>{setTicket(e)
          newTicket.name = e.name
          
        setSessions(e.session)
       
        }}
        defaultValue={ticket}
        placeholder={"Choose"}
        isSearchable={false}
       
        value={ticket}
        styles={{
          indicatorSeparator:(provided,state)=>({
            ...provided,
            display:"none"
          }),
          control: (provided,state) => ({
            ...provided,
            height:"3.5rem",
            border:"none",
            outline:"none",
            boxShadow: 'none',
            paddingLeft:"15px",
            cursor:"pointer",
            "@media screen and (min-device-width: 320px) and (max-device-width: 801px)": {
              ...provided["@media screen and (min-device-width: 320px) and (max-device-width: 801px)"],
              height:"3rem",
              display:"flex",
              alignContent:"center",
              paddingLeft:"7px",
          },
          }),
          indicatorsContainer:(provided,state)=>({
            ...provided,
            padding:"15px",
            "@media screen and (min-device-width: 320px) and (max-device-width: 801px)": {
              ...provided["@media screen and (min-device-width: 320px) and (max-device-width: 801px)"],
              padding:"7px",
          },
           
          }
          ),
          option:(provided,state)=>({
            ...provided,
            background:state.isSelected?"#1B1D21":"",
   
        
          }) 
        }}
      />

</div>
<div  className=" mb:flex-col flex items-center justify-end ">
  <label className=" mb:w-full mb:text-12px w-[25%] h-[100%] pt-[2.5vh] uppercase font-title2-caption text-aCaption flex items-start  " > <span className="   " >Khung giờ</span> </label>
  <div  className=" mb:w-full w-[75%]  justify-between gap-y-4 flex flex-wrap">
        {
          sessions?.map((item,i)=>{
            return (
              <div key={i} onClick={()=> {item.maxTicket!==-1? hanleToggle(item._id,item) :console.log("forbiden")}} 
            className={item.maxTicket!==-1? (!(isClickOne===item._id) ?"  cursor-pointer flex w-[15vw]  rounded-[6px] h-[3.5rem] mb:h-[3rem] mb:w-[9.938rem] mb:text-16px  justify-center items-center border-[1px] border-primaryBlack text-primaryBlack bg-inherit ":" mb:h-[3rem] mb:w-[9.938rem] mb:text-16px cursor-pointer flex w-[15vw]  rounded-[6px] h-[3.5rem]  justify-center items-center border-2  bg-primaryBlack text-primary ")
              :" cursor-not-allowed opacity-50 flex w-[10.4vw] rounded-[6px] h-[3.5rem]  justify-center items-center mb:h-[3rem] mb:w-[9.938rem] mb:text-16px  bg-primaryBlack text-primary"}>
                <span className=" z-10 w-[10.4vw] h-[6vh] absolute "></span>
               <span className=" mb:text-16px text-aPara font-p"> {item.time}h{`${item.min||"00"}`}-{item.time+event.duration}h{`${item.min||"00"}`}</span>
              </div>
            )
          })
        }
       
  </div>

</div>
<div  className=" mb:flex-col flex items-center mb:items-start justify-end ">
  <label className=" backdrop:w-full mb:text-12px w-[25%] uppercase font-title2-caption text-aCaption" >Số lượng</label>
  <div  className=" mb:w-full w-[75%] gap-[2vw] flex flex-wrap">
     <div className=" border-2 mb:w-full mb:h-[3rem] h-[3.5rem] flex w-[15vw]  " >
      
       
        <button  onClick={ ()=> {
          slot > 1 ?
          setslot(slot -1): console.log()
        } } className=" rounded-l-[6px] bg-[#FFFFFF]  h-[100%] mb:pl-[0.938rem] pl-[1.875rem]"><img className=" mb:w-[1.125rem]  w-[2rem] " src={"https://live.staticflickr.com/65535/52257773486_df41202328_t.jpg"} alt="123" /></button>
         <div className=" mb:text-16px mb:w-full text-aPara font-p bg-[#FFFFFF]  w-[16vw]  flex justify-center items-center ">{slot<10?`0${slot}`:slot}</div>
          <button onClick={ ()=> {
          slot < event.ticketLimitationAtOnce?
          setslot(slot +1): console.log()
        } } className=" rounded-r-[6px] bg-[#FFFFFF]  h-[100%] mb:pr-[0.938rem]  pr-[1.875rem]"><img className=" mb:w-[1.125rem]  w-[2rem] h-[1rem] " src={"https://live.staticflickr.com/65535/52258056624_5ff1d0be7f_t.jpg"} alt="123" /></button>
     </div>
       
  </div>

</div>
<div  className=" flex items-center mb:flex-col justify-end ">
  <label className=" mb:h-[1.25rem] w-[25%] " ></label>
  <div  className=" mb:w-full w-[75%] gap-[2vw] flex flex-wrap">
    <button onClick={()=> handlePayment()} className=" rounded-[6px] w-[100%] mb:h-[3.75rem] h-[12.5vh] bg-primaryBlack uppercase text-primary mb:text-16px text-aPara font-title-Subtitle  "> Tiếp tục đến thanh toán </button>
       
  </div>

</div>

</div>
</div>:
<div className="">
  <div className=" h-[11.7vh] text-aCaption font-[400] mb:text-12px" >Lưu ý: Chọn “Hoàn tất & Xác nhận” tức là bạn đã xem qua và đồng ý với các điều khoản trong <span onClick={()=>{window.open("https://docs.google.com/forms/d/e/1FAIpQLSdFY-nNjRCkc9Oy6s13sV3IdF3Z2dQt5vzJYEY7M3vRpXzuHg/viewform", '_blank')}} className="font-[600] uppercase underline  cursor-pointer ">chính sách hoàn hủy</span> của chúng tôi.</div>
<div  className=" mb:pb-0 flex items-start pb-[3.2vh] mb:flex-col justify-end ">
  <label className=" w-[25%] leading-[7vh] mb:text-12px mb:w-full  flex align-text-top uppercase font-title2-caption text-aCaption " >Hình thức</label>
  <div  className=" mb:w-full w-[75%] gap-[2.5vh] flex flex-wrap">
    <div className=" min-h-[7vh] pb-[2.5vh] border-b border-primaryBlack w-[100%]">
  {/* radio */}
  <label className="">
    <input type="radio"  className=" before:mb:w-[1rem] before:mb:h-[1rem]" name="radio-button" onClick={()=>setisOnlinePayment(false)} defaultChecked={!isOnlinePayment}  />
    <span className="before:mb:w-[1rem] before:mb:h-[1rem] font-p text-aPara mb:text-16px   " >  Thanh toán trực tiếp</span>
  </label>
  {/* radio */}
  {!isOnlinePayment ?
  <div className="  pb-[1vh] text-[#000000] pt-[2.5vh] mb:text-12px  text-[14px] font-title2-caption  ">
    <div className=" bg-[#F7F3EE] mb:py-[0.813rem]  mb:px-[0.688rem]  p-[4vh] ">
      <div className=" py-[1vh]  ">Chi phí vé của bạn sẽ được thanh toán tại cổng khi check-in.   </div>
      <div className=" py-[1vh]  ">BTC sẽ gửi thông tin xác nhận qua email tài khoản của bạn trong vòng 48 giờ sau khi nhận được chuyển khoản theo nội dung trên.</div>
      <div className="py-[1vh] ">*Đối với các đơn đăng ký sử dụng mã giảm giá, quý khách sẽ nhận được thông tin tính tổng chi phí qua SMS/email trong vòng 24 giờ.</div>
  </div>
  </div>:""}
    </div>
    <div className=" min-h-[7vh] pb-[2.5vh]  border-b border-primaryBlack w-[100%]">

<label className="">
  <input type="radio" className=" " name="radio-button" onClick={()=>setisOnlinePayment(true)} defaultChecked={isOnlinePayment}  />
  <span className=" font-p mb:text-16px text-aPara before:mb:w-[1rem] before:mb:h-[1rem]   " >  Thanh toán qua chuyển khoản</span>
</label>
{isOnlinePayment ?<div className=" pb-[1vh] text-[#000000] pt-[2.5vh] mb:text-12px  text-[14px] font-title2-caption    ">
  <div className=" bg-[#F7F3EE] mb:py-[0.813rem]  mb:px-[0.688rem]  p-[4vh] ">
        <div className=" uppercase">THông tin chuyển khoản:</div>
      <div>Chủ tài khoản : <span className=" uppercase">{ event.online.stkName ||"CÔNG TY TNHH NGHỆ THUẬT SỐ BẢY"}</span>  </div>
      <div>Số tài khoản : <span className=" uppercase">{ event.online.stk ||"13010001943008"}</span>  </div>
      <div className=" pb-[1vh]">Tại ngân hàng : <span className=" uppercase">{ event.online.bank ||"BIDV chi nhánh Sở Giao Dịch 2 - Tp. HCM"}</span>  </div>
      <div className=" py-[1vh]  ">NỘI DUNG CHUYỂN KHOẢN: <span className=" uppercase">{event.online.ckContent||`"${event.name}-${currentUser?.name||"Họ và tên"}-${currentUser?.phone||"SĐT"}"`}</span>  </div>
      <div className=" py-[1vh]  ">BTC sẽ gửi thông tin xác nhận thanh toán qua email tài khoản của bạn trong vòng 48 giờ sau khi nhận được chuyển khoản theo nội dung trên.</div>
      <div className="py-[1vh] ">*Đối với các đơn đăng ký sử dụng mã giảm giá, quý khách sẽ nhận được thông tin tính tổng chi phí qua SMS/email trong vòng 24 giờ. Quý khách vui lòng chuyển khoản sau khi nhận thông tin trên.</div>
  </div>
</div>:""}
  </div>
       
  </div>

</div>
<div  className=" mb:py-[2.5rem] mb:flex-col mb:pb-[1.25rem] flex items-start  pb-[3.2vh] justify-end ">
  <label className=" mb:w-full mb:pt-0 w-[25%] pt-[2.5vh] mb:text-12px  uppercase font-title2-caption text-aCaption" >Ghi chú </label>
    <div className=" mb:w-full w-[75%]">
    <textarea rows={3} maxLength={120} placeholder="Để lại ghi chú với BTC hoặc nhập mã giảm giá của bạn tại đây." type=" textera" className=" mb:text-12px pt-[2vh] border-[#191919] text-aCaption font-title2-caption resize-none rounded-[6px] align-text-top  h-[17vh] w-[100%] bg-inherit  " />
       </div>
</div>
<div  className=" notmb:pl-[25%] mb:py-[1.25rem] mb:pb-[2.5rem] flex flex-col justify-center mb:items-start gap-1 items-center border-opacity-30 mb:h-fit h-[100px] ">
            <div className="flex w-full justify-between">
              <input value={checkCode} onChange={(e)=>setCheckCode(e.target.value)} type="text" className={!isCheck?"mb:text-12px mb:h-[3rem] h-[55px] rounded-[5px]   w-[73%] ":"mb:text-12px h-[55px] mb:h-[3rem] rounded-[5px] text-green-400  w-[73%] "} placeholder="Nhập mã giảm giá của bạn" />
              <button onClick={()=>handleCheckCode()} className=" mb:text-12px bg-primaryBlack rounded-[5px] focus:ring-0 w-[23%]"> <span className={" mb:text-12px text-primary rounded-[5px] uppercase text-aCaption font-[400]"}>Áp dụng</span> </button>

            </div>
            <div className=" text-aCaption mb:text-12px text-red-600">{isCheck? <span className=" text-green-500">Giftcode có thể sử dụng</span> :errorGifcode}</div>
        </div>
<div  className=" mb:flex-col flex items-center justify-end ">
  <label className=" w-[25%] " ></label>
  <div  className=" mb:w-full w-[75%] gap-[2vw] flex flex-wrap">
    <button onClick={()=>hanleCreateTicket() } className=" mb:text-16px rounded-[6px] w-[100%] h-[12.5vh] bg-primaryBlack uppercase text-primary text-aPara font-title-Subtitle  ">{`Hoàn tất & xác nhận `} </button>
       
  </div>

</div>

<div  className=" flex items-center justify-end ">
  <label className=" w-[25%] mb:hidden" ></label>
  <div  className=" mb:w-full w-[75%] gap-[0.5vw] flex justify-center items-end ">
    <img onClick={()=>setisLock(false) } className=" object-fill  cursor-pointer w-[0.75rem] h-[0.75rem]" src={require("./component/Events/ar.png")} alt="123" /><button onClick={()=>setisLock(false) } className=" border-b pt-[4vh] border-primaryBlack leading-[2vh]  uppercase text-aButtonVw mb:text-12px  font-semibold ">{`Quay lại đăng ký`} </button>
       
  </div>

</div>
</div>

}
</div>:
<div className=" flex justify-between mb:pt-0 mb:min-h-[60vh] min-h-[80vh] flex-col pt-[5vh]">
  <div className=" leading-[1.2]">

  <div className=" mb:text-28px text-[4rem] font-[500]">Bạn đã đăng ký thành công!
 </div>
 <div className=" mb:text-28px text-[4rem] font-[500]">Xin vui lòng chờ chúng tôi xác nhận qua Email.</div>
  </div>
  <div onClick={()=>
  {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdFY-nNjRCkc9Oy6s13sV3IdF3Z2dQt5vzJYEY7M3vRpXzuHg/viewform", '_blank')
  }} className=" cursor-pointer flex underline mb:text-12px  text-aButtonVw items-center font-[600] ">
    CHÍNH SÁCH HOÀN HỦY <div className=" w-[20px] bg-linkArrow bg-cover  bg-no-repeat bg-center h-[20px] " > </div>
  </div>
  <div className=" pt-[1vh] flex mb:border-0 mb:flex-col border-t text-aCaption mb:text-12px justify-between border-primaryBlack">
  <div className=" uppercase">facebook:  phố bên đồi</div>
  <div className=" uppercase">hotline:  093892310338</div>
  <div className=" uppercase">email: info@phobendoi.art</div>
  </div>
</div>

}

</div>
</div>
</div>
</div>
   
  )
}
export default EventCart