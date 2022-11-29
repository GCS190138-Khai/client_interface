import { useLayoutEffect } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import Sct1W from "./Sct1W";
import Sct2W from "./Sct2W";


import { useEffect } from "react";

import { useWindowWidth } from "@react-hook/window-size";
import MBSct2W from "./Sct2WMB";
gsap.registerPlugin(ScrollTrigger);
function Work() {
  
  const yellow = useRef()
  const bg = useRef()
  const  w = useWindowWidth()
 useEffect(() => {
  let abortController = new AbortController();  

  
    ScrollTrigger.batch(yellow.current,{
      start:"top center" ,
       end:"+=200",
      onEnter:()=>{ gsap.to(bg.current,{ duration:0.5,backgroundColor:"#F7F3EE" }) 
                 
             },
      onLeaveBack:()=>{
        gsap.to(bg.current,{ duration:0.5,backgroundColor:"#ffdd00" }) 
    
      }
    })
    

  return () => {
    abortController.abort()
  };
}, [])

//   useEffect(()=>{
//     let abortController = new AbortController();  
 
//     return ()=>{
    
//     }
//  },[dispatch])

  return (  
    
  <div ref={bg} className="work bg-primaryYellow " >
    <Sct1W/>
    <div ref={yellow} className=" w-screen h-[1vh]"></div>
    {w>1024?<Sct2W/>:<MBSct2W></MBSct2W>}
 
    
  </div>
  );
}

export default Work;
