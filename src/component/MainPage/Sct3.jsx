

import React,{useRef,useEffect,useState}  from "react"
import "./Sct3.scss"
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo1 from     "./img/logo1.png"
import logo2 from     "./img/logo2.png"
import logo3 from     "./img/logo3.png"
import logo4 from     "./img/logo4.png"
import logo5 from     "./img/logo5.png"
import logo6 from     "./img/logo6.png"
import logo7 from     "./img/logo7.png"
import logo8 from     "./img/logo8.png"
import logo9 from     "./img/logo9.png"
import logo10 from     "./img/logo10.png"
import logo11 from     "./img/logo11.png"
import logo12 from     "./img/logo12.png"
import logo13 from     "./img/logo13.png"
import logo14 from     "./img/logo14.png"
import logo15 from     "./img/logo15.png"
import logo16 from     "./img/logo16.png"
import logo17 from     "./img/logo17.png"
import logo18 from     "./img/logo18.png"
import logo19 from     "./img/logo19.png"
import logo20 from     "./img/logo20.png"
import logo21 from     "./img/logo21.png"
import logo22 from     "./img/logo22.png"
import logo23 from     "./img/logo23.png"

gsap.registerPlugin(Draggable,Observer,ScrollTrigger);

function Section3() {
 

    const lower = useRef(null)
    const Sct33 = useRef(null)
    const cont = useRef(null)
    useEffect(()=>{
  
      let abortController = new AbortController();  
 Draggable.create(lower.current,{
        id:"2",
        bounds:cont.current,
        type:"scroll",
        cursor:"inherit",
        inertia:true

      }) 
        return ()=>{
         abortController.abort()
       
        }
    },[])
 
        
  const logoUper =[
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
     
  ]
  const logoLower =[
    logo13,
logo14,
logo15,
logo16,
logo17,
logo18,
logo19,
logo20,
logo21,
logo22,
logo23,
     
  ]
  return (  
    <div className=' px-[1%] min-h-fit gap-[5vh] h-[110vh]  container33' ref={Sct33}>
    
        <div className='Upper'>
            <div className=' uppercase w-[31vw] text-aCaption font-title2-caption '> {`(Các đối tác)`}</div>
            <div className=" flex justify-between items-center  w-[68vw] ">
              <div className=" capitalize text-aSubtitle font-[500]">thương hiệu hợp tác, nhà tài trợ Của Chúng tôi</div>
              <img src={require('./img/backdown.svg').default} className=" w-[20px] h-[20px] " alt="" />
            </div>
        </div>
        <div className={"wrap  items-center " } ref={cont}  >
        <div className=' Lower  '         
             ref={lower} >
            <div className=" flex flex-col h-full justify-between">

                <div className="  upper_logo" >

          
                {logoUper.map((item)=>{
                  return(
                    <div key={item} className='w-[12rem] h-[12rem]'>
                  <img className=" w-[12rem] h-[12rem] " src={item} alt="" />
                </div>
                  )
                })}
                
                </div>
                <div className="   lower_logo" >

                {logoLower.map((item)=>{
                  return(
                    <div key={item} className='w-[12rem] h-[12rem]'>
                  <img className=" w-[12rem] h-[12rem] " src={item} alt="" />
                </div>
                  )
                })}
             
                </div>
            </div>
            
        </div>

        </div>
      
    </div>
  );
}

export default Section3;
