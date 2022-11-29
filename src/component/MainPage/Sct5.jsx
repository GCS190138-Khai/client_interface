

import React,{useRef,useEffect}  from "react"

import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useDispatch } from "react-redux"
import { primaryBG, primaryBGBlack } from "../../redux/navSlice"
import { Link } from "react-router-dom"
import { getAllProject } from "../../api"



gsap.registerPlugin(ScrollTrigger)

function Section5() {
  const dispatch= useDispatch()
    const Sct5 = useRef(null)
    const pinned= useRef(null)
    const container =useRef(null)
    const ani1 = useRef(null)
    const ani2 = useRef(null)
    const ani3 = useRef(null)
    const cont1 = useRef(null)
    const cont2 = useRef(null)
    const cont3 = useRef(null)
    useEffect(()=>{
      dispatch(primaryBG())
      let abortController = new AbortController();  
      
      getAllProject(dispatch,15)
      
      return () => {
        abortController.abort()
      };
    },[])
    useEffect(()=>{
      ScrollTrigger.matchMedia({
        "(min-width: 320px) and (max-width: 1024px)": ()=> {
       
          const tl1 = gsap.timeline({
            scrollTrigger:{
              id:"sct5.8",
              trigger:cont1.current,
              start:"10% 20%",
              end:"20% 20%",
              scrub:true,
          
          
          
              // onEnter:()=>()=>dispatch(primaryBGBlack()),
              // onLeave:()=>dispatch(primaryBG())
            },
            onStart:()=>dispatch(primaryBGBlack()),
            onReverseComplete:()=>dispatch(primaryBG())
          })
          const tl2 = gsap.timeline({
            scrollTrigger:{
              id:"sct5.6",
              trigger:cont2.current,
              start:"10% 20%",
              end:"20% 20%",
              scrub:true,
          
          
           
            },
          })
          const tl3 = gsap.timeline({
            scrollTrigger:{
              id:"sct5.232",
              trigger:cont3.current,
              start:"10% 20%",
              end:"20% 20%",
              scrub:true,
              onEnterBack:()=>dispatch(primaryBGBlack()),
            
            
          
            },
          })
          tl1.to(ani1.current,{ opacity:"1",duration:1, translateY:"0" })
          tl2.to(ani2.current,{ opacity:"1",duration:1, translateY:"0" })
          tl3.to(ani3.current,{ opacity:"1",duration:1, translateY:"0" })
  
     
        },
  
        "(min-width: 1025px)": ()=> {
          const tl1 = gsap.timeline({
            scrollTrigger:{
              id:"sct5.8",
              trigger:cont1.current,
              start:"10% 20%",
              end:"20% 20%",
              scrub:true,
          
          
          
              // onEnter:()=>()=>dispatch(primaryBGBlack()),
              // onLeave:()=>dispatch(primaryBG())
            },
            onStart:()=>dispatch(primaryBGBlack()),
            onReverseComplete:()=>dispatch(primaryBG())
          })
          const tl2 = gsap.timeline({
            scrollTrigger:{
              id:"sct5.6",
              trigger:cont2.current,
              start:"10% 20%",
              end:"20% 20%",
              scrub:true,
          
          
           
            },
          })
          const tl3 = gsap.timeline({
            scrollTrigger:{
              id:"sct5.5",
              trigger:cont3.current,
              start:"10% 20%",
              end:"20% 20%",
      
          
              scrub:true,
              onEnterBack:()=>dispatch(primaryBGBlack()),
              // onEnter:()=>()=>dispatch(primaryBGBlack()),
            
          
            },
          })
          tl1.to(ani1.current,{ opacity:"1",duration:1, translateY:"0" })
          tl2.to(ani2.current,{ opacity:"1",duration:1, translateY:"0" })
          tl3.to(ani3.current,{ opacity:"1",duration:1, translateY:"0" })
        }
      })
      return ()=>{
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    })


  return (  
    <div className=" pt-[200px] w-screen h-[auto] flex flex-col gap-[5vw] color-[#1B1D21] bg-[#F7F3EE] " ref={Sct5}>
      <div className=" px-[2%] mb:px-[20px]  flex">
        <div className="w-[30vw] mt-[1vw] text-[1vw] mb:text-12px font-[400]"> {`(CÁC DỰ ÁN)`} </div>
        <div className="flex mb:flex-col w-[58vw] mb:w-[65vw] justify-between gap-3">
          <div className=" mb:w-[15rem] text-aSubtitle font-[500] mb:text-28px mb:leading-none leading-[3vw] w-[300px]">Từ Đà Lạt Đến Quốc Tế</div>
          <div className=" text-aPara mb:text-16px mb:w-[14.7rem] font-[300] w-[25vw]">{`Phố Bên Đồi rất vui được chia sẻ với mọi người các dự án trong lĩnh vực nghệ thuật-văn hóa mà chúng tôi đã thực hiện, cũng như những cột mốc đáng nhớ trong và ngoài nước từ 2016 đến nay.`}</div>
        </div>
        {/* <div className="flex gap-4 items-end w-[30vw] justify-end">
        <span className=" translate-y-[-0.4vw]"><img className='  object-cover rounded-none h-[1.5vw] w-[1.5vw] 'src={require('../../Asset/Mainpage/Sct5.1.svg').default} alt="" /> </span> <u className="  h-[1.5vw] text-[1.1722vw] font-bold">XEM CHI TIẾT</u>
        </div> */}
      </div>
        <div ref={container}  className="flex text-[#FFFFFF] flex-col">
            <div ref={cont1}   className={`flex flex-col justify-center items-center mb:justify-start  bg-cover h-screen w-screen mb:px-[20px] bg-docnhalang `} >
              <div  className="   flex flex-col justify-center mb:justify-start items-center ">

              <div ref={ani1} className=" mb:pt-[90px] flex translate-y-[50%] opacity-0 mb:gap-[5px]  h-[30vh] mb:flex-col mb:w-[90vw]  w-[96vw] ">
                <div className="w-[30vw] mb:hidden "></div>
              <div className=" mt-[4.5vw] mb:mt-0 flex flex-col justify-center   " >

                <div className=" h-full flex items-start text-aCaption font-[400]">
                  <span className=" mb:text-12px h-fit mb:pr-0 mb:mt-0 pr-[1vw] mt-[1.5vh] ">

                  1/3
                  </span>
                </div>
              </div>
              <div className=" mb:gap-[8px] mb:flex mb:flex-col w-[50vw] mb:leading-[1.2] mb:text-56px mb:font-500 mb:w-[65vw] font-600 text-aTitle1">
                <div className="">Dốc Nhà Làng</div> 
                <div className=" mb:w-[90vw] mb:text-[0.875rem] mb:ml-0 ml-[0.5vw] flex justify-between w-[50%]">
                <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/project/0'}><span className=' border-b-[1px] font-bold leading-4 border-primary'>XEM CHI TIẾT</span></Link>    </button></div>
                  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4  border-primary'>TẤT CẢ DỰ ÁN</span></Link>    </button></div>
                </div>
              </div>
              </div>
          
              </div>
            </div>
            <div ref={cont2}   className={`flex justify-center items-center bg-cover h-screen w-screen bg-steam `} >
            <div  className="   flex flex-col justify-center mb:justify-start items-center ">


<div ref={ani2} className=" translate-y-[50%] mb:pt-[90px] opacity-0 flex mb:gap-[5px]  h-[30vh] mb:flex-col mb:w-[90vw]  w-[96vw] ">
  <div className="w-[30vw] mb:hidden "></div>
<div className=" mt-[4.5vw] mb:mt-0 flex flex-col justify-center   " >

  <div className=" h-full flex items-start text-aCaption font-[400]">
    <span className=" mb:text-12px h-fit mb:pr-0 mb:mt-0 pr-[1vw] mt-[1.5vh] ">

    2/3
    </span>
  </div>
</div>
<div className=" mb:gap-[8px] mb:flex mb:flex-col w-[60vw] mb:leading-[1.2] mb:text-56px mb:font-500 mb:w-[65vw] font-600 text-aTitle1">
  <div className=" mb:w-[90vw]">Relive The Time</div> 
  <div className=" mb:w-[90vw] mb:text-[0.875rem] mb:ml-0 ml-[0.5vw] flex justify-between w-[50%]">
  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/project/0'}><span className=' border-b-[1px] font-bold leading-4 border-primary'>XEM CHI TIẾT</span></Link>    </button></div>
    <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4  border-primary'>TẤT CẢ DỰ ÁN</span></Link>    </button></div>
  </div>
</div>
</div>

</div>
            </div>
            <div ref={cont3}  className={`flex   justify-center items-center bg-cover h-screen w-screen bg-artTech `} >
            <div  className="   flex flex-col justify-center mb:justify-start items-center ">


<div ref={ani3} className=" mb:pt-[90px] translate-y-[50%]  opacity-0 flex mb:gap-[5px]  h-[30vh] mb:flex-col mb:w-[90vw]  w-[96vw] ">
  <div className="w-[30vw] mb:hidden "></div>
<div className=" mt-[4.5vw] mb:mt-0 flex flex-col justify-center   " >

  <div className=" h-full flex items-start text-aCaption font-[400]">
    <span className=" mb:text-12px h-fit mb:pr-0 mb:mt-0 pr-[1vw] mt-[1.5vh] ">

    3/3
    </span>
  </div>
</div>
<div className="  mb:gap-[8px] mb:flex mb:flex-col w-[60vw] mb:leading-[1.2] mb:text-56px mb:font-500 mb:w-[65vw] font-600 text-aTitle1">
  <div className="">SmartCity+ ArtTech Fusion</div> 
  <div className=" mb:w-[90vw] mb:text-[0.875rem] mb:ml-0 ml-[0.5vw] flex justify-between w-[50%]">
  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/project/0'}><span className=' border-b-[1px] font-bold leading-4 border-primary'>XEM CHI TIẾT</span></Link>    </button></div>
    <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4  border-primary'>TẤT CẢ DỰ ÁN</span></Link>    </button></div>
  </div>
</div>
</div>
</div>
            </div>
        </div>
    </div>
  );
}

export default Section5;
