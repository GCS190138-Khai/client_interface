
import { format, parseISO } from "date-fns"
import React, { useEffect, useState } from "react"
import vi from 'date-fns/locale/vi'
 
import { useDispatch, useSelector } from "react-redux"
import { Link   } from "react-router-dom"
import {   getAllEvent, getEventById } from "../../api"
import _ from "lodash"
function NewEvent() {





const dispatch = useDispatch()

const openingList = useSelector((state)=>state.event.events.allEvent)

const rawList =openingList.filter(value=>value.eventStatus===1)
const list = _.orderBy(rawList,[item=>item.createdAt],['desc'])



const dateHours =(hours,min)=>{


  return `${hours<10?`0${hours}`:hours}h${min<10?`0${min}`:min}`


}

const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
  if(isLoading){
    (async () => {
      await     getAllEvent(dispatch)
     
      return setIsLoading(false)
    })();
  
  }
},[])
if(isLoading){
  return ( 
    <div>
      Loading...
    </div>
  )
}else{
  return ( 
  
  
    <div className=" h-auto w-[100%] mb:gap-[2.5rem] flex flex-col gap-[12vh]  ">
      {
        list?.map((item,i)=>{
    
          return (
               
              <div key={i} className=" w-[100%] focus:border-2 focus:border-red-800  relative  flex flex-col h-[50%] ">
            {/* <button className=" focus-within:absolute w-[5vh]  focus-within:w-[100%] focus-within:h-[50%] group focus-within:bg-red-600   h-[5vh] rounded-[50%] bg-black "></button> */}
           
            <Link key={i} onClick={()=>{ getEventById(dispatch,item._id)   }} state={{tab : "tất cả",event:item,}}  to={`/event/${item._id}`} >
            <div className=" w-[100%] mb:gap-[1.25rem] gap-[1.5vh]  flex flex-col h-[50%]  ">
           
           <div className=" " > <img className="  rounded-[1rem] w-[100%]   mb:h-[90vw] h-[65vh] object-center object-cover  " src={item.heroPic} alt="123" /> </div>
         <div className=" text-aPara mb:text-16px leading-[1] font-[500]"> {item.name} 
         
         <div className=" mt-1  uppercase  text-aCaption mb:text-12px font-title2-caption mb:flex-wrap flex gap-1">
            
             <div>{format( new Date( item.startDate),"EEEE - dd.MM.yyyy",{ locale: vi })},</div> 
          
             <div>{dateHours( item.startHour, new Date(item.startDate).getMinutes()+item.startMin)}</div> 
             <div>-{dateHours( item.startHour+parseInt(item.duration), new Date(item.startDate).getMinutes()+item.startMin)},</div> 
             <div className=" uppercase">{item.eventStatus===1?`mở bán vé`:item.eventStatus===0?`sắp diễn ra`:`close`},</div>
             <div className=" " >{item.ticketLimitationAtOnce===0?"miễn phí vào cổng ":`vé vào cổng`}</div>
           </div>
         </div>
         
         </div>
            </Link>
              </div>
          )
        })
      }
   
    <div className="spacer h-[5vh]" ></div>
    </div> );
}
}

export default NewEvent;