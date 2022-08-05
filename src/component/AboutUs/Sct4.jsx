import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


gsap.registerPlugin(ScrollTrigger);
function Sct4() {

let list = useRef([])

const wrapper= useRef()


useEffect(() => {
  let abortController = new AbortController();  
 ScrollTrigger.batch(list.current,{
  
  onEnter: batch=>gsap.from(batch,{ delay:0.5, duration:0.3, x:500,opacity:0,stagger:{each:0.3 },ease: "back.out(1.7)"}),
 })
return ()=>{
  abortController.abort()
}
 
}, [])



//   const info = [{
//     position:"GIÁM ĐỐC ĐIỀU HÀNH",
//     name:"Hiền Nguyễn",
//     slogan:"Ở Phố Bên Đồi, chúng tôi muốn đem lại những giá trị truyền thống được làm mới trong bối cảnh hiện đại",
//     pic:require('../../Asset/aboutUs/anhHien.png')
//   },
//   {
//     position:"PROJECT MANAGER",
//     name:"Khánh Nguyễn",
//     slogan:"Ở Phố Bên Đồi, chúng tôi muốn đem lại những giá trị truyền thống được làm mới trong bối cảnh hiện đại",
//     pic:require('../../Asset/aboutUs/anhHien.png')
//   },
//   {
//     position:"Chief Operations Officer",
//     name:"CÔNG TRẦN",
//     slogan:"Ở Phố Bên Đồi, chúng tôi muốn đem lại những giá trị truyền thống được làm mới trong bối cảnh hiện đại",
//     pic:require('../../Asset/aboutUs/anhHien.png')
//   },
//   {
//     position:"Chief Operations Officer",
//     name:"CÔNG TRẦN",
//     slogan:"Ở Phố Bên Đồi, chúng tôi muốn đem lại những giá trị truyền thống được làm mới trong bối cảnh hiện đại",
//     pic:require('../../Asset/aboutUs/anhHien.png')
//   }
// ]
  return (  <div ref={wrapper} className="sct1Us flex flex-col pt-[20vh] text-primary items-center w-screen bg-primaryBlack"
  
  >
        {/* <div className="h-[auto] px-[2%]   items-start   w-screen flex flex-col">
      <div className=' flex flex-col gap-[20vh]   w-[98%] '>
        <span className='  font-normal text-[1vw]'>{`(CÁC THÀNH VIÊN)`}</span>
        <div className='flex  w-[100%]'>
          <div className=' flex flex-col gap-[10vh] '>
           {
            info.map((item,index)=>{
              return(
                <div  ref={e=>(list.current[index]=e)} key={index} className="delay-200 h-[20vh] group hover:h-[60vh] duration-500 hover:ease-bounced  flex flex-col w-[96vw] border-b-2 border-b-primary">
                  <div className='flex items-end w-[100%]'>
                    <div  className=' flex absolute w-[96vw]  translate-y-[37vh] h-[47vh] items-center justify-end '><img  className=' group-hover:h-[22vw] delay-200 duration-300 hover:ease-bounced  w-[19] h-[0] '  src={item.pic} alt="error" /></div>
                    <div className=' leading-[4rem] text-aCaption font-title2-caption w-[30%] '>{item.position}</div>
                    <div className=' text-aTitle2 font-title-Subtitle'>{item.name}</div>
                  </div>
                    <div  className=' duration-200 delay-150 group-hover:translate-y-[25vh] w-[26vw] translate-x-[30vw] translate-y-[10vh] opacity-0  group-hover:opacity-100   font-p text-aPara '>{`"${item.slogan}"`}</div>
    
               
                </div>
              )
            })
           }
          </div>
        </div>
      </div>
    </div>
    <div className=' spacer h-[20vh] w-screen'>

    </div> */}
 
  </div>);
}

export default Sct4;