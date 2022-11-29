

import React,{ useState }  from "react"

import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Link } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
gsap.registerPlugin(Flip,ScrollTrigger);
function Section4() {

    const innerW = useWindowWidth()
 

    const stage = [
        {
            title:innerW<1024?"Studio":"Creative Studio",
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
   <div className=" pt-[160px] mb:pt-[100px] mb:pb-[100px] pb-[170px] bg-[#F7F3EE] mb:px-[20px] px-[2%] flex flex-col justify-center items-start w-screen">
        <div className=" pb-[5vw] mb:pb-[0]  flex">
            <div className="mt-[2vw] mb:mt-[0.2rem] mb:w-[24vw] w-[29.5vw] xl:text-[1vw] mb:text-12px ">{`(DỊCH VỤ)`}</div>
            <div className=" gap-[7.5vw] flex mb:flex-col"> 
                <div className=" text-[2.3vw] font-[500] mb:w-[15rem] mb:leading-[1.2] w-[23vw] mb:text-28px mb:font-500 " >Luôn Ưu Tiên Sự Phát Triển Bền Vững</div>
                <div className=" text-[1.576vw] mb:text-16px mb:w-[15rem] font-[300] w-[28vw] flex flex-col " >
                   <div>Chúng tôi hướng đến mục tiêu phát triển bền vững Thành phố Đà Lạt với ngành công nghiệp sáng tạo, các hoạt động sáng tạo & nghệ thuật.</div>
                    <div><button  className=' mb:text-12px mb:font-600 mt-16 text-[1.1vw] flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('../../Asset/Nav/buttonLeftArrow.svg').default} alt="" /> <Link to={'/work'}><span className=' border-b-[1px] font-bold leading-4 border-black'>XEM THÊM VỀ DỊCH VỤ</span></Link>    </button></div>
                </div>
            </div>
        </div>
      
       {innerW<1024 ?  
       <div className=" mb:pt-[60px]     h-fit w-[100%] flex ">
       <div className=" mb:w-0  w-[29.5vw]">
         
       </div>
       <Link className="w-[58vw] mb:w-[100%]  " to={'/work'}>
       <div className=" mb:gap-[20px]    flex w-[58vw] mb:w-[100%]  items-center flex-col">
           {
               stage.map((item,index)=>{
                   return(
                       <div
            
                           id={index} key={index} className="  w-[58vw] mb:w-[100%]   flex flex-col justify-center  mb:h-[auto]  h-[25vh]   ">
                            <div className=" font-[500] gap-3 flex items-center  "> 
                            <span className=" group-hover:font-semibold  group-hover:opacity-0 group-hover:translate-y-[7vw] font-[500] mt-[-7.5vh] mb:text-12px mb:opacity-100 mb:translate-y-[0.6rem] text-[1vw]">{`0${index+1}`}</span> 
                            <span className="  mb:text-56px mb:leading-[0.8] ">{item.title}</span> </div>
                           <div className=" mb:flex mb:text-12px  mb:gap-0 h-[5vh] mb:h-[auto] mb:pb-[18px] mb:pt-[20px]   border-b border-b-primaryBlack w-full flex  text-[1vw] gap-12">
                            <div className=" w-[1.9rem] "></div>
                              <div className="mb:w-[17rem] font-400 gap-1 flex flex-col">

                               <div className=" w-full uppercase mb:opacity-100     opacity-100">{item.subtitle1}</div>
                               <div className=" w-full uppercase mb:opacity-100   opacity-100">{item.subtitle2}</div>
                               {item.subtitle3? <div className=" w-full  uppercase mb:opacity-100  opacity-100">{item.subtitle3}</div>:""}
                              </div>
                           </div>
                       </div>
                   )
               })
           }
       </div>
       </Link>
   </div>
       :<div className="     h-fit w-[100%] flex ">
            <div className=" mb:w-0  w-[29.5vw]">
                {/* {child?"":<img className=" object-contain rounded-none h-[8vw] w-[8vw] " src={picMain.default} alt="123" />} */}
            </div>
            <Link className="w-[58vw] mb:w-[100%]  " to={'/work'}>
            <div className="     flex w-[58vw] mb:w-[100%]  items-center flex-col">
                {
                    stage.map((item,index)=>{
                        return(
                            <div
                 
                                id={index} key={index} className=" group w-[58vw] mb:w-[100%]   flex flex-col justify-center hover:h-[35vh] mb:h-[35vh] h-[25vh]   ">
                                 <div className=" font-[500] gap-3 flex items-center text-[6rem] "> 
                                 <span className=" group-hover:font-semibold group-hover:ease-in-out duration-300 group-hover:opacity-0 group-hover:translate-y-[7vw] font-[500] mt-[-7.5vh] mb:text-12px mb:opacity-100 mb:translate-y-0 text-[1vw]">{`0${index+1}`}</span> 
                                 <span className=" mb:hidden "> <img className="  translate-y-[-3vh] translate-x-[-2vw] hidden group-hover:inline-block w-[42px]  h-[42px]" src={require('./img/arrrow.svg').default} alt="" /> </span> <span className="  group-hover:ease-in-out duration-300 group-hover:translate-x-[-2vw] leading-[6vw] mb:text-56px ">{item.title}</span> </div>
                                <div className=" mb:flex-col mb:flex mb:text-12px mb:gap-0      group-hover:ease-in-out duration-300 group-hover:h-[10vh] h-[5vh] mb:h-[10vh]    border-b border-b-[#1B1D21] w-full flex  text-[1vw] gap-12">
                               
                                    <div className="group-hover:font-semibold delay-75 mb:opacity-0  hidden group-hover:ease-in-out duration-300 group-hover:inline-block font-[500] text-[1vw]">{`0${index+1}`}</div>
                                    <div className=" translate-x-[-0.5vw] uppercase mb:opacity-100  group-hover:ease-in-out duration-300 group-hover:duration-500 opacity-0 group-hover:opacity-100">{item.subtitle1}</div>
                                    <div className=" translate-x-[-0.5vw] uppercase mb:opacity-100  group-hover:ease-in-out duration-300 group-hover:duration-500 opacity-0 group-hover:opacity-100">{item.subtitle2}</div>
                                    {item.subtitle3? <div className=" translate-x-[-0.5vw] uppercase mb:opacity-100  group-hover:ease-in-out duration-300 group-hover:duration-500 opacity-0 group-hover:opacity-100">{item.subtitle3}</div>:""}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </Link>
        </div>}
        
   </div>
  );
}

export default Section4;
