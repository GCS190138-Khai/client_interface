import { useEffect, useState } from "react";
import {   useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate,useParams  } from "react-router-dom";
import { offEventCart, onEventCart, primaryBG } from "../../redux/navSlice";
import 'react-calendar/dist/Calendar.css';
 
 
import './arrow.scss'

import { getEventById } from "../../api";

import { getOneEvent } from "../../selector";
 
import { useLayoutEffect } from "react";
import { useUpdateEffect } from "../Shop/shop";
import gsap from "gsap";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import { vi } from "date-fns/locale";
import ReadQuillEditor from "../../Util/ReadOnlyEditor";

function EventDetail() {

  
  
  // const event=events1.oneEvent
  const [isLoading, setIsLoading] = useState(true)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()
  // const {tab } = location.state===null?"tất cả":location.state
  const [tab, settab] = useState(null)
  const { eventID} = useParams()
 
  useLayoutEffect(()=>{
    dispatch(primaryBG())
    gsap.to(window,{scrollTo:{
      y:0
    }})
    if(isLoading){
      (async () => {
        await getEventById(dispatch,eventID)
         
        return setIsLoading(false)
      })();
    
      
    }
   },[isLoading])
 
useUpdateEffect(()=>{
 
  (async () => {
    await   getEventById(dispatch,eventID)
     
   
  })();

},[eventID])
  useEffect(()=>{

    
    const checkTab =()=>{
      if(location.state===null ){
        return settab(null)
      }
       const  {tab} = location.state
        return  settab(tab)
      
    }
    checkTab()

    dispatch(primaryBG())
    return ()=>{
      dispatch(offEventCart())
      
     
    }
  },[])
  

  
  
  
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  const event = useSelector((state)=>getOneEvent(state)) 
 

 
      


    

  
   
  // arr.length




  const handleEventCart=(event)=>{
      if(!currentUser){
        navigate('/account')
      }
      dispatch(onEventCart(event))

  }



  
 
  if(isLoading){
    return(
      <div className="div">
        loading....
      </div>
    )
  }else{

    return ( 
  
      <div className=" h-[auto] flex pt-[15vh] mb:px-0  px-[10%]  flex-col items-center w-screen bg-primary ">
      
      
      
        <div className="   w-[100%] h-[auto]  flex flex-col  " >
        <div onClick={()=>navigate(-1)} className=" mb:px-[20px]  cursor-pointer min-w-[12%] items-center flex gap-2">
         <span className=" flex items-center justify-center "> 
         <img src={require("./ar.png")} alt="error" className=" object-contain mb:h-[1rem] mb:w-[1rem]  h-[1.125rem] w-[1.125rem] " /> 
         </span> 
         <span className=" mb:text-12px    text-aCaption font-normal uppercase ">{`quay lại ${tab||"tất cả"}`} <div className=" border-t-[1px] mt-[-0.4vh] border-primaryBlack w-[100%]" ></div></span>
        </div>
        <div className=" mb:pb-[3.75rem] mb:px-[20px]  flex notmb:justify-between mb:gap-[2.5rem] flex-col w-[100%] mb:mt-[3.75rem] mb:h-fit  mt-[10vh] h-[60vh]">
  
        <div className=" w-[100%] capitalize leading--[1.2] text-aTitle2 mb:text-28px font-[500] indent-[-0.3vw] " >{`${event.name}`}  </div>
        <div className=" mb:flex-col flex text-aCaption uppercase mb:h-fit mb:gap-[1.25rem] h-[35%]   ">
          <div className=" w-[20%] mb:w-full  ">
            <div className=" font-[600] pb-2">thời gian</div>
            <div className="flex text-aCaption font-title2-caption" >
            <div className=" "> { format( parseISO(event.startDate),"EEEE-dd.MM.yyyy" ,{locale: vi})} </div> 
               
    
            </div>
                <div className="text-aCaption font-title2-caption">{`${event.startHour<10?`0${event.startHour}`:`${event.startHour}`}h${event.startMin<10?`0${event.startMin}`:`${event.startMin}`}`}</div> 
          </div>
          <div className=" w-[32%] mb:w-full  ">
          <div className=" font-[600] pb-2">Địa điểm</div>
          <div className=" mb:w-full  w-[90%]" > {event.address} </div>
          </div>
          <div className=" w-[24%] mb:w-full  ">
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
  
          <div className=" mb:pt-[1.25rem] w-[25%] mb:w-full  flex justify-end ">
              <button onClick={()=>handleEventCart(event)} className=" gap-2 border-[1px] text-aPara font-medium flex justify-center items-center h-[12vh] border-primaryBlack rounded-lg mb:w-full   uppercase w-[18vw] "> đăng ký tham dự  </button>
          </div>
  
        </div>
        </div>
         <div className=" mb:w-screen   h-[auto] w-[100%]  "> <img className=" mb:rounded-none rounded-[20px] mb:h-[32.188rem] object-cover w-[100%] h-[100vh] object-center " src={event.heroPic} alt="" /> </div>
         <div className=" mb:px-[20px] mt-[12vh] mb:py-0 mb:mt-[3.75rem]  h-[auto] py-[5%] mb:flex-col flex">
          <div className=" text-aCaption font-title2-caption mb:text-12px uppercase w-[40%] "> {`(Về sự kiện)`} </div>
          <div className="text-aPara gap-[5vh] flex flex-col mb:w-full mb:text-16px   font-p w-[60%]">
          <ReadQuillEditor full={true} className=" break-words w-full" value={event.discription}></ReadQuillEditor>
          
          </div>
         </div>
         <div className=" mb:px-[20px] mb:py-0 mb:pt-[3.75rem] pb-[20vh] h-[auto] mb:gap-[1.25rem] pt-[10vh] mb:pb-[6.25rem] mb:flex-col py-[5%] flex">
          <div className=" text-aCaption font-title2-caption mb:text-12px uppercase mb:w-full w-[40%] "> {`(với sự tham gia của)`} </div>
          <div className="text-aPara flex flex-col mb:gap-[0.313rem] gap-[3vh] mb:text-16px font-[500] mb:w-full  w-[60%]">
            {event.artist?.map((item,i)=>{
              return(
                <div key={i} className=" h-[7vh] mb:h-fit mb:pb-[0.313rem] mb:leading-[1] border-b-[1px] border-black  w-[100%]" >
                  {item}
              </div>
              )
            })}
            
          </div>
          
         </div>
        </div>
         
           
  
      </div>
     );
  }


}

export default EventDetail;