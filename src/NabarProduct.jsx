/* eslint-disable jsx-a11y/anchor-is-valid */
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { Observer } from "gsap/Observer";
import { useSelector ,useDispatch } from 'react-redux';
import {Link, NavLink, Outlet} from "react-router-dom"
import { offStatic, onStatic, primaryBGBlack } from './redux/navSlice';
import { useWindowWidth } from '@react-hook/window-size';
gsap.registerPlugin( Observer);
// eslint-disable-next-line import/no-anonymous-default-export
export default function ({handleClick}) {


  const navTextColor = useSelector((state)=>state.nav.color.textColor)
  const quantity = useSelector((state)=>state.nav.cart)
  
  const[  isOpen,setIsOpen] = useState(false)
  const[  isOpen2,setIsOpen2] = useState(false)
  const [isButton, setisButton] = useState(false)
  const helper2 = useRef(null)
  const menu = useRef(null)
  const Nav = useRef(null)
  const menu2 = useRef(null)
  const dispacth = useDispatch()
  
  const filter = useRef(null)
  const isMb = useWindowWidth()
  const [pages,setPages]=useState(
      [{
        title:"Về Chúng Tôi",
        EngSub:"About Us",
        link:"/aboutus"
  },{
    title:"Dịch Vụ & Dự Án",
    EngSub:"Work",
    link:"/work"
  },{title:"Sự Kiện",
    EngSub:"Events",
    link:"/event"
  },
  {title:"Cửa Hàng",
  EngSub:"Shop",
    link:"/shop"
  },
  {title:"Liên Hệ",
  EngSub:"Contact",
    link:"/contact"
  },
]
  )
  const [loggin,setLoggin]=useState(
    [{
      title:"Đăng Nhập",
      link:"/account"
},
// {
//   title:"Đăng Ký",
//   link:"#"
// }
]
)
const goTop=()=>{
 
  gsap.to( window,{duration:1, scrollTo:{
    y:0
  }})
 
}
const currentUser = useSelector((state)=>state.auth.login.currentUser)
    const button = ` h-[5vh]  ${navTextColor}  text-[1.1rem] font-button   rounded-lg  hover:bg-white-50 hover:${navTextColor}  `
    const buttonOpen = ` h-[5vh] text-[#FFFFFF] text-[1.1rem]  font-button   rounded-lg  hover:bg-white-50 hover:${navTextColor}  `
    const handleToggle = () => {
      
        if(!isOpen){

          const  tl = gsap.timeline({onComplete:()=>{
            gsap.to(menu.current,{duration:0.2,translateY:"0",opacity:1,display:'flex'})
            gsap.to(menu2.current,{duration:0.2,translateY:"0",opacity:1,display:'flex'})
           
            setIsOpen(!isOpen)
            setIsOpen2(!isOpen2)
            setisButton(false)
            handleClick(true)
          
          }})
     
          tl.to(menu.current,{duration:0.2,translateY:"10px",opacity:0,display:'none'})
          tl.to(menu2.current,{duration:0.2,translateY:"10px",opacity:0,display:'none'},"<")
          tl.to(filter.current,{height:"screen",duration:0.2},"<")
   
          tl.to(helper2.current,{
            keyframes:[
              {duration:0.3,height:"25vh",translateY:"-7vh",borderRadius:"50% 50% 50% 50%",scale:1.2},
              {duration:0.7,height:"120vh",translateY:"-45vh",borderRadius:"50% 50% 50% 50%",scale:1.4},
              {duration:0.1,translateY:"0",width:"100vw",borderRadius:"0 0 0 0",scale:1},
              {duration:0.1,height:"100vh"},
            ],ease:"power4.inOut"
        },"<")
        
       
        
    
        }else{
       
          setIsOpen2(!isOpen2)
            const  tl = gsap.timeline({onComplete:()=>{
              gsap.to(menu.current,{duration:0.2,translateY:"0",opacity:1,display:'flex'})
              gsap.to(menu2.current,{duration:0.2,translateY:"0",opacity:1,display:'flex'})
             
              setIsOpen(!isOpen)
              setisButton(false)
              handleClick(false)
    
            }
              
            })
        
            tl.to(menu.current,{duration:0.5,translateY:"10px",opacity:0,display:'none'})
            tl.to(menu2.current,{duration:0.5,translateY:"10px",opacity:0,display:'none'},"<")
            
       
            tl.to(helper2.current,{
              keyframes:[
                {duration:0.5,height:"0"},
              ],ease:"power4.inOut"
          },"<")
          tl.to(filter.current,{height:"0",duration:0.2})
         
        }
      };
      useEffect(()=>{
        let abort = new AbortController()
        const hide=()=>{
          if(!isOpen){

              gsap.to(Nav.current,{
                  duration:0.5,
                  overwrite:true,
                  translateY:"-300",
                  ease:"back.out"
              })
          }
      }
      const show=()=>{
        if(!isOpen){
          gsap.to(Nav.current,{
              
              duration:0.5,
              overwrite:true,
              translateY:"",
              ease:"back.out"
          })
        }
      }
       
      
          gsap.to(Nav.current,{display:"flex"})
        Observer.create({
            id:"1",
            target:window,
            type:"wheel,touch,scroll",
            onUp:()=>{show()},
            onDown:()=>{hide()}
            
        })
        
       
        return () => {  
          
          Observer.getById('1').kill()
          abort.abort();  
          }  
      },[isOpen])
if(isMb<1024){
  return (
    <div ref={Nav}  className={isOpen?"w-screen z-1000 fixed":"w-screen z-50"}>
       
<nav  className={"   bg-[transparent] fixed w-screen h-[70px] z-[100]   sm:px-0 "}  >
     <div className=' h-[0] w-screen fixed flex flex-col ' ref={filter} >
   
            <div className='h-[0] w-[100vw] bg-[#191919] z-[100] fixed flex items-end ' ref={helper2} >
                      {isOpen2?<div className=' gap-[7vh] mb:gap-[5rem] z-[100] flex flex-col bg-[#191919] px-[2%] mb:px-[20px] mb:h-[87vh]   h-[85vh] w-screen '>
                            <div className='flex mb:flex-col mb:gap-[4.4rem] '>
                                
                                <ul className=' w-[50%] mb:w-full mb:flex mb:flex-col mb:gap-2  list-none'>
                                    {pages.map((item)=>{return(<NavLink className={nav=>nav.isActive?"opacity-50 hover:text-primary text-[#F7F3EE]  " :" text-[#F7F3EE]  opacity-100 notmb:hover:text-primaryYellow"} onClick={()=>{handleToggle()
                                    goTop()
                                    }} key={item.title} to={item.link}><li className='leading-[12vh] mb:leading-[1.2] mb:text-30px mb:font-500 font-normal text-aTitle2Vw '>{item.title}</li></NavLink>)})} 
                                </ul>
                       
                                <ul className='w-[50%] mb:w-full list-none'>
                                {loggin.map((item)=>{return(<NavLink className={nav=>nav.isActive?"opacity-50 hover:text-primary text-[#F7F3EE]  " :" text-[#F7F3EE]  opacity-100 notmb:hover:text-primaryYellow"} onClick={()=>{handleToggle()
                                    goTop()
                                    }} key={item.title} to={item.link}><li className='leading-[12vh] mb:leading-[1.2] mb:text-30px mb:font-500 font-normal text-aTitle2Vw '>{currentUser?"Tài Khoản":item.title}</li></NavLink>)})}  
                                    {currentUser?"":<li className={`text-[#F7F3EE] mb:mt-3 mt-[2vh] text-[0.8vw] mb:text-12px font-normal `}>{`(HOẶC`} <Link to={"/account/register"} ><u>ĐĂNG KÝ</u></Link> {`NẾU BẠN CHƯA CÓ TÀI KHOẢN)`} </li>}
                                  
                                </ul>
                            </div>
                            <div className=' flex items-end mb:h-fit h-[25vh] '>
                                <div className='h-[7rem] w-[50%]'>
                                <img className='h-[7rem] w-[7rem]  object-contain ' src={require('./Asset/Nav/logo.png')} alt="123" />
                                </div>
                                <div className='flex mb:text-12px mb:flex-col mb:items-start   items-end pb-[2.3vh] text-[0.8vw]  h-[7rem] justify-between  w-[40%] text-[#F7F3EE] '>
                                <div className=' ' >
                                  <div className=' mb:hidden'>STUDIO</div>
       
                                  <div className=' uppercase mb:hidden tab:hidden ' >ĐÀ LẠT, LÂM ĐỒNG</div>
                                  <div className=' uppercase notmb:hidden '>Phố Bên Đồi</div>
                                </div>
                                  <div>
                                  <div className=' mb:hidden'>OFFICE</div>
                                  <div className=' uppercase mb:hidden tab:hidden '>TP.HỒ CHÍ MINH</div>
                                  <div className=' uppercase notmb:hidden '>(+84) 97 411 0770</div>
                                  </div>
                                  <div>
                                  <div className='flex gap-1 items-center'><u >INFO@PHOBENDOI.ART</u><img className='h-3 object-fill rounded-none w-3' src={require('./Asset/Nav/muitenButton.svg').default} alt="" /> </div>
                                  <div className='flex gap-1 items-center'> <u >FACEBOOK</u> <img className='h-3 object-fill rounded-none w-3' src={require('./Asset/Nav/muitenButton.svg').default} alt="" /> </div>
                                  </div>
                                </div>
                              
                            </div>


                      </div>:''}

            </div>
     </div>
    <div className="flex px-[20px]  justify-between   h-[100%] items-center ">
        <div className='flex gap-5 items-center    ' ref={menu}>
          {!isOpen? <Link  to='/'><button className={`${button} mb:text-aCaption mb:text-600 z-10 `}>TRANG CHỦ</button></Link>:<Link onClick={handleToggle} to='/'><button className={`${buttonOpen} mb:text-600 mb:text-aCaption mb:text-600 z-10 `}>TRANG CHỦ</button></Link> }
           
        </div>
  
        <div className='flex min-w-[120px] justify-end gap-[58px]'ref={menu2} >
           {/* {!isOpen? <button onClick={()=>dispacth(onStatic() )} className={`${button} flex items-center gap-1 `}> <span>GIỎ</span> {quantity.length===0?"":<span className='  font-[400] text-sm '>{quantity.length<10?`(0${quantity.length})`:`(${quantity.length})`}</span>}</button>:''} */}
           {!isOpen? <button onClick={()=>dispacth(onStatic() )} className={navTextColor==="text-whiteText"?` w-[30px] h-[30px]  bg-cover items-center justify-center  bg-no-repeat bg-wcart flex  gap-1 relative `:` w-[30px] h-[30px]  bg-cover items-center justify-center  bg-no-repeat bg-cart flex  gap-1 relative `}>
           {quantity.length===0?"":<span className={`${navTextColor}  font-[400] text-12px `}>{quantity.length<10?`0${quantity.length}`:`${quantity.length}`}</span>}
</button>:''}
            {!isOpen? <button disabled={isButton} onClick={()=>{
              setisButton(true)
              handleToggle()}} className={navTextColor==="text-whiteText"?`${button} bg-wmenu bg-no-repeat w-[30px] h-[30px] z-10 `:`${button} bg-menu bg-no-repeat w-[30px] h-[30px] z-10 `} ></button> : <button disabled={isButton} onClick={()=>{
                setisButton(true)
                handleToggle()}} className={`${buttonOpen} bg-closemenu bg-center bg-no-repeat w-[30px] h-[30px] z-10 `} ></button>}
        </div>
    </div>
    

</nav>


    </div>
  )
}else{

  return (
    <div ref={Nav}   className={isOpen?"w-screen z-1000 fixed":"w-screen z-50"}>
       
       <nav  className={"bg-[transparent] fixed w-screen h-[10vh] z-[100]   sm:px-0 "}  >
     <div className=' h-[0] w-screen fixed flex flex-col ' ref={filter} >
   
            <div className='h-[0] w-[100vw] bg-[#191919] z-[100] fixed flex items-end ' ref={helper2} >
                      {isOpen2?<div className=' gap-[7vh] z-[100] flex flex-col bg-[#191919] px-[2%]   h-[85vh] w-screen '>
                            <div className='flex '>
                                
                                <ul className=' w-[50%]  list-none'>
                                    {pages.map((item)=>{return(<NavLink className={nav=>nav.isActive?"opacity-50 hover:text-primary text-[#F7F3EE]  " :" text-[#F7F3EE]  opacity-100 hover:text-primaryYellow"} onClick={()=>{handleToggle()
                                    goTop()
                                    }} key={item.title} to={item.link}><li className='leading-[12vh] font-normal text-aTitle2Vw '>{item.title}</li></NavLink>)})} 
                                </ul>
                       
                                <ul className='w-[50%] list-none'>
                                {loggin.map((item)=>{return(<NavLink className={nav=>nav.isActive?"opacity-50 hover:text-primary text-[#F7F3EE]  " :" text-[#F7F3EE]  opacity-100 hover:text-primaryYellow"} onClick={()=>{handleToggle()
                                    goTop()
                                    }} key={item.title} to={item.link}><li className='leading-[12vh] font-normal text-aTitle2Vw '>{currentUser?"Tài Khoản":item.title}</li></NavLink>)})}  
                                    {currentUser?"":<li className={`text-[#F7F3EE] mt-[2vh] text-[0.8vw] font-normal `}>{`(HOẶC`} <Link to={"/account/register"} ><u>ĐĂNG KÝ</u></Link> {`NẾU BẠN CHƯA CÓ TÀI KHOẢN)`} </li>}
                                  
                                </ul>
                            </div>
                            <div className=' flex items-end h-[25vh] '>
                                <div className='h-[7rem] w-[50%]'>
                                {/* <img className='h-[7rem] w-[7rem]  object-contain ' src={require('./Asset/Nav/logo.png')} alt="123" /> */}
                                <div className='h-[7rem] bg-logo bg-no-repeat w-[7rem] '></div>
                                </div>
                                <div className='flex   items-end pb-[2.3vh] text-[0.8vw]  h-[7rem] justify-between  w-[40%] text-[#F7F3EE] '>
                                <div className=' ' >
                                  <div>STUDIO</div>
                                  <div>ĐÀ LẠT, LÂM ĐỒNG</div>
                                </div>
                                  <div>
                                  <div>OFFICE</div>
                                  <div>TP.HỒ CHÍ MINH</div>
                                  </div>
                                  <div>
                                  <div className='flex gap-1 items-center'><u >INFO@PHOBENDOI.ART</u><img className='h-3 object-contain rounded-none w-3' src={require('./Asset/Nav/muitenButton.svg').default} alt="" /> </div>
                                  <div className='flex gap-1 items-center'> <u >FACEBOOK</u> <img className='h-3 rounded-none w-3' src={require('./Asset/Nav/muitenButton.svg').default} alt="" /> </div>
                                  </div>
                                </div>
                              
                            </div>


                      </div>:''}

            </div>
     </div>
    <div className="flex px-[2%]  justify-between   h-[100%] items-center ">
        <div className='flex gap-5 items-center    ' ref={menu}>
          {!isOpen? <Link  to='/'><button className={`${button} z-10 `}>TRANG CHỦ</button></Link>:<Link onClick={handleToggle} to='/'><button className={`${buttonOpen} z-10 `}>TRANG CHỦ</button></Link> }
           
        </div>
        <div className=" spacer  w-[50%] "></div>
        <div className='flex min-w-fit gap-[5rem]'ref={menu2} >
           {!isOpen? <button onClick={()=>dispacth(onStatic() )} className={`${button} flex items-center gap-1 `}> <span>GIỎ</span> {quantity.length===0?"":<span className='  font-[400] text-sm '>{quantity.length<10?`(0${quantity.length})`:`(${quantity.length})`}</span>}</button>:''}
            {!isOpen? <button disabled={isButton} onClick={()=>{
              setisButton(true)
              handleToggle()}} className={`${button} z-10 `} >MENU</button> : <button disabled={isButton} onClick={()=>{
                setisButton(true)
                handleToggle()}} className={`${buttonOpen} z-10 `} >ĐÓNG</button>}
        </div>
    </div>
    

</nav>


    </div>
  )
}
}
