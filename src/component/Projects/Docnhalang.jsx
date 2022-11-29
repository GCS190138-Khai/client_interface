import { gsap } from "gsap";
import React,{useRef,useEffect}  from "react"
import { primaryBGBlack} from "../../redux/navSlice";
import { useSelector ,useDispatch } from 'react-redux';

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Nabar from "../../Nabar";
import arrow from './arrow.svg'
import { useWindowWidth } from "@react-hook/window-size";
import Footer from "../../footer";
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

 
 const w = useWindowWidth()

  
useEffect(()=>{

  window.scrollTo({  top: 0})
  
},[])

dispatch(primaryBGBlack())

useEffect(()=>{
   
  let abortController = new AbortController();  
  if(w>1024){

    gsap.to(container.current,{ scrollTo:{
      x:1600,
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
  }else{
    gsap.to(container.current,{ scrollTo:{
      x:1200,
    },ease:"none",
    duration:6,
    scrollTrigger:{
      trigger: container.current ,
      pin:pin.current,
      start:"top 30%",
      end:"+=1000",
      scrub:true,
   
     
    }
     })
  }
   dispatch(primaryBGBlack())
   return ()=>{
    abortController.abort()
   }

},[w])
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

if(w<1024){
  // mobile
  return (  
    <>
   
    <div  className={` w-screen text-[${textColor}]  h-[auto] `} >
      <Nabar></Nabar>
       <img className=" -z-10 w-[100vw] h-[100vh] object-cover object-center  fixed" src={item?.picHero} alt="heropic" />
       
      <div className={`    bg-${bgColor} z-10 w-screen items-end justify-center h-[fit] pt-[4.375rem] flex px-[20px] `}>
          {/* <div className=" text-aSubtitle font-title-Subtitle flex items-center   justify-start h-screen w-[18%]">
          
          </div> */}
       
          <div className="flex gap-[5rem]  items-end  flex-col h-fit pb-[3.75rem] w-full " >
              <div className={item.sponsers?"upper  border-white w-full uppercase gap-5 flex flex-wrap  ":"upper  border-white w-full uppercase gap-5 flex  "}>
                  <div className="  border-white w-fit">
                    <div className=" text-12px font-[600] w-fit pb-[1rem] " >hạng mục</div>
                    { item?.type.map( (item,index)=>{
                      return (
                        <div key={index} className="normal-case text-12px font-title2-caption">{item}</div>
                      )
                    })}
                  </div>
                  {item.cooperation?<div className=" w-[6.875rem]">
                    <div className=" text-12px font-[600] w-fit pb-[1rem]">đơn vị hợp tác</div>
                     
                    
                          <div key={i} className=" normal-case text-12px font-title2-caption" >{item.cooperation}</div>
                     
                   
                  </div>:""}
                  {/*  sponser */}
                  {item.sponsers?<div className=" w-fit ">
                    <div className=" text-12px font-[600] w-fit pb-[1rem]"> nhà tài trợ</div>
                     
                    
                          <div key={i} className="normal-case text-12px font-title2-caption" >{item.sponsers}</div>
                     
                   
                  </div>:""}
                  <div>
                    {/*  */}
                  </div>
              </div>
              <div className="  leading-[1.3] flex flex-col gap-[1.25rem]  capitalize text-28px font-title-Subtitle lower w-full  ">
              <span className=" text-28px ">{item?.year}</span> 
                <div>{item?.title}</div>
              </div>
          </div>
    </div>
    <div className="  h-[70vh] w-screen  ">
     
    </div>
    <div className={`  bg-${bgColor} h-auto w-screen `}>
    <div className=" h-fit pb-[3.75rem] pt-[3.75rem]  w-screen">
    <div>
    <div  className={`h-fit px-[20px] bg-${bgColor} justify-center items-start   w-screen flex flex-col`}>
  <div className=' w-full flex justify-between text-16px font-[500] '>
    <span className=' w-fit uppercase text-12px font-title2-caption '>{`(về dự án)`}</span>
    <div className=" w-[15.313rem]">  {item?.about}</div>
  
  </div>
   
  
</div>
</div>  
    </div>
    <div className="h-[fit] px-[20px] pb-[3.75rem]    w-screen flex flex-col">
    <div className='  justify-between flex   w-[100%] font-semibold   '>
    <span className=' w-fit  font-normal text-12px uppercase opacity-0 '>{`(chi tiết)`}</span>
    <div className='flex gap-[12vw]   w-[15.313rem]'>
   
      <div className=' text-16px font-p gap-[30px] flex flex-col items-end w-[15.313rem]  '>

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
    <div ref={pin}   className="   w-screen h-[fit] ">
    <div ref={container} className=" overflow-x-scroll wrapper flex flex-nowrap  ">
      {  item.pics.map((item,index)=>{
        return(
          <section key={index} className=" flex-shrink-0 w-[13rem] flex justify-center items-center h-[fit] ">
            <img className=" rounded-2xl w-[12.5rem] h-[22.813rem] object-cover object-center " src={item} alt={index+1} />
          </section>
        )
      })}

    </div>
    </div>
    {item.story.title?<div className="min-h-[fit] px-[20px] pt-[2.188rem]  pb-[3.75rem]  w-screen flex flex-col">
  <div className=' flex   w-[100%] font-semibold   '>
   
    <div className='flex flex-col gap-[1.25rem] w-full'>
      <div className=' capitalize font-[500] text-28px '>
      {item.story.title}
      </div>
      <div className='gap-[0.625rem] text-16px font-p flex flex-col items-end   '>

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
    {item.picHero2.length!==0?<div className="min-h-[100vh]  pb-[3.75rem] px-[20px] gap-[1.25rem]  w-screen flex flex-col">
      <div className=" flex flex-col gap-[1.25rem]">
        <div> <img className="object-cover object-center h-[21rem] w-full rounded-[10px]  " src={item.picHero2[0]} alt="" /> </div>
        <div> <img className="object-cover object-center  h-[21rem]  w-full rounded-[10px]  " src={item.picHero2[1]} alt="" /> </div>
      </div>
        <div>
        <img className="object-cover object-center  h-[21rem]  w-full rounded-[10px]  " src={item.picHero2[2]} alt="" />
        </div>
    </div>:""}
    {/*  */}
    {item.goal1.title?<div className=" goal1 min-h-[fit] px-[20px] pb-[3.75rem]  w-screen flex flex-col">
  <div className=' flex   w-[100%] font-semibold   '>

    <div className='flex gap-[1.25rem] w-full flex-col'>
      <div className=' capitalize font-[500] text-28px '>
      {item.goal1.title}
      </div>
      <div className=' gap-[1.25rem] text-16px font-p flex flex-col items-end   '>

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
    {item.picHero3?<div className="hero3 min-h-[100vh] pb-[3.75rem] px-[20px] gap-[1.25rem]   w-screen flex flex-col">
   
        <div>
        <img className=" object-cover object-center h-[41.875rem] w-full rounded-[10px]  " src={item.picHero3} alt="" />
        </div>
    </div>:""}
    {/*  */}
    {item.goal2.title?<div className="min-h-[fit] px-[20px] pb-[3.75rem]   w-screen flex flex-col">
  <div className=' flex   w-[100%] font-semibold   '>
  
    <div className='flex gap-[1.25rem] flex-col w-full'>
      <div className=' capitalize font-[500] text-28px '>
      {item.goal2.title}
      </div>
      {item.goal2?<div className=' gap-[1.25rem] text-16px font-p flex flex-col items-end   '>

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
    {item.awards.length!==0?<div className="min-h-[fit] px-[20px] pb-[3.75rem]     w-screen flex flex-col">
  <div className=' flex flex-col   w-[100%] font-semibold   '>
    <span className=' w-fit uppercase  font-normal text-12px'>{`(xem thêm)`}</span>
    <div className='flex gap-[1.25rem] w-full'>
      <div className=' capitalize gap-[15px] flex flex-col font-[300] text-16px'>
      {item.awards.map((i)=>{
        return(
         
          <div onClick={()=> window.open(i.link, '_blank')}  className=" cursor-pointer flex items-center gap-[10px] ">
           <div className="  border-b leading-[1] border-primary">{i.title}</div>  <img className=" w-[14.5px] object-fill object-center h-[14.5px] " src={"https://live.staticflickr.com/65535/52253609325_f4291fae6b_o.png"} alt="" />
          </div>
       
        )
      })}
      </div>
    
    </div>
  </div>
    </div>:""}

    
      <div>
        
        </div>   
        <div className=" w-screen px-[20px]  flex justify-center ">
        <div className=" self-center  w-full border-t border-b border-primary ">

    <div className=" text-[14px] font-[400] justify-between  h-[6.25rem]  items-center w-full flex  ">
      <div onClick={()=>{
        handlePre()
        gsap.to(window,{scrollTo:{y:0,duration:1}})
      }} className=" w-[7.5rem] gap-1 flex flex-col">
        <img className="w-[5.75rem] object-cover rotate-180 h-[2.5rem]" src={arrow} alt="" />
       <div className=" text-12px font-400 text-[#F7F3EE]">{`(DỰ ÁN TRƯỚC ĐÓ)`}</div> 
      </div>
      <div onClick={()=>{
      handleNext()
      gsap.to(window,{scrollTo:{y:0,duration:1}})
      }} className=" w-[7.5rem] gap-1 items-end   flex flex-col">
      <img className=" w-[5.75rem] object-cover h-[2.5rem] " src={arrow} alt="" />
      <div  className= "text-12px font-400 text-[#F7F3EE]">{`(DỰ TIẾP THEO)`}</div>
      </div>

       
    </div>
        </div>
          </div> 

    </div>
  </div>
  <Footer></Footer>
  </>
);
}else{

  return (  
    <>
      <div  className={` w-screen text-[${textColor}]  h-[auto] `} >
        <Nabar></Nabar>
         <img className=" -z-10 w-[100vw] h-[100vh] object-cover object-center  fixed" src={item?.picHero} alt="heropic" />
     
        <div className={` pb-[150px]    bg-${bgColor} z-10 w-screen items-center justify-center min-h-screen flex mb:px-[20px] px-[2%]`}>
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
      {item.story.title?<div className="min-h-[fit] px-[2%] pt-[70px]  pb-[150px]  w-screen flex flex-col">
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
      {item.goal1.title?<div className=" goal1 min-h-[fit] px-[2%] pb-[150px]   w-screen flex flex-col">
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
             <div className="  border-b leading-[1] border-primary">{i.title}</div>  <img className=" w-[14.5px] object-fill object-center h-[14.5px] " src={"https://live.staticflickr.com/65535/52253609325_f4291fae6b_o.png"} alt="" />
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
    <Footer></Footer>
    </>
  );
}
  }
  
  export default Project1;
  