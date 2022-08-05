import gsap from 'gsap';

import { useEffect, useRef, useState } from 'react';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin,ScrollTrigger)

function Section2() { 
  const esclipse = useRef(null)
  
  const contain = useRef()
  const polygon = useRef()
  const pic1 = useRef()
  const text1 = useRef()

  useEffect(()=>{
  
    gsap.to(contain.current,{
        scrollTo:{
          
          x:2200,
        },
      
      duration:6,
      scrollTrigger:{
        id:"Sct2.0",
        trigger:contain.current,
        start:"47% center",
        end:"+=1500",
       
        pin:contain.current,
        scrub:true,
        snap:false
      }
    })
  })
  useEffect(()=>{
    let arbort = new AbortController();
    ScrollTrigger.batch(polygon.current,{
      snap:false,
      start:"20% center",
      end:"+=500",
      onEnter :()=>{
        gsap.to(pic1.current,{duration:1,width:"95vw",borderRadius:"45rem",ease:"Power4.easeInOut"})
      
        gsap.to(text1.current,{duration:1,scale:2,ease:"Power4.easeInOut"})
      },
   
      onLeave :()=>{
        gsap.to(pic1.current,{duration:1,width:"30vw",borderRadius:"45rem",ease:"Power4.easeInOut"})
        gsap.to(text1.current,{duration:1,scale:1,ease:"Power4.easeInOut"})
      },
      onLeaveBack: ()=>{gsap.to(pic1.current,{duration:1,width:"35vw",borderRadius:"45rem",ease:"Power4.easeInOut"})
                        gsap.to(text1.current,{duration:1,scale:1,ease:"Power4.easeInOut"})
    },
      onEnterBack:()=>{gsap.to(pic1.current,{duration:1,width:"95vw",borderRadius:"45rem",ease:"Power4.easeInOut"})
                      gsap.to(text1.current,{duration:1,scale:2,ease:"Power4.easeInOut"})
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
    
    return ()=>{
      arbort.abort()
    }

  },[])
  const transYImg3='  h-[39vh] w-[25vw] object-cover rounded-[20px] w-[25vw]'
  const transYImg2='  h-[39vh] w-[25vw]  object-cover  rounded-[20px] w-[25vw]'
  const [paragraph1,setParagraph1]= useState('Phố Bên Đồi - "Nghệ thuật kết nối chúng ta" là một dự án nghệ thuật đa hình thái đầu tiên tại Đà Lạt, được tổ chức thường niên với mục tiêu biến Đà Lạt trở thành một điểm đến văn hóa độc đáo của Đông Nam Á.')
  return (
    <div className=' '>
    <div className=" h-[auto] bg-[#F7F3EE]  justify-center    w-screen flex flex-col">
     
        <div ref={polygon} style={{ clipPath: "ellipse(80% 50% at 50% 50%)"}}  className=' flex justify-center items-center non-Rec bg-[#FFDD00] h-[150vh] w-screen '>
        <img ref={pic1} style={{ borderRadius:"45rem "}} className='  h-[95vh] object-cover  w-[30vw]' src={"https://live.staticflickr.com/65535/52253824580_5c9371c1b9_o.png"} alt="" />
        <img ref={text1} className='  h-[20vh] object-contain  absolute w-[10vw]' src={require('../../Asset/Mainpage/cityOfArt.svg').default} alt="" />
      </div>
    </div>
    <div className=" min-h-screen pt-[200px] px-[2%] bg-[#F7F3EE]  justify-center items-start gap-[5rem]  w-screen flex flex-col">
      <div className=' leading-[1.2]   w-[86vw] font-[500] text-[3.6rem]'>
        <span className=' pr-[7vw] font-normal text-[1vw]'>{`(VỀ CHÚNG TÔI)`}</span>{paragraph1}
      </div>
      <div className='  w-[100%] flex justify-end'>
        <div className=' text-aPara font-p w-[25vw]' >Được thành lập vào năm 2016, Phố Bên Đồi là đơn vị tiên phong tạo nên nền tảng kết nối và khuyến khích thể hiện nghệ thuật trong cộng đồng thành phố Đà Lạt. </div>
        <button  className=' mt-16 pl-[8vw] text-[1.1vw] flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('../../Asset/Nav/buttonLeftArrow.svg').default} alt="" /><Link to={'/aboutus'}><span className=' border-b-[1px] font-bold leading-4 border-black'>CÂU CHUYỆN CỦA CHÚNG TÔI</span></Link>    </button>
        <div className=' w-[15%]'></div>
      </div>

    </div>
    <div className="h-[330vh] pt-[200px]   bg-[#F7F3EE] w-[100vw] gap-1 flex justify-center   "  >
      <div  ref={contain} className='  h-[95vh]  w-[98w]  gap-5  overflow-x-hidden flex items-center    '>
     
        <div className='min-w-[30vw]'></div>
       <div className=' min-w-[52vw] items-center flex gap-5 '>

       <img className=' mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52253443468_f86151be8b_o.png"} alt="" />
       <div  className=' mt-[7%] flex flex-col gap-5  w-[25vw] h-[80vh] '>
       <img className={transYImg2} src={"https://live.staticflickr.com/65535/52253443443_b678371a49_o.png" } alt="" />
       

       <img className={transYImg3} src={"https://live.staticflickr.com/65535/52253422531_2054de0f64_o.png"} alt="" />
      
       </div>
       </div>
       <div className=' min-w-[52vw] items-center flex gap-5 '>
       <img className=' mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52253920905_85665dfcb6_o.png"} alt="" />

<div  className=' mt-[7%] flex flex-col gap-5  w-[25vw] h-[80vh] '>
<img className={transYImg2} src={"https://live.staticflickr.com/65535/52252454037_9e443933be_o.png"} alt="" />


<img className={transYImg3} src={"https://live.staticflickr.com/65535/52253442753_082b153f22_o.png"} alt="" />

</div>
       </div>
       <div className=' min-w-[52vw] items-center flex gap-5 '>

      <img className=' mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52253708229_d754c65013_o.png"} alt="" />
      <div  className=' mt-[7%] flex flex-col gap-5  w-[25vw] h-[80vh] '>
      <img className={transYImg2} src={"https://live.staticflickr.com/65535/52253443348_b882e0fca6_o.png"} alt="" />


      <img className={transYImg3} src={"https://live.staticflickr.com/65535/52253422471_20011795a8_o.png"} alt="" />

      </div>
       </div>
       <div className=' min-w-[52vw] items-center flex gap-5 '>

<img className=' mt-[-7%] h-[80vh] object-cover rounded-[20px] w-[25vw]' src={"https://live.staticflickr.com/65535/52252454067_b31db3de50_o.png"} alt="" />

 </div>
      </div>
    </div>
    </div>
    );
}

export default Section2;