import { gsap } from "gsap";
import React,{useRef,useEffect}  from "react"
import { primaryBGBlack} from "../../redux/navSlice";
import { useSelector ,useDispatch } from 'react-redux';

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Nabar from "../../Nabar";


function Project1() {
  const itemList = useSelector((state)=>state.project.Projects.allProjects)
const dispatch = useDispatch()


const bgColor = 'primaryBlack'
const textColor ='#FFFFFF'
 const  container = useRef(null)
 const pin = useRef(null)
 const Navigate =useNavigate()

 const id = useParams()
const i = parseInt(id.id) 

const [item,setItem] = useState(itemList[i])
// const [item,setItem] = useState([])
 


  
useEffect(()=>{

  window.scrollTo({  top: 0})

},[])



useEffect(()=>{
   
  let abortController = new AbortController();  
 
  gsap.to(container.current,{ scrollTo:{
    x:1500,
  },ease:"none",
  duration:6,
  scrollTrigger:{
    trigger: container.current ,
    pin:pin.current,
    start:"top top",
    end:"+=1500",
    scrub:true,
   
  }
   })
   dispatch(primaryBGBlack())
   return ()=>{
    abortController.abort()
   }

},[])
const handlePre=()=>{
  if(i===0||i<=0){
    return
  }
  Navigate(`/project/${i-1}`)
  setItem(itemList[i-1])
}
const handleNext=()=>{
  if(i===itemList.length-1|| i>=itemList.length-1){
    return
  }
  Navigate(`/project/${i+1}`)
  setItem(itemList[i+1])
}


    return (  
        <div  className={` w-screen text-[${textColor}]  h-[auto] `} >
          <Nabar></Nabar>
           <img className=" -z-10 w-[100vw] h-[100vh] object-cover object-center  fixed" src={item?.picHero} alt="heropic" />
       
          <div className={` pb-[150px]    bg-${bgColor} z-10 w-screen items-center justify-center min-h-screen flex px-[2%]`}>
              <div className=" text-aSubtitle font-title-Subtitle flex items-center   justify-start h-screen w-[18%]">
                <span className=" mt-[25vh] ">{item?.year}</span> 
              </div>

              <div className="flex gap-[200px] pt-[10vh]  flex-col min-h-[80vh] w-[82%] " >
                  <div className="upper gap-[152px] uppercase flex ">
                      <div className=" w-[253px]">
                        <div className=" text-aCaption font-[600] pb-[1rem] " >hạng mục</div>
                        { item?.type.map( (item,index)=>{
                          return (
                            <div key={index} className="normal-case text-aCaption font-title2-caption">{item}</div>
                          )
                        })}
                      </div>
                      {item.cooperation?<div className=" w-[253px]">
                        <div className=" text-aCaption font-[600] pb-[1rem]">đơn vị hợp tác</div>
                         
                        
                              <div key={i} className=" normal-case text-aCaption font-title2-caption" >{item.cooperation}</div>
                         
                       
                      </div>:""}
                      {/*  sponser */}
                      {item.sponsers?<div className=" w-[253px] ">
                        <div className=" text-aCaption font-[600] pb-[1rem]"> nhà tài trợ</div>
                         
                        
                              <div key={i} className="normal-case text-aCaption font-title2-caption" >{item.sponsers}</div>
                         
                       
                      </div>:""}
                      <div>
                        {/*  */}
                      </div>
                  </div>
                  <div className=" min-h-[80%]  leading-[1.3]  capitalize text-[64px] font-title-Subtitle lower w-[78.8vw]  ">
                    <div>{item?.title}</div>
                  </div>
              </div>
        </div>
        <div className="  h-screen w-screen  ">
         
        </div>
        <div className={`  bg-${bgColor} h-auto w-screen `}>
        <div className=" h-fit pb-[150px] pt-[150px]  w-screen">
        <div>
        <div  className={`h-fit px-[2%] bg-${bgColor} justify-center items-start   w-screen flex flex-col`}>
      <div className='   w-[85vw] text-[48px] font-[500] '>
        <span className=' pr-[7vw] uppercase text-aCaption font-title2-caption '>{`(về dự án)`}</span>{item?.about}
      </div>
       
      
    </div>
  </div>  
        </div>
        <div className="h-[fit] px-[2%] pb-[150px]    w-screen flex flex-col">
        <div className=' flex   w-[100%] font-semibold   '>
        <span className=' w-[34.5%]  font-normal text-aCaption uppercase '>{`(chi tiết)`}</span>
        <div className='flex gap-[12vw]  w-[64.5%]'>
          <div className=' capitalize  w-[8vw] text-aSubtitle '>
     
          </div>
          <div className=' text-aPara font-p gap-[30px] flex flex-col items-end w-[524px]  '>

           { item?.details.map((item,i)=>{
            return (
              <div key={i} className='' >
              {item}
            </div>
            )})}

          </div>
        </div>
      </div>
        </div>
        <div ref={pin}   className="   w-screen h-[100vh] ">
        <div ref={container} className=" overflow-x-scroll wrapper flex flex-nowrap  ">
          {  item.pics.map((item,index)=>{
            return(
              <section key={index} className=" flex-shrink-0 w-[30vw] flex justify-center items-center h-[100vh] ">
                <img className=" rounded-2xl w-[28vw] h-[80vh] object-cover object-center " src={item} alt={index+1} />
              </section>
            )
          })}

        </div>
        </div>
        {item.story.title?<div className="min-h-[100vh] px-[2%] pt-[70px]  pb-[150px]  w-screen flex flex-col">
      <div className=' flex   w-[100%] font-semibold   '>
        <span className=' w-[17.2vw]  font-normal text-aCaption'>{}</span>
        <div className='flex gap-[160px]  w-[78%]'>
          <div className=' capitalize font-[500]  w-[400px] text-aSubtitle '>
          {item.story.title}
          </div>
          <div className='gap-[30px]  text-aPara font-p flex flex-col items-end w-[524px]  '>

           { item?.story.para.map((item,i)=>{
            return (
              <div key={i} className='' >
              {item}
            </div>
            )})}

          </div>
        </div>
      </div>
        </div>:""}
        {/* hero2  */}
        {item.picHero2.length!==0?<div className="min-h-[100vh]  pb-[150px] px-[2%] gap-[30px]   w-screen flex flex-col">
          <div className=" flex gap-[30px]">
            <div> <img className="object-cover object-center h-[1000px] w-[48vw] rounded-[50px]  " src={item.picHero2[0]} alt="" /> </div>
            <div> <img className="object-cover object-center h-[1000px] w-[48vw] rounded-[50px]  " src={item.picHero2[1]} alt="" /> </div>
          </div>
            <div>
            <img className="object-cover object-center h-[1000px] w-[96vw] rounded-[50px]  " src={item.picHero2[2]} alt="" />
            </div>
        </div>:""}
        {/*  */}
        {item.goal1.title?<div className=" goal1 min-h-[100vh] px-[2%] pb-[150px]   w-screen flex flex-col">
      <div className=' flex   w-[100%] font-semibold   '>
        <span className=' w-[17.2vw]  font-normal text-aCaption'>{}</span>
        <div className='flex gap-[160px]  w-[78%]'>
          <div className=' capitalize font-[500]  w-[400px] text-aSubtitle '>
          {item.goal1.title}
          </div>
          <div className=' gap-[30px] text-aPara font-p flex flex-col items-end w-[524px]  '>

           { item?.goal1.para.map((item,i)=>{
            return (
              <div key={i} className='' >
              {item}
            </div>
            )})}

          </div>
        </div>
      </div>
        </div>:""}
        {/*  */}
        {item.picHero3?<div className="hero3 min-h-[100vh] pb-[150px] px-[2%] gap-[30px]   w-screen flex flex-col">
       
            <div>
            <img className=" object-cover object-center h-[1000px] w-[96vw] rounded-[50px]  " src={item.picHero3} alt="" />
            </div>
        </div>:""}
        {/*  */}
        {item.goal2.title?<div className="min-h-[fit] px-[2%] pb-[150px]   w-screen flex flex-col">
      <div className=' flex   w-[100%] font-semibold   '>
        <span className=' w-[17.2vw]  font-normal text-aCaption'>{}</span>
        <div className='flex gap-[160px]  w-[78%]'>
          <div className=' capitalize font-[500]  w-[400px] text-aSubtitle '>
          {item.goal2.title}
          </div>
          {item.goal2?<div className=' gap-[30px]  text-aPara font-p flex flex-col items-end w-[524px]  '>

           { item?.goal2.para.map((item,i)=>{
            return (
              <div key={i} className='' >
              {item}
            </div>
            )})}

          </div>:""}
        </div>
      </div>
        </div>:""}
        {item.awards.length!==0?<div className="min-h-[fit] px-[2%] pb-[150px]    w-screen flex flex-col">
      <div className=' flex   w-[100%] font-semibold   '>
        <span className=' w-[17.2vw] uppercase  font-normal text-aCaption'>{`(xem thêm)`}</span>
        <div className='flex gap-[160px]  w-[78%]'>
          <div className=' capitalize gap-[15px] flex flex-col font-[300] text-aPara '>
          {item.awards.map((i)=>{
            return(
             
              <div onClick={()=> window.open(i.link, '_blank')}  className=" cursor-pointer flex items-center gap-[10px] ">
               <div className="  border-b leading-[1] border-primary">{i.title}</div>  <img className=" w-[17px] object-cover object-center h-[14.5px] " src={"https://live.staticflickr.com/65535/52253609325_f4291fae6b_o.png"} alt="" />
              </div>
           
            )
          })}
          </div>
        
        </div>
      </div>
        </div>:""}

        
          <div>
            
            </div>   
            <div className=" w-screen flex justify-center ">
            <div className=" self-center w-[96vw] border-t border-b border-primary ">

        <div className=" text-[14px] font-[400]  h-[42vh] relative justify-center items-center w-screen flex px-[2%] ">
       
           <div className=" peer  group w-[50%]   justify-end items-center gap-[5vw] flex">
           <div className=" w-[40vw] flex justify-start items-center ">

          <img onClick={()=>{handlePre()
          gsap.to(window,{scrollTo:{y:0,duration:1}})
          }} className=" cursor-pointer absolute  " src={require('./arrow.png')} alt="123" />

            </div>
              <div className=" absolute opacity-0 group-hover:opacity-100 flex justify-center translate-x-[5vw] w-[10vw] uppercase"> previous </div>
           </div>
           <div className=" peer group   w-[50%] flex items-center gap-[5vw]">
           <div className=" absolute uppercase  opacity-0 group-hover:opacity-100 flex justify-center  translate-x-[-5vw] w-[10vw]  "> next </div>
           <div className=" w-[40vw] flex justify-end items-center ">

           <img onClick={()=>{handleNext()
          gsap.to(window,{scrollTo:{y:0,duration:1}})}} className=" cursor-pointer  absolute rotate-[180deg] " src={require('./arrow.png')} alt="123" />
           </div>
           </div>
           <div className=" opacity-50 absolute peer-hover:opacity-0 uppercase flex justify-center w-[6vw]">{ `(next up)` }</div>
        </div>
            </div>
              </div> 
  
        </div>
      </div>
    );
  }
  
  export default Project1;
  