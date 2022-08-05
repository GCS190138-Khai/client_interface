import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 

 
import { logOut } from "../../api";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";

function Account() {

  //if currentUser = true render <Info></Info>
  const navigate = useNavigate()
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  

  const dispatch = useDispatch()
 const  unlogged =[{
  title:"Đăng nhập",
  link:"/account",
 },{
  title:"Đăng ký",
  link:"/account/register",
 }]
 const  logged =[
  "Thông tin chi tiết",
  "thông tin tài khoản"
 ]
 let axios = createAxios(currentUser,dispatch,logOutSuccess())
 const handleLogOut = ()=>{
   logOut(dispatch,currentUser._id,navigate,currentUser.accessToken,axios)
 }
  return ( 
    <div className=" pt-[16vh] pb-[10vh] flex flex-col min-h-screen w-screen px-[2vw]">
      <div className={!currentUser?" flex items-start   h-[27vh]":"border-b border-primaryBlack  flex flex-col justify-between h-[27vh]"}>
        <div className=" text-aTitle1 font-[600]">Tài Khoản</div>
        {currentUser?<div className=" w-full flex justify-between text-aCaption font-[427] pb-[0.6vh]  uppercase"> <span>Xin chào, {currentUser.name}</span> <span onClick={()=>handleLogOut()} className=" cursor-pointer font-[600] ">Đăng xuất</span> </div>:""}
      </div>
      {/*  */}
      <div className=" min-h-[65%] flex">
      { !currentUser?
        <div className="  w-[30vw]">
          {unlogged.map((item,i)=>{
            return (
              <NavLink to={item.link} key={item.link+i} end={i===0?true:false}  className={nav=>nav.isActive?"opacity-100":"opacity-50"}>
              <div  className=" text-aSubtitle font-title-Subtitle">
                {item.title}
              </div>
              </NavLink>
            )
          })}
      </div>
      :
      <div className=" flex flex-col h-full justify-center pt-[10vh] gap-[17vh]  w-[34%]">
      {logged.map((item,i)=>{
        return (
          <div  key={item}  className=" w-[12vw]" >
          <div  className=" capitalize text-aSubtitle font-title-Subtitle">
            {item}
          </div>
          </div>
        )
      })}
  </div>
      }
      <div className=" w-[66%]">
        {
          !currentUser?<Outlet></Outlet>:
         <div className=" flex flex-col  justify-center pt-[6vh] gap-[8.5vh] h-full w-full">
          <div className="  flex">
              <div className=" w-[16%] opacity-50 gap-[0.5vh]   text-aCaption font-[400] flex flex-col">
                  <div className=" h-[5vh] items-end flex  "> HỌ & TÊN </div>
                  <div className=" h-[5vh] items-end flex  "> EMAIL </div>
                  <div className=" h-[5vh] items-end flex  "> SĐT</div>
                  <div className=" h-[5vh] flex items-end "> ĐỊA CHỈ </div>
              </div>
              <div className="gap-[0.5vh] w-[67%] flex flex-col text-aPara leading-[1.2] font-light ">
                  <div className=" h-[5vh] items-end flex   ">{currentUser.name}</div>
                  <div className=" h-[5vh] items-end flex   ">{currentUser.email}</div>
                  <div className=" h-[5vh] items-end flex   ">{currentUser.phone?currentUser.phone:"Chưa có"}</div>
                  <div className=" h-[5vh] items-end flex   ">{currentUser.address?currentUser.address:"Chưa có"}</div>
              </div>
              <div>
                <div className=" cursor-pointer  text-[#767676] border-b border-[#767676] w-fit h-[4.5vh] flex items-end leading-[1]  text-aButtonVw font-semibold ">Sửa</div>
              </div>
          </div>
          {/*  */}
          <div className="   flex">
              <div className=" w-[16%] opacity-50 gap-[0.5vh]   text-aCaption font-[400] flex flex-col">
                  <div className=" h-[5vh] items-end flex  ">TÊN NGƯỜI DÙNG</div>
                  <div className=" h-[5vh] items-end flex  ">MẬT  KHẨU</div>
              </div>
              <div className="gap-[0.5vh]  w-[67%] flex flex-col text-aPara leading-[1.2] font-light ">
                  <div className=" h-[5vh] items-end flex   ">{currentUser.username}</div>
                  <div className=" h-[5vh] items-end flex   "> <input disabled className=" p-0  border-none outline-none" value={"asdlhfhasud"} type="password" name="" id="" />  </div>
              </div>
              <div>
                <div className=" cursor-pointer  text-[#767676] border-b border-[#767676] w-fit h-[4.5vh] flex items-end leading-[1]  text-aButtonVw font-semibold ">Sửa</div>
              </div>
          </div>
         </div> 
          }
      </div>
      </div>
    </div>
   );
}

export default Account;