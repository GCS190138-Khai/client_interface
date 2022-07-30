

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
    useEffect(()=>{
      dispatch(primaryBG())
      let abortController = new AbortController();  
      getAllProject(dispatch,15)
      
      return () => {
        abortController.abort()
      };
    },[])
    useEffect(()=>{
          
      let abortController = new AbortController();  
      const tl = gsap.timeline({
        scrollTrigger:{
          id:"sct5",
          trigger:container.current,
          start:"15% center",
          end:"+=1600",
          scrub:true,
          pin:pinned.current,
          // markers:true
          onEnterBack:()=>dispatch(primaryBGBlack()),
          // onEnter:()=>()=>dispatch(primaryBGBlack()),
          // onLeave:()=>dispatch(primaryBG())
        },
        onStart:()=>dispatch(primaryBGBlack()),
        onComplete:()=> dispatch(primaryBG()),
        onReverseComplete:()=>dispatch(primaryBG())
      })
        tl.to(ani1.current,{ display:"flex",duration:1 })
          .to(ani1.current,{y:50,duration:1})
          .to(ani1.current,{y:50,duration:1,opacity:0,display:"none"})
          .to(ani2.current,{ display:"flex",duration:1 })
          .to(ani2.current,{y:50,duration:1})
          .to(ani2.current,{y:50,duration:1,opacity:0,display:"none"})
          .to(ani3.current,{ display:"flex",duration:1 })
          .to(ani3.current,{y:50,duration:1})
          .to(ani3.current,{y:50,duration:1,opacity:0,display:"none"})
      return ()=>{
        // tl.getById('sct5').kill()
     abortController.abort()
     console.log('aborted')
      }
    },[])

  return (  
    <div className=" pt-[20vh] w-screen h-[auto] flex flex-col gap-[5vw] color-[#1B1D21] bg-[#F7F3EE] " ref={Sct5}>
      <div className=" px-[2%]  flex">
        <div className="w-[30vw] mt-[1vw] text-[1vw] font-[400]"> {`(CÁC DỰ ÁN)`} </div>
        <div className="flex w-[58vw] justify-between gap-3">
          <div className=" text-aSubtitle font-[500] leading-[3vw] w-[14vw]">Từ Đà Lạt Đến Quốc Tế</div>
          <div className=" text-aPara font-[300] w-[25vw]">{`Phố Bên Đồi rất vui được chia sẻ với mọi người các dự án trong lĩnh vực nghệ thuật-văn hóa mà chúng tôi đã thực hiện, cũng như những cột mốc đáng nhớ trong và ngoài nước từ 2016 đến nay.`}</div>
        </div>
        {/* <div className="flex gap-4 items-end w-[30vw] justify-end">
        <span className=" translate-y-[-0.4vw]"><img className='  object-cover rounded-none h-[1.5vw] w-[1.5vw] 'src={require('../../Asset/Mainpage/Sct5.1.svg').default} alt="" /> </span> <u className="  h-[1.5vw] text-[1.1722vw] font-bold">XEM CHI TIẾT</u>
        </div> */}
      </div>
        <div ref={container}  className="flex text-[#FFFFFF] flex-col">
            <div  className={`flex flex-col justify-center items-center  bg-cover h-screen w-screen bg-docnhalang `} >
              <div ref={pinned}  className=" flex flex-col justify-center items-center ">

              <div ref={ani1} className=" hidden h-[30vh]   w-[96vw] ">
                <div className="w-[30vw]"></div>
              <div className=" mt-[4.5vw] flex flex-col justify-center translate-y-[-2.5vw] " >

                <div className=" h-full flex items-start text-aCaption font-[400]">
                  <span className=" h-fit pr-[1vw] mt-[1.5vh] ">

                  1/3
                  </span>
                </div>
              </div>
              <div className=" w-[50vw] font-600 text-aTitle1">
                Dốc Nhà Làng
                <div className=" ml-[0.5vw] flex justify-between w-[50%]">
                <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work/2'}><span className=' border-b-[1px] font-bold leading-4 border-primary'>XEM CHI TIẾT</span></Link>    </button></div>
                  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4  border-primary'>TẤT CẢ DỰ ÁN</span></Link>    </button></div>
                </div>
              </div>
              </div>
              <div ref={ani2} className=" hidden h-[30vh]   w-[96vw] ">
                <div className="w-[30vw]"></div>
              <div className=" mt-[4.5vw] flex flex-col justify-center translate-y-[-2.5vw] " >

                <div className=" h-full flex items-start text-aCaption font-[400]">
                  <span className=" h-fit pr-[1vw] mt-[1.5vh] ">

                  2/3
                  </span>
                </div>
              </div>
              <div className="  capitalize  w-[50vw] font-600 text-aTitle1">
              Relive The Time
                <div className=" ml-[0.5vw] flex justify-between w-[50%]">
                <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work/1'}><span className=' border-b-[1px] font-bold leading-4 border-primary'>XEM CHI TIẾT</span></Link>    </button></div>
                  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4  border-primary'>TẤT CẢ DỰ ÁN</span></Link>    </button></div>
                </div>
              </div>
              </div>
              <div ref={ani3} className=" hidden h-[30vh]   w-[96vw] ">
                <div className="w-[30vw]"></div>
              <div className=" mt-[4.5vw] flex flex-col justify-center translate-y-[-2.5vw] " >

                <div className=" h-full flex items-start text-aCaption font-[400]">
                  <span className=" h-fit pr-[1vw] mt-[1.5vh] ">

                  3/3
                  </span>
                </div>
              </div>
              <div className=" capitalize w-[50vw] font-600 text-aTitle1">
              SmartCity+ ArtTech Fusion
                <div className=" ml-[0.5vw] flex justify-between w-[50%]">
                  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work/2'}><span className=' border-b-[1px] font-bold leading-4 border-primary'>XEM CHI TIẾT</span></Link>    </button></div>
                  <div><button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('./img/white.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4  border-primary'>TẤT CẢ DỰ ÁN</span></Link>    </button></div>
                </div>
              </div>
              </div>
              </div>
            </div>
            <div   className={`flex justify-center items-center bg-cover h-screen w-screen bg-steam `} >
         
            </div>
            <div  className={`flex justify-center items-center bg-cover h-screen w-screen bg-artTech `} >
           
            </div>
        </div>
    </div>
  );
}

export default Section5;
