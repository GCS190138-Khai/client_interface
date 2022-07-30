

import React,{useRef,useEffect, useState}  from "react"


import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getAllComing, getAllEvent, getAllOpen, getOneMainEvent } from "../../api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);

function Section6() {
 


 const container = useRef(null)
 const container2 = useRef()


  const [tab,setTab]=useState(false)

  const [event,setEvent]=useState({title:`Ưu Đàm's Exhibition`,                             
})
const [isLoading, setIsLoading] = useState(true)



const [count, setCount] = useState({
  openingList : [],
 iscoming   : []
})

  const [pics,setPics]=useState(require('../../Asset/Mainpage/sct6.1.svg'))
  const list = useSelector((state)=>state.event.events.allEvent)

     useEffect(()=>{ 
      let abortController = new AbortController();  
      ScrollTrigger.batch(container.current,{
        start:"30% center",
        end:"+=350",
       
        onEnter:()=>{
          gsap.to(container.current,{duration:1,borderRadius:"0",opacity:"1",ease:"Power4.easeOut"})
          gsap.to(container2.current,{duration:1.5,width:"95%",height:"68%",opacity:"1",ease:"Power4.easeOut"})
        },
        onLeave:()=>{
          gsap.to(container.current,{duration:1,borderRadius:"40rem",opacity:"0",ease:"Power4.easeOut"})
          gsap.to(container2.current,{duration:1.5,width:"50%",height:"60%",opacity:"0.6",ease:"Power4.easeOut"})
        },
        onLeaveBack:()=>{
        
          gsap.to(container.current,{duration:1,borderRadius:"40rem",opacity:"0",ease:"Power4.easeOut"})
          gsap.to(container2.current,{duration:1.5,width:"50%",height:"60%",opacity:"0.6",ease:"Power4.easeOut"})
        },
        onEnterBack:()=>{
         
          gsap.to(container.current,{duration:1,borderRadius:"0",opacity:"1",ease:"Power4.easeOut"})
          gsap.to(container2.current,{duration:1.5,width:"95%",height:"68%",opacity:"1",ease:"Power4.easeOut"})
        }
            })
  
  return ()=>{
    abortController.abort()
   
  }
  },[])
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
      <div className=" text-[#1B1D21]  h-[180vh] flex items-center bg-[#F7F3EE] w-screen" >
         <div ref={container} className=" px-[2%] opacity-0 justify-center flex-col items-center flex h-[80%] w-screen rounded-[40rem] bg-[#ffdd00] ">
           <div className=" flex items-center w-full ">
           <div className=" w-[30vw] font-[500] text-aCaption ">{`(SỰ KIỆN VÀ HOẠT ĐỘNG)`}</div>
           <div className=" w-[37vw] flex justify-between ">
  
             <button onClick={()=>{
               setTab(false)
               setPics(require('../../Asset/Mainpage/sct6.1.svg'))
             }} className="w-[15vw]   flex gap-2">
               <div  className={!tab?"    text-aSubtitle font-[500]":" opacity-40 text-[2.0835vw] font-[400] "}>
               Mở Bán Vé
               <div className=" border-[#1B1D21] border-b translate-y-[-0.2vw] "></div>
               </div>
               <span>{count.openingList.length?`0${count.openingList.length}`:count.openingList.length}</span>
             </button>
             <button onClick={()=>{
               setTab(true)
               setPics(require('../../Asset/Mainpage/hinh2.svg'))
             }} className={tab?"w-[15vw] flex justify-end gap-2":" opacity-40 w-[15vw] flex justify-end gap-2"}>
               <div className="  text-aSubtitle font-[500]">
               Sắp Diễn Ra
                <div className=" border-[#1B1D21] border-b translate-y-[-0.2vw] " ></div>
               </div>
               <span>{count.iscoming.length?`0${count.iscoming.length}`:count.iscoming.length}</span>
             </button>
           </div>
           </div>
           <div className=" relative opacity-60 mt-[4vw] h-[60%] w-[50%] flex justify-center items-center  rounded-[40rem]"  ref={container2}>
           {!tab ?
           
           <div className=" group h-[100%] w-[100%] flex justify-center items-center  rounded-[40rem]">
           <img className=" object-cover h-[100%] w-[100%] rounded-[40rem]" src={count.openingList.length===0? "https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png":count.openingList[0]?.heroPic} alt="1234" />
           <div className=" text-[#ffdd00] flex-col hidden group-hover:flex justify-center items-center rounded-[40rem]  h-[100%] w-[100%] absolute ">
               <div className=" absolute rounded-[40rem]  bg-[#000000]  opacity-50 h-[100%] w-[100%] "></div>
                 <div className=" z-20 font-[600]  text-aTitle1">{count.openingList.length===0?"Chưa có sự kiện nào":count.openingList[0]?.name}</div>
                 
                 <button className=" z-20 flex gap-4"><img className=" translate-y-[-0.4vw] rounded-none object-cover h-[1.5vw] w-[1.5vw]" src={require('../../Asset/Mainpage/yellowArrow.svg').default} alt="error" /> <Link to={"/event/newEvent"}><span className="  font-bold text-[1.1722vw] underline underline-offset-1" >XEM TẤT CẢ</span></Link> </button>
                 </div>
           </div>:
           
           <div  className=" h-[100%] w-[100%] group flex justify-center items-center  rounded-[40rem]">
           <img className=" object-cover h-[100%] w-[100%] rounded-[40rem]" src={count.iscoming.length===0? "https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png":count.openingList[0]?.heroPic} alt="1234" />
             <div className=" text-[#ffdd00] flex-col hidden group-hover:flex justify-center items-center rounded-[40rem]  h-[100%] w-[100%] absolute ">
               <div className=" absolute rounded-[40rem]  bg-[#000000]  opacity-50 h-[100%] w-[100%] "></div>
                 <div className=" z-20 font-[00] text-aTitle1">{count.iscoming.length===0?"Chưa có sự kiện nào":count.iscoming[0]?.name}</div>
                 
                 <button className=" z-20 flex gap-4"><img className=" translate-y-[-0.4vw] rounded-none object-cover h-[1.5vw] w-[1.5vw]" src={require('../../Asset/Mainpage/yellowArrow.svg').default} alt="error" /> <Link to={"/event/iscoming"} ><span className="  font-bold text-[1.1722vw] underline underline-offset-1" >XEM TẤT CẢ</span></Link> </button>
                 </div>
           </div>
           }
  
           </div>
         </div>        
      </div>
    );
  }

  
  

export default Section6;
