
import { format } from "date-fns"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link,   } from "react-router-dom"
import { getAllEvent, getEventById } from "../../api"
import vi from 'date-fns/locale/vi'
import { useState } from "react"
import _ from "lodash"

function AllEvents() {




const dispatch = useDispatch()

const rawList = useSelector((state)=>state.event.events.allEvent)


const [isLoading, setIsLoading] = useState(true)
const [list, setlist] = useState([])
useEffect(()=>{
  if(isLoading){
    (async () => {
      await     getAllEvent(dispatch)
      const newList  = _.orderBy(rawList,[item=>item.createdAt],['desc'])
      setlist(newList)
      return setIsLoading(false)
    })();
  
  }
},[])

   
const dateHours =(hours,min)=>{


     return `${hours<10?`0${hours}`:hours}h${min<10?`0${min}`:min}`


}
if(isLoading){
  return(
    <div>
      Loading.....
    </div>
  )
}else{

  return ( 
  
  
  <div className=" h-auto w-[100%] flex flex-col mb:gap-[2.5rem] gap-[12vh]  ">
    {
      list.map((item,i)=>{
  
        return (
             
            <div key={i} className=" w-[100%] focus:border-2 focus:border-red-800  relative  flex flex-col h-[50%] ">
          {/* <button className=" focus-within:absolute w-[5vh]  focus-within:w-[100%] focus-within:h-[50%] group focus-within:bg-red-600   h-[5vh] rounded-[50%] bg-black "></button> */}
         
          <Link key={i} onClick={()=>{ getEventById(dispatch,item._id)   }} state={{tab : "tất cả",event:item,}}  to={`${item._id}`} >
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

export default AllEvents;