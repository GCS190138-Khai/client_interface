

import React,{useRef,useEffect,useState}  from "react"
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
import { connect } from 'react-redux'
import Footer from '../../footer'

import { useSelector ,useDispatch } from 'react-redux';
import { lightBg } from "../../redux/navSlice"

gsap.registerPlugin(ScrollTrigger, Observer ,Flip);






function Mainpage (){
    
    


    return(
        <React.Fragment>
        <Section1></Section1>
        <Section2></Section2>   
        <Section4/>
        <Section3/>
        <Section5/>
        <Section6/>
        <Section7/>
     
   
        </React.Fragment>
    )
}
export default Mainpage;