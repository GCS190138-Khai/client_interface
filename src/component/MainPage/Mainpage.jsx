

import React   from "react"
import Section3 from './Sct3'
import Section4 from './Sct4'
import Section5 from './Sct5'
import Section6 from './Sct6'
import Section7 from './Sct7'

import {gsap, Power2} from 'gsap'

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import Section1 from './Sct1'
import Section2 from './Sct2'
import { useWindowWidth } from "@react-hook/window-size"
import Section2MB from "./Sct2MB"
 

 

gsap.registerPlugin(ScrollTrigger, Observer ,Flip);






function Mainpage (){

const thisWidth = useWindowWidth()
   
   

    return(
        <React.Fragment>
            <div >

        <div className="  " >

        <Section1   ></Section1>
        </div>
  
       {thisWidth<1024? <Section2MB></Section2MB>  :<Section2></Section2> }  
 
        <div className="   " >
        
        <Section4/>
</div>
        <div className="  " >

        <Section3/>
</div>
        <div className="  " >

        <Section5/>
</div>
        <div className="  " >

        <Section6/>
</div>
        <div className="  " >

        <Section7/>
</div>
            </div>
     
   
        </React.Fragment>
    )
}
export default Mainpage;