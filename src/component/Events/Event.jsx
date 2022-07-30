
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvent  } from "../../api";
import {   Outlet   ,NavLink,   } from "react-router-dom";
 import './arrow.scss'
import { primaryBG } from "../../redux/navSlice";
import { useState } from "react";

function Sct1() {

const container = useRef(null)
const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [count, setCount] = useState({
     openingList : [],
    iscoming   : []
  })
  const list = useSelector((state)=>state.event.events.allEvent)
 
  const handleCount = () =>{
    setCount({
      openingList : list.filter(value=>value.eventStatus===1),
      iscoming   : list.filter(value=>value.eventStatus===0)
    })

  }
  useEffect(()=>{
    dispatch(primaryBG())
    window.scrollTo({  top: 0})
  
 },[])
useEffect(()=>{
  dispatch(primaryBG())
  let arbort = new AbortController();
  if(isLoading){

    (async () => {
      await    getAllEvent(dispatch) 
     
      return setLoading(false)
       
     
    })();
  }else{

    handleCount()
  }
  return ()=>{
    arbort.abort()
   }
},[isLoading,list])


const sideBar = [{
  title:"tất cả",
  number:list.length,
  link:'/event',
  
},
{
  title:"mở bán vé",
  number:count.openingList.length,
  link:'/event/newEvent'
},
{
  title:"sắp diễn Ra",
  number:count.iscoming.length,
  link:'/event/iscoming'
}
]

if(isLoading){
return (
  <div className="">
    ...Loading
  </div>
)
}else{
  return (
      <div className=" bg-primary flex w-screen min-h-screen pb-[10vh] px-[2%] pt-[16vh] " >
       

        <div className=" h-[82vh] sticky top-[16vh] justify-between  w-[40%] flex flex-col">
   
          <div>
        {
          sideBar.map((item,i)=>{
            return(
              
              <NavLink key={i} state={{ tab:item.title }} className={nav=>nav.isActive?"opacity-100 arrow ":"opacity-50"} end={i===0?true:false}    to={item.link} >
              <div    className="  cursor-pointer text-aSubtitle font-title-Subtitle capitalize flex items-start gap-1 ">
                {item.title} <span className=" text-aCaption font-title2-caption " >{item.number<10 ? `0${item.number}`:`${item.number}`} </span>
              </div>
           
              </NavLink>
            )
          })
        }
          </div>
        <div className=" capitalize text-aTitle1 font-[600]"> sự kiện </div>
        </div>
        <div ref={container} className="sticky top-0 w-[60%]">
        <div className=" flex  gap-1 h-[5vh] w-[100%] uppercase text-aCaption font-title2-caption ">
        {`(lăn chuột)`}  <span> <img src={require("./sct1.png")} alt="error" /></span>
        </div>
        <Outlet></Outlet>
        </div>
      
      </div>
   );
}
}

export default Sct1;