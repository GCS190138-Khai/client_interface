

import React,{ useState}  from "react"
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

import {primaryBG} from '../../redux/navSlice'
import {  useDispatch } from 'react-redux';

gsap.registerPlugin(ScrollTrigger)
function Section1() {
    const [textHero,setTextHero]=useState('text-[15vw] leading-[14vw] font-[600]')
    const dispatch = useDispatch()

       

        dispatch(primaryBG())
 
  

   
    

    return (
        <div className={`min-h-screen pt-[70px] pb-[200px] bg-primary to-[transparent]  w-screen flex flex-col items-center justify-end `}>

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
  
  export default Section1;
  