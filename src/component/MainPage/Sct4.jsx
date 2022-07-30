

import React,{useRef,useState,useEffect}  from "react"

import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Link } from "react-router-dom";
gsap.registerPlugin(Flip,ScrollTrigger);
function Section4() {

    const [child,setChild]=useState(false)
    const picMain = require('../../Asset/Mainpage/picArrow.svg')

    const stage = [
        {
            title:"Creative Studio",
            subtitle1:"quảng bá nghệ thuật đương đại",
            subtitle2:"hub sáng tạo",
            subtitle3:"hệ thống giáo dục steam",
            pic:require("../../Asset/Mainpage/sct4.3.svg") 
        },  
        {
            title:"Sự Kiện",
            subtitle1:"quảng bá và tiếp cận khán giả",
            subtitle2:"tổ chức hoạt động nghệ thuật đa phương tiện",
            pic:require("../../Asset/Mainpage/sct4.2.svg") 
        },  
         {
        title:"Tư Vấn",
        subtitle1:"Hoạt động nghệ thuật cộng đồng",
        subtitle2:"Khuyến khích tinh thần sáng tạo",
        pic:require("../../Asset/Mainpage/sct4.1.svg")      
         },

 

    ]
        

  return (  
   <div className=" bg-[#F7F3EE] px-[2%] flex flex-col justify-center items-start w-screen">
        <div className=" pb-[5vw]  flex">
            <div className="mt-[2vw] w-[29.5vw] xl:text-[1vw] ">{`(DỊCH VỤ)`}</div>
            <div className=" gap-[12vw] flex"> 
                <div className=" text-[2.3vw] font-semibold w-[24vw]" >Luôn Ưu Tiên Sự Phát Triển Bền Vững</div>
                <div className=" text-[1.576vw] font-[300] w-[26vw] flex flex-col " >
                   <div> Chúng tôi hướng đến mục tiêu phát triển bền vững Thành phố Đà Lạt với ngành công nghiệp sáng tạo, các hoạt động sáng tạo {`&`} nghệ thuật.</div>
                    <div><button  className=' mt-16 text-[1.1vw] flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('../../Asset/Nav/buttonLeftArrow.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4 border-black'>XEM THÊM VỀ DỊCH VỤ</span></Link>    </button></div>
                </div>
            </div>
        </div>
        <div className=" h-screen w-screen flex ">
            <div className="w-[30vw]">
                {/* {child?"":<img className=" object-contain rounded-none h-[8vw] w-[8vw] " src={picMain.default} alt="123" />} */}
            </div>
            <Link to={'/work'}>
            <div className=" flex flex-col">
                {
                    stage.map((item,index)=>{
                        return(
                            <div
                            // onMouseLeave={()=>{
                            //     setChild(false)
                            // }}
                            // onMouseEnter={()=>{
                            //     setChild(true)}} 
                                id={index} key={index} className=" group w-[67.7vw] hover:w-[70vw] flex flex-col justify-center hover:h-[35vh] h-[25vh]   ">
                                 <div className=" font-[600] gap-3 flex items-center text-[6.875vw] "> <span className=" group-hover:font-semibold group-hover:ease-in-out duration-300 group-hover:translate-y-[7.6vw] font-[500] mt-[-7.5vh] text-[1vw]">{`0${index+1}`}</span> <span> <img className=" translate-y-[-3vh] translate-x-[-2vw] hidden group-hover:inline-block w-[42px]  h-[42px]" src={require('./img/arrrow.svg').default} alt="" /> </span> <span className="  group-hover:ease-in-out duration-300 group-hover:translate-x-[-2vw] leading-[6vw]">{item.title}</span> </div>
                                <div className="  group-hover:ease-in-out duration-300 group-hover:h-[10vh] h-[5vh]    border-b border-b-[#1B1D21]  w-[66vw] flex pl-[2.5vw] text-[1vw] gap-12">
                                   {/* { 
                                   index===0?<div className=" delay-200  group-hover:ease-bounced duration-1000 group-hover:duration-1000  group-hover:translate-y-[-5vw]  translate-x-[-30vw]  w-[30vw] absolute">
                                    <img className=" delay-200  group-hover:ease-bounced duration-500 group-hover:duration-500 w-[25vw]  rounded-[40rem] group-hover:h-[38vw] h-0 object-cover"  src={item.pic.default} alt="123" />
                                    </div>
                                    :
                                    index===1?<div className=" delay-200 group-hover:ease-bounced duration-1000 group-hover:duration-1000  group-hover:translate-y-[-15vw]  translate-x-[-30vw] w-[30vw]  absolute">
                                    <img className=" delay-200 group-hover:ease-bounced duration-500 group-hover:duration-500 w-[25vw]  rounded-[40rem] group-hover:h-[38vw] h-0 object-cover" src={item.pic.default} alt="123" />
                                    </div>
                                    :
                                    index===2?<div className=" delay-200 group-hover:ease-bounced duration-1000 group-hover:duration-1000  group-hover:translate-y-[-25vw]  translate-x-[-30vw] w-[30vw]  absolute">
                                    <img className=" delay-200  group-hover:ease-bounced duration-500 group-hover:duration-500 w-[25vw] rounded-[40rem] group-hover:h-[38vw] h-0 object-cover" src={item.pic.default} alt="123" />
                                    </div>
                                    :
                                    <div className=" delay-200  group-hover:ease-bounced duration-1000 group-hover:duration-1000  group-hover:translate-y-[-35vw]  translate-x-[-30vw] w-[30vw]  absolute">
                                    <img className=" delay-200 group-hover:ease-bounced duration-500 group-hover:duration-500 w-[25vw]  rounded-[40rem] group-hover:h-[38vw] h-0 object-cover"  src={item.pic.default} alt="123" />
                                    </div>
                                    
                                    } */}
                                    <div className=" translate-x-[1.5vw] uppercase  group-hover:ease-in-out duration-300 group-hover:duration-500 opacity-0 group-hover:opacity-100">{item.subtitle1}</div>
                                    <div className=" translate-x-[1.5vw] uppercase  group-hover:ease-in-out duration-300 group-hover:duration-500 opacity-0 group-hover:opacity-100">{item.subtitle2}</div>
                                    {item.subtitle3? <div className=" translate-x-[1.5vw] uppercase  group-hover:ease-in-out duration-300 group-hover:duration-500 opacity-0 group-hover:opacity-100">{item.subtitle3}</div>:""}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </Link>
        </div>
        
   </div>
  );
}

export default Section4;
