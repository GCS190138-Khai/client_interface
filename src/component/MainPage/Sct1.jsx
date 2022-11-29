

import React,{ useState}  from "react"
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
  } from '@react-hook/window-size'
import {primaryBG} from '../../redux/navSlice'
import {  useDispatch } from 'react-redux';
import { useEffect } from "react";
import useScreenOrientation from "react-hook-screen-orientation";

gsap.registerPlugin(ScrollTrigger)
function Section1() {
    const [textHero,setTextHero]=useState(' mb:text-56px text-[15vw] leading-[0.94]  font-[600]')
    const dispatch = useDispatch()
    const [isMobile, setisMobile] = useState(false)

   

 
  const onlyWidth = useWindowWidth()

    useEffect(()=>{
    
          
                if(onlyWidth<1025){
                 
                  return  setisMobile(true)
                   
                }else if(onlyWidth>1025) {
                    console.log(window.innerWidth)
                    setisMobile(false)
                 
                }

 
  
    },[onlyWidth])
   
    
    if(isMobile){
        return (
            <div className={` min-h-fit pb-[90px] pt-[100px] bg-primary   w-screen flex flex-col items-center `}>
    
            <div className=' h-fit gap-[80px] px-[20px] w-screen flex flex-col '>
            <div className='flex  flex-col  items-start  text-12px   text-[#1B1D21] '>
                                    <div>
                                        PHỐ BÊN ĐỒI
                                    </div>
                                
                                      <div className=" flex flex-col ">
                                      <button className='flex gap-1 items-center'>{`(+84) 97 411 0770`} </button>
                                      <button onClick={()=>{
                                          window.open("https://accounts.google.com/AccountChooser/signinchooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser", '_blank')
                                      }}  className='flex gap-1 items-center'><u>INFO@PHOBENDOI.ART</u><img className='h-3 object-fill rounded-none w-3' src={require('../../Asset/Nav/muitenBuutonDen.svg').default} alt="" /> 
                                      </button>
                                      <button onClick={()=>{
                                          window.open("https://www.facebook.com/phobendoi", '_blank')
                                      }}  className='flex gap-1 items-center'><u className=" uppercase">facebook</u><img className='h-3 object-fill rounded-none w-3' src={require('../../Asset/Nav/muitenBuutonDen.svg').default} alt="" /> 
                                      </button>
    
                                      </div>
                                    </div>
                                    <div className=" leading-[1]">

                <div className=" flex items-center  justify-between " >
    
                    <div className={`${textHero} w-[40vw] `}>ART</div>
                    
                </div>
                <div className={`${textHero} w-[40vw] `}>
                CONNECTS
                </div>
                <div className="flex items-end">
                    <div className={`${textHero} w-[40vw] `}>US</div>
                   
                </div>      
               </div>
               <div className=" flex text-56px w-[58.6vw] font-[600] ">
                        <span className=" h-fit w-fit   leading-[1.05]">
    
                        16-22&#169;
                        </span>
                    </div>
            </div>
            </div>
        );
    }else{

        return (
            <div className={`min-h-screen  pt-[70px] pb-[200px] bg-primary to-[transparent]  w-screen flex flex-col items-center justify-end `}>
    
            <div className='h-[90vh] px-[1.5%] w-screen flex flex-col '>
                <div className=" flex items-center w-[96vw] justify-between h-[15vw]" >
    
                    <div className={`${textHero} w-[40vw] `}>ART</div>
                    <div className='flex gap-[6vw]  items-start pt-[2.1vh]  text-[1vw]  h-[7rem]  text-[#1B1D21] '>
                                    <div>
                                        PHỐ BÊN ĐỒI
                                    </div>
                                   
                                    <div className=' ' >
                                      <div>STUDIO</div>
                                      <div>ĐÀ LẠT, LÂM ĐỒNG</div>
                                    </div>
                                      <div>
                                      <div>OFFICE</div>
                                      <div>TP.HỒ CHÍ MINH</div>
                                      </div>
                                      <div className=" flex flex-col items-end">
                                      <button onClick={()=>{
                                          window.open("https://accounts.google.com/AccountChooser/signinchooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser", '_blank')
                                      }}  className='flex gap-1 items-center'><u>INFO@PHOBENDOI.ART</u><img className='h-3 object-contain rounded-none w-3' src={require('../../Asset/Nav/muitenBuutonDen.svg').default} alt="" /> </button>
                                      <button className='flex gap-1 items-center'>{`(+84) 97 411 0770`} </button>
                                      </div>
                                    </div>
                </div>
                <div className={`${textHero} w-[40vw] `}>
                CONNECTS
                </div>
                <div className="flex items-end">
                    <div className={`${textHero} w-[40vw] `}>US</div>
                    <div className=" flex items-end justify-end text-[8vw] text-right w-[58.6vw] font-[600] ">
                        <span className=" h-fit w-fit   leading-[1.05]">
    
                        16-22&#169;
                        </span>
                    </div>
                </div>      
            </div>
            </div>
        );
    }
  }
  
  export default Section1;
  