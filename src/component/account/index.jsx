import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 

 
import { logOut } from "../../api";
import { createAxios } from "../../createInstance";
import { loginSuccess, logOutSuccess } from "../../redux/authSlice";
import { primaryBG } from "../../redux/navSlice";
import Edit from "./edit";
import zhCN from "date-fns/esm/locale/zh-CN/index";

function Account() {

  //if currentUser = true render <Info></Info>
  const navigate = useNavigate()
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  const [editState, setEditState] = useState('none')
  useEffect(()=>{
    dispatch(primaryBG())
  })
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
 let axios = createAxios(currentUser,dispatch)
console.log(editState)
 const handleLogOut = ()=>{
   logOut(dispatch,currentUser._id,navigate,currentUser.accessToken,axios)
 }
 const handleEdit = async (index,type)=>{

  if(index===0){

       setEditState("info")
       
  }else if(index===1){

    setEditState("password") 
  }
  else{
   
      setEditState(type)
 
   
   
    
  }
 }
  return ( 
    <div className=" pt-[16vh] pb-[10vh] bg-primary flex flex-col min-h-screen w-screen mb:px-[20px] px-[2vw]">
      <div className={!currentUser?" flex items-start mb:hidden   h-[27vh]":"border-b border-primaryBlack mb:gap-[3.75rem] mb:h-fit  flex flex-col justify-between h-[27vh]"}>
        <div className=" mb:text-56px text-aTitle1 mb:leading-[0.8] font-[600]">Tài Khoản</div>
        {currentUser?<div className=" w-full flex justify-between mb:text-12px text-aCaption font-[400] pb-[0.6vh]  uppercase"> <span>Xin chào, {currentUser.name}</span> <span onClick={()=>handleLogOut()} className=" cursor-pointer font-[600] ">Đăng xuất</span> </div>:""}
      </div>
      {/*  */}
      <div className="  min-h-[65%] mb:flex-col flex">
      { !currentUser?
        <div className="  mb:w-full mb:flex mb:gap-[1.25rem]  w-[30vw]">
          {unlogged.map((item,i)=>{
            return (
              <NavLink to={item.link} key={item.link+i} end={i===0?true:false}  className={nav=>nav.isActive?"opacity-100":"opacity-50"}>
              <div  className=" mb:text-28px text-aSubtitle font-title-Subtitle">
                {item.title}
              </div>
              </NavLink>
            )
          })}
      </div>
      :
      editState==="none"?<div className=" flex flex-col h-full justify-center pt-[10vh] gap-[17vh] mb:w-full  w-[34%]">
      {logged.map((item,i)=>{
        return (
          <div  key={item}  className=" mb:w-full w-[12vw]" >
          <div  className=" mb:flex mb:text-28px mb:justify-between capitalize text-aSubtitle font-title-Subtitle">
            {item}  <div onClick={()=>{handleEdit(i)}} className=" notmb:hidden cursor-pointer  text-[#767676] border-b border-[#767676] w-fit h-[4.5vh] flex items-end leading-[1] mb:text-12px  text-aButtonVw font-semibold ">Sửa</div>
          </div>
          {i===0&&<div className=" notmb:hidden pt-[1.25rem]  flex">
              <div className=" mb:w-full notmb:hidden mb:text-12px w-[16%]  gap-[1.25rem]   text-aCaption font-[400] flex flex-col">
                  <div className=" mb:flex-col h-[5vh]  flex  "> 
                  <span className="opacity-50">
                    HỌ & TÊN 
                    </span> 
                  <div className="  mb:text-16px h-[5vh] items-end flex   ">{currentUser.name}</div>
                  </div>
                  <div className=" mb:flex-col h-[5vh]  flex  "> 
                  <span className="opacity-50">
                    EMAIL 
                    </span> 
                  <div className=" mb:text-16px  h-[5vh] items-end flex   ">{currentUser.email}</div>
                  </div>
                  <div className=" mb:flex-col h-[5vh]  flex  "> 
                  <span className="opacity-50">
                    SĐT 
                    </span> 
                  <div className=" mb:text-16px  h-[5vh] items-end flex   ">{currentUser.phone?currentUser.phone:"Chưa có"}</div>
                  </div>
                  <div className=" mb:flex-col h-[5vh] flex  "> 
                  <span className="opacity-50">
                    ĐỊA CHỈ 
                    </span> 
                  <div className=" mb:text-16px  h-[5vh] items-end flex   ">{currentUser.address?currentUser.address:"Chưa có"}</div>
                  </div>
              </div>
         
              <div>
               
              </div>
          </div>}
          {i===1&&<div className=" notmb:hidden pt-[1.25rem]  flex">
              <div className=" mb:w-full notmb:hidden mb:text-12px w-[16%]  gap-[1.25rem]   text-aCaption font-[400] flex flex-col">
                  <div className=" mb:flex-col h-[5vh]  flex  "> 
                  <span className="opacity-50">
                    TÊN NGƯỜI DÙNG
                    </span> 
                  <div className="  mb:text-16px h-[5vh] items-end flex   ">{currentUser.username}</div>
                  </div>
                  <div className=" mb:flex-col h-[5vh]  flex  "> 
                  <span className="opacity-50">
                  MẬT  KHẨU
                    </span> 
                    <div className=" h-[5vh] items-end flex   "> <input disabled className=" bg-primary  p-0  border-none outline-none" value={"asdlhfhasud"} type="password" name="" id="" />  </div>
                  </div>
           
              </div>
         
              <div>
               
              </div>
          </div>}
          </div>
        )
      })}
  </div>:""
      }
      <div className=" mb:w-full w-[66%]">
        {
          !currentUser?<Outlet></Outlet>:

          editState==='none'?
         <div className=" mb:hidden flex flex-col  justify-center pt-[6vh] gap-[8.5vh] h-full w-full">
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
                <div onClick={()=>{handleEdit(null,"info")}} className=" cursor-pointer  text-[#767676] border-b border-[#767676] w-fit h-[4.5vh] flex items-end leading-[1]  text-aButtonVw font-semibold ">Sửa</div>
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
                  <div className=" h-[5vh] items-end flex   "> <input disabled className=" bg-primary  p-0  border-none outline-none" value={"asdlhfhasud"} type="password" name="" id="" />  </div>
              </div>
              <div>
                <div onClick={()=>{handleEdit(null,"password")}} className=" cursor-pointer  text-[#767676] border-b border-[#767676] w-fit h-[4.5vh] flex items-end leading-[1]  text-aButtonVw font-semibold ">Sửa</div>
              </div>
          </div>
         </div> :
          <Edit prop={editState} setBackState={setEditState} ></Edit>
          }
      </div>
      </div>
    </div>
   );
}

export default Account;