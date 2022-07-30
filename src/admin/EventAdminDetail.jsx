import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import {  useNavigate,useParams  } from "react-router-dom";
import { offEventCart, primaryBG } from "../redux/navSlice";
import 'react-calendar/dist/Calendar.css';








import { getOneEvent } from "../selector";
import { activeTikect, getEventById, getEventByIdAdmin } from "../api";

import { format, parseISO } from "date-fns";
import UpdateEvent from "./update";

function EventAdminDetail() {

  

  // const event=events1.oneEvent
  const [isModal, setisModal] = useState(false)
  const [onlinePaymentlist, setOnlinePaymentlist] = useState(null)

  const [isOnline, setisOnline] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  // const {tab } = location.state===null?"tất cả":location.state
  
  const { eventID} = useParams()
 

  useEffect(()=>{

    getEventById(dispatch,eventID)
  },[eventID])

  useEffect(()=>{

  
  
   

    dispatch(primaryBG())
    return ()=>{
      dispatch(offEventCart())
      
     
    }
  },[])
  

  const hanleGetList = async () =>{
      try {
        const res = await getEventByIdAdmin(eventID)
          
        return   setOnlinePaymentlist(res)
      } catch (error) {
        return console.log(error)
      }
    
     
  }
  
  
  
  const event = useSelector((state)=>getOneEvent(state)) 
  if(!event){
    getEventById(dispatch,eventID)
  }

 
      
    const dateWeek =(date)=>{
      const days = ["Chủ Nhật", "Thứ Hai", "Thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"];
     
      return days[date]
    }
    const dateMonth =(month)=>{
      
     
    
      return  month+1>10?`.${month+1}`:`.0${month+1}`
    }

    
    const dateHours =(hours,min)=>{

       return `${hours}h${min<10?`0${min}`:min}`
    }
  
   
  // arr.length
  const date =new Date(event.startDate)

 
  


  
 
const handleActive = async (ticket,id)=>{
  let text = "Bấm ok để active !";
  
  if (window.confirm(text) === true) {
    const res = await activeTikect(dispatch,ticket,id)
    alert(res)
    
    return  hanleGetList()
  }else{
    alert("Bạn bấm hủy")
  }
  
}


  return ( 

    <div className=" h-[auto] flex pt-[15vh]    flex-col items-center w-[100%] bg-primary ">
    
      <div className=" flex justify-center gap-[2rem] ">
      <button onClick={()=>setOnlinePaymentlist(false)} className=" rounded-xl bg-primaryYellow w-[10vw] h-[3vw] ">Back to even info</button>
        <button onClick={()=>setisModal(!isModal)} className=" rounded-xl bg-primaryYellow w-[10vw] h-[3vw] ">Update event</button>
        <button onClick={()=> {hanleGetList()
        setisOnline(true)} } className=" rounded-xl bg-green-500 w-[10vw] h-[3vw] ">Online Payments</button>
        <button onClick={()=> {hanleGetList()
        
        setisOnline(false)
        } } className=" rounded-xl bg-primaryBlack text-primary w-[10vw] h-[3vw] ">Offline Payments</button>
      </div>
      {isModal?<UpdateEvent update={onlinePaymentlist} ></UpdateEvent>:"" }
      {onlinePaymentlist?
      <div className="div pt-6 w-[100%]">
        {
          onlinePaymentlist.dateRange.map((item1,i)=>{
            return (
              <div key={i} className=" flex flex-col">
                <div className=" flex justify-center h-[15vh] items-center w-[100%] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  <div className=" text-aSubtitle text-white">{format(parseISO( item1.date),"EEEE-dd/MM/yyyy") }</div>
                </div>
                <div>
                  {
                    item1.tickets.map((item2,i)=>{
                      return( 
                        <div key={i} className="dv">
                          {
                            item2.session.map((item3,i)=>{
                              return(
                                <div key={i} className="session  ">
                                  <div className=" min-w-0 rounded-t-md bg-primaryBlack text-white px-6 py-3 flex"> 
                                    <div className=" "> Khung giờ</div>
                                      <div>{item3.time}h{item3.min}   số vé còn lại: { item3.maxTicket} </div>
                                  </div>
                                  <div>
      <table className="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    Loại vé
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    Event Code
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    Email
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    Họ và tên
                </th>
                <th scope="col" className=" min-w-[3vw] px-6 py-3">
                    Địa chỉ
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    SĐT
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                   Số lượng
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    Tổng tiền
                </th>
                <th scope="col" className=" min-w-[0vw] px-6 py-3">
                   {isOnline? "Active vé": "Đây là vé offline" }
                </th>
                {/* <th scope="col" className=" min-w-[0vw] px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th> */}
            </tr>
        </thead> 
                                  {isOnline?
                                  <tbody>
                                  {
                                    item3.onlinePayment.map((item4,i)=>{
                                      return(
                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
 
                                          <th scope="row" className={`${item4.isPaid?"bg-green-400":" bg-red-400"} shrink-0 min-w-0 px-6 py-4 font-medium text-white dark:text-white whitespace-nowrap`}>
                                          {item4.name}
                                            </th>
                                          <td  className="px-6 py-3  shrink-0 min-w-0">  {item4.eventCode} </td >
                                          <td  className="px-6 py-3  shrink-0 min-w-0">  {item4.buyerInfo?.email?item4.buyerInfo?.email:"chưa có"} </td >
                                          <td  className="px-6 py-3  shrink-0 min-w-0">  {item4.buyerInfo?.username||"chưa có"} </td >
                                          <td  className=" px-6 py-3 shrink-0 min-w-0">  {item4.buyerInfo?.address||"chưa có"} </td >
                                          <td  className=" px-6 py-3 shrink-0 min-w-0">  {item4.buyerInfo?.phone||"chưa có"} </td >
                                          <td  className=" px-6 py-3 shrink-0 min-w-0">  {item4.slot} </td >
                                          <td  className=" px-6 py-3 shrink-0 min-w-0">  {`${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item4.slot*item4.costPerTicket)}`} </td >
                                          <td onClick={()=>{handleActive(item4,item1._id)}} className=" px-6 py-3 shrink-0 min-w-0 flex justify-center items-center  "> 
                                          {item4.isPaid?<svg className=" rotate-180 stroke-orange-300 cursor-pointer  hover:stroke-red-400 h-10 w-6" xmlns="http://www.w3.org/2000/svg"  fill="none " viewBox="0 0 24 24" stroke="" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                          </svg>:<svg className=" stroke-teal-300 cursor-pointer  hover:stroke-lime-400 h-10 w-6" xmlns="http://www.w3.org/2000/svg"  fill="none " viewBox="0 0 24 24" stroke="" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                          </svg> } 
                                          </td >
                                        </tr>
                                      )
                                    })
                                  }
                                  </tbody>:
                                   <tbody>
                                   {
                                     item3.offlinePayment.map((item4,i)=>{
                                       return(
                                         <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
  
                                           <th scope="row" className={`${item4.isPaid?"bg-green-400":" bg-red-400"} shrink-0 min-w-0 px-6 py-4 font-medium text-white dark:text-white whitespace-nowrap`}>
                                           {item4.name}
                                             </th>
                                           <td  className="px-6 py-3  shrink-0 min-w-0">  {item4.eventCode} </td >
                                           <td  className="px-6 py-3  shrink-0 min-w-0">  {item4.buyerInfo?.email?item4.buyerInfo?.email:"chưa có"} </td >
                                           <td  className="px-6 py-3  shrink-0 min-w-0">  {item4.buyerInfo?.username||"chưa có"} </td >
                                           <td  className=" px-6 py-3 shrink-0 min-w-0">  {item4.buyerInfo?.address||"chưa có"} </td >
                                           <td  className=" px-6 py-3 shrink-0 min-w-0">  {item4.buyerInfo?.phone||"chưa có"} </td >
                                           <td  className=" px-6 py-3 shrink-0 min-w-0">  {item4.slot} </td >
                                           <td  className=" px-6 py-3 shrink-0 min-w-0">  {`${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item4.slot*item4.costPerTicket)}`} </td >
                                           <td onClick={()=>{handleActive(item4,item1._id)}} className=" bg-orange-500 px-6 py-3 shrink-0 min-w-0 flex justify-center items-center  "> 
                                           {item4.isPaid?<svg className=" rotate-180 stroke-orange-300 cursor-pointer  hover:stroke-red-400 h-10 w-6" xmlns="http://www.w3.org/2000/svg"  fill="none " viewBox="0 0 24 24" stroke="" strokeWidth={2}>
                                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                           </svg>:<svg className=" stroke-teal-300 cursor-pointer  hover:stroke-lime-400 h-10 w-6" xmlns="http://www.w3.org/2000/svg"  fill="none " viewBox="0 0 24 24" stroke="" strokeWidth={2}>
                                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                           </svg> } 
                                           </td >
                                         </tr>
                                       )
                                     })
                                   }
                                   </tbody>
                                  }
                                  </table>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      
      
      :<div className="   w-[100%] h-[auto]  flex flex-col  " >
      <div onClick={()=>navigate(-1)} className=" cursor-pointer w-[12%] items-center flex gap-3">
       Back
      </div>
      <div className=" flex justify-between flex-col w-[100%]  mt-[10vh] h-[60vh]">

      <div className=" w-[100%] capitalize text-aTitle2 font-[500] indent-[-0.3vw] " >{`${event.type}:${event.name}`}  </div>
      <div className=" flex text-aCaption uppercase h-[35%]   ">
        <div className=" w-[20%]  ">
          <div className=" font-[600] pb-2">thời gian</div>
          <div className="flex text-aCaption font-title2-caption" >
          <div className=" ">{dateWeek( date.getDay())}</div> 
              <div>-{ date.getDate()<10?`0${date.getDate()}`:date.getDate()}</div> 
              <div>{dateMonth( date.getMonth())}</div> 
              <div>.{ date.getFullYear()}</div> 
  
          </div>
              <div className="text-aCaption font-title2-caption">{dateHours( date.getHours()+event.startHour, date.getMinutes()+event.startMin)}</div> 
        </div>
        <div className=" w-[32%]  ">
        <div className=" font-[600] pb-2">Địa điểm</div>
        <div className="  w-[90%]" > {event.address} </div>
        </div>
        <div className=" w-[24%]  ">
        <div className=" font-[600] pb-2">Giá vé</div>
        <div>
          {event?.dateRange[0].tickets.map((item,i)=>{
            return (
              <div key={i} className="">
                {
                  
               
                `${item.name}: ${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)} `
                }
              </div>
            )
          })}
        </div>
        </div>

        <div className=" w-[25%]  flex justify-end ">
        
        </div>

      </div>
      </div>
       <div className="  h-[auto] w-[100%]  "> <img className=" rounded-[20px] object-cover w-[100%] h-[120vh] object-center " src={event.heroPic} alt="" /> </div>
       <div className=" mt-[12vh] h-[auto] py-[5%] flex">
        <div className=" text-aCaption font-title2-caption uppercase w-[40%] "> {`(Về sự kiện)`} </div>
        <div className="text-aPara font-p w-[60%]">
          {event.discription?.map((item,i)=>{
            return(
              <div key={i} className="  w-[100%]" >
                {item}
            </div>
            )
          })}
        </div>
       </div>
       <div className=" pb-[30vh] h-[auto] pt-[10vh] py-[5%] flex">
        <div className=" text-aCaption font-title2-caption uppercase w-[40%] "> {`(với sự tham gia của)`} </div>
        <div className="text-aPara flex flex-col gap-[3vh] font-[500]  w-[60%]">
          {event.artist?.map((item,i)=>{
            return(
              <div key={i} className=" h-[7vh] border-b-[1px] border-black  w-[100%]" >
                {item}
            </div>
            )
          })}
        </div>
       </div>
      </div>}
       
         
          <div className="spacer w-screen h-[20vh]"></div>
    </div>
   );
}

export default EventAdminDetail;