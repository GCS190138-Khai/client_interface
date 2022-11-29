

import React,{useRef,useEffect, useState}  from "react"


import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getAllComing, getAllEvent, getAllOpen, getOneMainEvent } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './click.css'
import { primaryBG } from "../../redux/navSlice";

gsap.registerPlugin(ScrollTrigger);

function Section6() {
 


 const container = useRef(null)
 const container2 = useRef()


  const [tab,setTab]=useState(false)
const dispatch = useDispatch()
  const [event,setEvent]=useState({title:`Ưu Đàm's Exhibition`,                             
})
const [isLoading, setIsLoading] = useState(true)



const [count, setCount] = useState({
  openingList : [],
 iscoming   : []
})


  const list = useSelector((state)=>state.event.events.allEvent)

     useEffect(()=>{ 
      let abortController = new AbortController();  
      ScrollTrigger.batch(container.current,{
        start:"-5% center",
        end:" +=500 ",
      
       
        onEnter:()=>{
          gsap.to(container.current,{duration:1,borderRadius:"0",opacity:"1",ease:"Power4.easeOut"})
          gsap.to(container2.current,{duration:1.5,width:"95%",height:"68%",opacity:"1",ease:"Power4.easeOut"})
          dispatch(primaryBG())
        },

 
  
            })
  
  return ()=>{
    abortController.abort()
   
  }
  })
  useEffect(()=>{

      handleCount()
 
  
  },[])
  const handleCount = () =>{
    setCount({
      openingList : list.filter(value=>value.eventStatus===1),
      iscoming   : list.filter(value=>value.eventStatus===0)

    })

  }



    return (  
      <>
      {/* <div className='spacer bg-[#F7F3EE] w-screen h-[200px]'></div> */}
      <div className=" text-[#1B1D21] mb:h-[900px]  h-[1100px] flex items-center bg-[#F7F3EE] w-screen" >
         <div ref={container} className=" px-[2%] opacity-0 justify-center flex-col items-center flex h-[100%] w-screen rounded-[40rem] bg-[#ffdd00] ">
           <div className=" mb:gap-[20px] flex mb:flex-col  items-center w-full ">
           <div className=" mb:w-fit mb:text-12px w-[30vw] font-[500] text-aCaption ">{`(SỰ KIỆN VÀ HOẠT ĐỘNG)`}</div>
           <div className=" mb:gap-[5px] mb:w-full mb:items-center w-[37vw] mb:flex-col flex justify-between ">
  
             <button onClick={()=>{
               setTab(false)
            
             }} className="w-[15vw] mb:w-fit mb:text-28px  flex gap-2">
               <div  className={!tab?" border-b border-primaryBlack leading-[1]  mb:text-28px   text-aSubtitle font-[500]":"leading-[1]  mb:text-28px  opacity-40 text-[2.0835vw] font-[400] "}>
               Mở Bán Vé
       
               </div>
               <span className=" mb:text-12px">{count.openingList.length?`0${count.openingList.length}`:count.openingList.length}</span>
             </button>
             <button onClick={()=>{
               setTab(true)
             
             }} className="w-[15vw] mb:w-fit mb:text-28px    flex gap-2">
               <div className={tab?" border-b border-primaryBlack leading-[1]  mb:text-28px    text-aSubtitle font-[500]":"leading-[1]  mb:text-28px  opacity-40 text-[2.0835vw] font-[400] "}>
               Sắp Diễn Ra
               
               </div>
               <span className=" mb:text-12px">{count.iscoming.length?`0${count.iscoming.length}`:count.iscoming.length}</span>
             </button>
           </div>
           </div>
           <div className=" relative opacity-60 mt-[4vw] mb:h-[80%] h-[60%] w-[50%] flex justify-center items-center  rounded-[40rem]"  ref={container2}>
           {!tab ?
           <Link to={'/event/newEvent'} className="click relative group mb:h-[90%] h-[100%] w-[100%] flex justify-center items-center  rounded-[40rem]">
         
           <img  className=" object-cover h-[100%] w-[100%] rounded-[40rem]" src={count.openingList.length===0? "https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png":count.openingList[count.openingList.length-1]?.heroPic} alt="1234" />
           <div className=" text-[#ffdd00] flex-col hidden group-hover:flex justify-center items-center rounded-[40rem]  h-[100%] w-[100%] absolute ">
               <div className=" absolute rounded-[40rem]  bg-[#000000]  opacity-50 h-[100%] w-[100%] "></div>
                 <div className=" z-20 font-[500] w-[90%] text-center  text-aTitle1">{count.openingList.length===0?"Coming soon 1!":""}</div>
                 
                
                 </div>
         
           </Link>
           :
           <Link to={'/event/iscoming'}   className="click relative group mb:h-[90%] h-[100%] w-[100%] flex justify-center items-center  rounded-[40rem]">
            
           <img className=" object-cover h-[100%] w-[100%] rounded-[40rem]" src={count.iscoming.length===0? "https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png":count.iscoming[count.iscoming.length-1]?.heroPic} alt="1234" />
             <div className=" text-[#ffdd00] flex-col hidden group-hover:flex justify-center items-center rounded-[40rem]  h-[100%] w-[100%] absolute ">
               <div className=" absolute rounded-[40rem]  bg-[#000000]  opacity-50 h-[100%] w-[100%] "></div>
                 <div className=" z-20 font-[500] text-aTitle1">{count.iscoming.length===0?"Coming soon !":""}</div>
                 
|
                 </div>
         
           </Link>
           }
  
           </div>
         </div>        
      </div>
      </>
    );
  }

  
  

export default Section6;
