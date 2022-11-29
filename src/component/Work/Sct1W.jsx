import React,{useRef,useState,useEffect}  from "react"


import { primaryBGYellow } from '../../redux/navSlice'
import { useSelector ,useDispatch } from 'react-redux';





function Sct1W() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(primaryBGYellow())
  },[])  

    const paragraph1 = 'Thông qua các dự án và hoạt động, chúng tôi khuyến khích nâng cao nhận thức về bảo tồn đô thị, bảo vệ môi trường và phát triển bền vững.'
     
    return ( 
        <div className="flex mb:gap-[70px] items-center h-auto w-screen flex-col">
        <div  className="  pt-[20vh] mb:pt-[100px] flex w-screen mb:h-fit h-[100vh] mb:px-[20px]   px-[2%]  ">
        <div className="h-screen mb:w-full mb:h-fit   items-start w-[90%]   flex flex-col">
      <div className='   xl:w-[100%] font-title-Subtitle leading-[5.16rem] mb:text-30px mb:flex mb:flex-col   text-[4rem]'>
        <span className=' xl:pr-[2vw] xl:font-normal uppercase mb:text-12px text-[1vw] mb:leading-[1] leading-[2rem]'>{`(hoạt động của chúng tôi) `}</span>
        
        <span className=" mb:leading-[1.2]">{paragraph1}</span>
      </div>
    </div>
      <div className=" mb:hidden  text-right  xl:w-[10%]  text-aSubtitle font-title-Subtitle pt-[2vh]">
      16-22&#169;
      </div>
        </div>
          <div className="  flex justify-center mb:h-[50rem] mb:overflow-x-hidden h-[110vh] w-screen ">
            <img className=" mb:min-w-[30rem] mb:object-cover mb:object-center w-[96vw] mb:translate-y-0 translate-y-[-20vh] mb:h-[50rem] h-[100vh] rounded-[40rem] " src={"https://live.staticflickr.com/65535/52253789619_f7ca38f025_h.jpg"} alt="" />
          </div>
        </div> 

    );
  }
  
  export default Sct1W;
  