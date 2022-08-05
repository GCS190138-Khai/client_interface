import React,{useRef,useState,useEffect}  from "react"


import { primaryBGYellow } from '../../redux/navSlice'
import { useSelector ,useDispatch } from 'react-redux';





function Sct1W() {
  const dispatch = useDispatch()
  dispatch(primaryBGYellow())




  
 
 


  

    const paragraph1 = 'Thông qua các dự án và hoạt động, chúng tôi khuyến khích nâng cao nhận thức về bảo tồn đô thị, bảo vệ môi trường và phát triển bền vững.'
     
    return ( 
        <div className="flex items-center h-auto w-screen flex-col">
        <div  className="  pt-[20vh] flex w-screen h-[100vh]   px-[2%]  ">
        <div className="h-screen    items-start w-[90%]   flex flex-col">
      <div className='   xl:w-[100%] font-title-Subtitle leading-[5.16rem]   text-[4rem]'>
        <span className=' xl:pr-[2vw] xl:font-normal uppercase text-[1vw] leading-[2rem]'>{`(hoạt động của chúng tôi) `}</span>{paragraph1}
      </div>
    </div>
      <div className="  text-right  xl:w-[10%] sm:text-[2rem] xl:text-aSubtitle font-title-Subtitle pt-[2vh]">
      16-22&#169;
      </div>
        </div>
          <div className="  flex justify-center h-[110vh] w-screen ">
            <img className=" w-[96vw] translate-y-[-20vh] h-[100vh] rounded-[40rem] " src={"https://live.staticflickr.com/65535/52253789619_f7ca38f025_h.jpg"} alt="" />
          </div>
        </div> 

    );
  }
  
  export default Sct1W;
  