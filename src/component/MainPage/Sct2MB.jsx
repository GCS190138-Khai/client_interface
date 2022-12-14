import gsap from 'gsap';

import { useEffect, useRef, useState } from 'react';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';


gsap.registerPlugin(ScrollToPlugin,ScrollTrigger)

function Section2MB() { 
  
  
  
  const polygon = useRef()
  const pic1 = useRef()
  const text1 = useRef()
 const windowW = useWindowWidth()
  const main = useRef()
  const contain2 = useRef()
useEffect(()=>{
  ScrollTrigger.batch(polygon.current,{
    snap:false,
    start:"20% center",
    end:"+=500",
    onEnter :()=>{
      gsap.to(pic1.current,{duration:1,width:"100%",borderRadius:"45rem",ease:"Power4.easeInOut"})
    
    
    },
 
    onLeave :()=>{
      gsap.to(pic1.current,{duration:1,width:"100%",borderRadius:"45rem",ease:"Power4.easeInOut"})
    
    },
    onLeaveBack: ()=>{gsap.to(pic1.current,{duration:1,width:"100%",borderRadius:"45rem",ease:"Power4.easeInOut"})

  },
    onEnterBack:()=>{gsap.to(pic1.current,{duration:1,width:"100%",borderRadius:"45rem",ease:"Power4.easeInOut"})

  }
 
    
  })
  ScrollTrigger.batch(polygon.current,{
    snap:false,
    start:"20% center",
    end:"+=500",
    onEnter :()=>{gsap.to(polygon.current,{ keyframes:[
      { duration:0.7, clipPath : "ellipse(500% 50% at 50% 50%)"},
      { duration:0.1, clipPath : "ellipse(500% 70% at 50% 50%)"},
 
    ],ease:"Power4.easeInOut"})},

    onLeave:()=>{gsap.to(polygon.current,{duration:0.7,clipPath:"ellipse(80% 50% at 50% 50%)",ease:"Power4.easeInOut"})},
    onEnterBack: ()=>{gsap.to(polygon.current,{ keyframes:[
      { duration:0.7, clipPath : "ellipse(500% 50% at 50% 50%)"},
      { duration:0.1, clipPath : "ellipse(500% 70% at 50% 50%)"},
 
    ],ease:"Power4.easeInOut"})},
    onLeaveBack:()=>{gsap.to(polygon.current,{duration:0.7,clipPath: "ellipse(80% 50% at 50% 50%)",ease:"Power4.easeInOut"})},
 
    
  })

gsap.to(contain2.current,{
  scrollTo:{
    
    x:windowW*3.5,
  },

duration:6,
scrollTrigger:{
  id:"Sct2.",
  trigger:main.current,
  start:"20px 20px",
  end:"+=500",
  // markers:true,

  scrub:true,
  snap:false
}
})
},[windowW])

 
  const transYImg3='  h-[39vh] w-[25vw] object-cover rounded-[20px] w-[25vw]'
  const transYImg2='  h-[39vh] w-[25vw]  object-cover  rounded-[20px] w-[25vw]'
  const [paragraph1,setParagraph1]= useState('Ph??? B??n ?????i - "Ngh??? thu???t k???t n???i ch??ng ta" l?? m???t d??? ??n ngh??? thu???t ??a h??nh th??i ?????u ti??n t???i ???? L???t, ???????c t??? ch???c th?????ng ni??n v???i m???c ti??u bi???n ???? L???t tr??? th??nh m???t ??i???m ?????n v??n h??a ?????c ????o c???a ????ng Nam ??.')
  return (
    <div className=' flex flex-col '>
    <div className=" h-[auto] bg-[#F7F3EE]  justify-center    w-screen flex flex-col">
     
        <div ref={polygon} style={{ clipPath: "ellipse(80% 50% at 50% 50%)"}}  className=' flex justify-center mb:h-fit mb:bg-transparent items-center non-Rec bg-[#FFDD00] h-[150vh] w-screen '>
        <img ref={pic1} style={{ borderRadius:"45rem "}} className='  h-[95vh] object-cover mb:w-screen mb:h-[95vh]  w-[30vw]' src={"https://live.staticflickr.com/65535/52253824580_5c9371c1b9_o.png"} alt="" />
        <img ref={text1} className=' mb:h-[139px] mb:w-[139px] h-[20vh] object-contain  absolute w-[10vw]' src={require('../../Asset/Mainpage/cityOfArt.svg').default} alt="" />
      </div>
    </div>
    <div className=" mb:h-fit h-screen mb:pt-[100px]  pt-[200px] px-[20px] bg-[#F7F3EE] mb:justify-start  justify-center items-start gap-[5rem] mb:gap-[40px]  w-screen flex flex-col">
      <div className=' leading-[1.2] mb:text-28px   w-[86vw] font-[500] text-[3.6rem]'>
        <span className=' mb:text-12px font-400 pr-[7vw]  text-[1vw]'>{`(V??? CH??NG T??I)`}</span>{paragraph1}
      </div>
      <div className='  w-[100%] flex mb:justify-start justify-end'>
        <div className=' mb:hidden text-aPara  font-p w-[27vw]' >???????c th??nh l???p v??o n??m 2016, Ph??? B??n ?????i l?? ????n v??? ti??n phong trong vi???c t???o n??n n???n t???ng k???t n???i v?? khuy???n kh??ch th??? hi???n ngh??? thu???t trong c???ng ?????ng t???i th??nh ph??? ???? L???t. </div>
        <button  className=' mt-16 pl-[8vw] mb:text-12px mb:pl-0 mb:mt-0 text-[1.1vw] flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('../../Asset/Nav/buttonLeftArrow.svg').default} alt="" /><Link to={'/aboutus'}><span className=' border-b-[1px] font-bold leading-4 border-black'>C??U CHUY???N C???A CH??NG T??I</span></Link>    </button>
        <div className=' mb:hidden w-[15%]'></div>
      </div>

    </div>
    
    <div ref={main} className=" relative  mb:h-[150vh]  mb:pt-[100px] pt-[200px]   bg-[#F7F3EE] w-[100vw] gap-1 flex   "  >
    <div  ref={contain2} className=' sticky top-[200px]  mb:h-[19rem] mb:overflow-y-hidden  h-[95vh]  w-[98w]  gap-5  overflow-x-hidden flex items-center    '>
   
      <div className='  min-w-[30vw]'></div>
     <div className='  min-w-[52vw]  items-center flex gap-5 '>

     <img className=' mb:h-[19rem] mb:mt-0 mb:w-[12.5rem]   mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52253443468_f86151be8b_o.png"} alt="" />
     <div  className=' mb:hidden mt-[7%] flex flex-col gap-5  w-[25vw] h-[80vh] '>
     <img className={transYImg2} src={"https://live.staticflickr.com/65535/52253443443_b678371a49_o.png" } alt="" />
     

     <img className={transYImg3} src={"https://live.staticflickr.com/65535/52253422531_2054de0f64_o.png"} alt="" />
    
     </div>
     </div>
     {/*  */}
     <div className='  min-w-[52vw]  items-center flex gap-5 '>

     <img className=' mb:h-[19rem] mb:w-[12.5rem] mb:mt-0 mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52253920905_85665dfcb6_o.png"} alt="" />

</div>
{/*  */}
<div className='  min-w-[52vw]  items-center flex gap-5 '>

<img className={`${transYImg2} mb:h-[19rem] mb:object-left-top mb:w-[12.5rem]`} src={"https://live.staticflickr.com/65535/52252454037_9e443933be_o.png"} alt="" />

</div>
{/*  */}
<div className='  min-w-[52vw]  items-center flex gap-5 '>

<img className='mb:h-[19rem] mb:mt-0 mb:w-[12.5rem] mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52253708229_d754c65013_o.png"} alt="" />

</div>
{/*  */}
<div className='  min-w-[52vw]  items-center flex gap-5 '>

<img className={`${transYImg2} mb:h-[19rem] mb:object-left-top mb:w-[12.5rem]`} src={"https://live.staticflickr.com/65535/52253443348_b882e0fca6_o.png"} alt="" />

</div>
{/*  */}
<div className='  min-w-[52vw]  items-center flex gap-5 '>

<img className={`${transYImg2} mb:h-[19rem] mb:object-left-top mb:w-[12.5rem]`} src={"https://live.staticflickr.com/65535/52252454067_a38484de8b_b.jpg"} alt="" />

</div>
{/*  */}
<div className='  min-w-[52vw]  items-center flex gap-5 '>

<img className={`${transYImg3} mb:h-[19rem] mb:object-left-top mb:w-[12.5rem]`} src={"https://live.staticflickr.com/65535/52253422471_20011795a8_o.png"} alt="" />

</div>
{/*  */}
 
     

     <div className=' mb:hidden min-w-[52vw] items-center flex gap-5 '>

     <img className={`${transYImg2} mb:h-[19rem] mb:object-left-top mb:w-[12.5rem]`} src={"https://live.staticflickr.com/65535/52253443348_b882e0fca6_o.png"} alt="" />

</div>
    </div>
  </div>
    
    </div>
    );
}

export default Section2MB;