
import './App.css';

import {
  

 
  Outlet
} from "react-router-dom";

import{useEffect, useRef, useState} from 'react'


import {gsap } from 'gsap'
import {        } from "./redux/authSlice";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllEvent    } from './api';
 
import Nabar from './Nabar';
import Footer from './footer';
import EventCart from './eventCart';
import { getEventPayment } from './selector';
import { isOffNav, offEventCart } from './redux/navSlice';
import ShopCart from './Cart';
import Bought from './BuyingSuccess';
gsap.registerPlugin(ScrollTrigger );


function App() {

  const dispatch = useDispatch();
 
 
  const body = useRef(null)
  
 
 
   
   
  const eventCart = useSelector((state)=>getEventPayment(state))
  const isStatic = useSelector((state)=>state.nav.static)
  const isOn = useSelector((state)=>state.nav.isOn)
  const isBuySuccess = useSelector((state)=>state.nav.isBuySuccess)
  
  const [isLoading, setIsLoading] = useState(true)
  // useEffect(()=>{

  //   getAllEvent(dispatch) 

  // })
  

  useEffect(()=>{
    
    let arbort = new AbortController();
    if(isLoading){
  
      (async () => {
        await    getAllEvent(dispatch) 
       
        return  setIsLoading(false)
         
       
      })();
    }else{
  
      
    }
 
    return ()=>{
      arbort.abort()
     }
  },[isLoading])
  useEffect(()=>{
    dispatch(offEventCart())
  },[])

useEffect(()=>{
  dispatch(isOffNav())
},[isLoading])
if(isLoading){
  return(
    <div>
      Loading.....
    </div>
  )}else{
   
   

      return (  
        <>
        <div  className="App"  ref={body}>
        <div className=' z-[1000]'>

          {eventCart.isOpen?<EventCart></EventCart>:""}
        </div>
          {eventCart.isOpen?"":<div className=' z-10'>
          <Nabar></Nabar>
          </div>}
          <div className=' -z-10'>
          {isStatic?<ShopCart></ShopCart>:""}
          {isBuySuccess?<Bought></Bought>:""}
          {isOn?
          <div className=" gap-[50px] text-[32px] flex flex-col items-center justify-center h-screen w-screen">

              <span>Loading..., Nếu trang vẫn không load được bạn hãy nhấn vào nút bên dưới!</span>
              <span className=' border border-primaryBlack  cursor-pointer' onClick={()=>{ dispatch(isOffNav())}} > Bấm vào đây để thử lại</span>

          </div>
          :<Outlet></Outlet>}
          </div>
          <Footer></Footer>
        </div>
         
          </>
      );
    }

}

export default App;
