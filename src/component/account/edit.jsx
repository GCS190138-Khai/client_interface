import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
 

import { useForm } from "react-hook-form";
import {   registerUser } from '../../api';
import './this.css'
import { useNavigate } from 'react-router-dom';
import { createAxios } from "../../createInstance";
import { loginSuccess } from '../../redux/authSlice';
function Edit({prop,setBackState}) {
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
    
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    password:"",
    repassword:""  
  });
  const editState =prop
  console.log(editState)
  const [isShowPass, setisShowPass] = useState(false)
  const [isCormfim, setisCormfim] = useState(true)
  const [messageErrOfUsername, setMessageErrOfUsername] = useState(true)
  const [messOfEmail, setmessOfEmail] = useState(true)
  const dispatch =useDispatch()
  const [passwordErr, setpasswordErr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
    // if(!currentUser){
  //   navigate('/account')
  // }
  let axios = createAxios(currentUser,dispatch)
  const handleLogin= async (data)=>{ 
    setIsLoading( <div className="div">Loading...</div> )
    if(!data.password){
      
               try {
          const res =     await axios.put(`https://api.phobendoi.art/api/auth/re-info`,{id:currentUser._id,
            info:data
          },{
              headers:{token:`Bearer ${currentUser.accessToken}`}
          })
      
          const newUser = res.data
          dispatch(loginSuccess({...currentUser,newUser}))
        
          setBackState('none')
          setIsLoading(false)
      } catch (error) {
          console.log(error)
          setIsLoading(false)
      }
    }else{
      
      try {


        try {
          const resCheck =     await axios.post(`https://api.phobendoi.art/api/auth/re-user-password-check`,{id:currentUser._id,
          password:data.old_password
        },{
            headers:{token:`Bearer ${currentUser.accessToken}`}
        })
  
        if(!resCheck.data){
            console.log(resCheck.data)
          return setpasswordErr('*M???t kh???u c?? kh??ng ch??nh x??c')
        }
        } catch (error) {
          console.log("hcy")
          console.log(error)
        }
  
        const res =     await axios.put(`https://api.phobendoi.art/api/auth/re-user-password`,{id:currentUser._id,
          password:data.password
        },{
            headers:{token:`Bearer ${currentUser.accessToken}`}
        })
  
        setBackState('none')
        alert(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error)
        setIsLoading(false)
    }

    }
   
   
  
  }

  useEffect(()=>{
      const subscription= watch((data)=>{
        setmessOfEmail(true)
        setMessageErrOfUsername(true)
          if(data.password!==data.repassword){
            setisCormfim(false)
          }
          if(data.password===data.repassword){
            setisCormfim(true)
          }
      })
      return ()=>{
        subscription.unsubscribe()
      }
  },[watch])
  return (  
    <div className="dv pt-[5.5rem] mb:pt-[3.75rem]"> 
     <div onClick={()=>setBackState('none')} className=" mb:px-[20px]  cursor-pointer min-w-[12%] items-center flex gap-2">
         <span className=" flex items-center justify-center "> 
         <img src={require("../Events/ar.png")} alt="error" className=" object-contain mb:h-[1rem] mb:w-[1rem]  h-[1.125rem] w-[1.125rem] " /> 
         </span> 
         <span className=" mb:text-12px    text-aCaption font-normal uppercase ">{`quay l???i`} <div className=" border-t-[1px] mt-[-0.4vh] border-primaryBlack w-[100%]" ></div></span>
        </div>
      <form onSubmit={handleSubmit((e)=>{
       
        handleLogin(e)
      })} className=' flex flex-col mb:gap-[2.5rem] pt-[5.5rem] mb:pt-[3.75rem]  gap-[15px] mb:w-full h-fit w-[57.2vw]  '>
                {editState==='info'&&<div className=' cont_input   '>
                  <input className=' .inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*????y l?? tr?????ng b???t bu???c"})} type="text" placeholder='   H??? & T??n*' 
                   />
                      
                <p className=' mb:text-12px text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>}
                {editState==='info'&&<div className=' cont_input   '>
                  <input className=' .inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("address")} type="text" placeholder='   ?????a ch???*' 
                   />
                      
                <p className=' mb:text-12px text-aCaption font-title2-caption text-[#FF0000]'>{}</p> 
                </div>}
                {/**/}
                {editState==='info'&&<div className=' cont_input   '>
                  <input value={currentUser.email} readOnly className='.inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp'  type="text" placeholder='   Email*' 
                   />
                      
                <p className='mb:text-12px text-aCaption font-title2-caption text-[#FF0000]'>{messOfEmail?errors.email?.message:"*Email ???????c s??? d???ng. Vui l??ng ch???n m???t t??n ng?????i d??ng kh??c."}</p> 

                </div>}
                {/*  */}
                {editState==='info'&&<div className=' cont_input   '>
                  <input className='.inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("phone",{required:"*????y l?? tr?????ng b???t bu???c",min:{
                    value:9,
                    message:"*S??? ??i???n tho???i ph???i c?? ??t nh???t 9 ch??? s???"
                  }})} type="tel" placeholder='   S??? ??i???n Tho???i*' 
                   />
                      
                <p className='mb:text-12px text-aCaption font-title2-caption text-[#FF0000]'>{errors.phone?.message}</p> 
                </div>}
                {editState==='password'&&
                <div className=' cont_input   '>
                  <input readOnly value={currentUser.username} className='.inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("username",{required:"*????y l?? tr?????ng b???t bu???c"})} type="text" placeholder='   T??n Ng?????i D??ng*' 
                   />
                      
                <p className='mb:text-12px text-aCaption font-title2-caption text-[#FF0000]'>{messageErrOfUsername?errors.username?.message:"*T??n ng?????i d??ng ???? ???????c s??? d???ng. Vui l??ng ch???n m???t t??n ng?????i d??ng kh??c."}</p> 
                </div>}
                {/* repassword */}
                {editState==='password'&&<div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className='.inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                 {...register("old_password",{required:"*????y l?? tr?????ng b???t bu???c",
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/i,
                    message: "*M???t kh???u ph???i c?? ????? d??i t??? 8 ?????n 16 k?? t???, ??t nh???t m???t ch??? c??i vi???t hoa, m???t ch??? s???"
                  }})} type={isShowPass?"text":"password"} placeholder='   M???t Kh???u c??*' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute mb:text-12px w-fit h-fit'> {isShowPass?"???n":"Hi???n"}</span>
                  </div>
              
               { passwordErr&&<p className='mb:text-12px self-start text-aCaption font-title2-caption text-[#FF0000]'>{passwordErr}</p> }
                </div>}
                {editState==='password'&&<div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className='.inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                 {...register("password",{required:"*????y l?? tr?????ng b???t bu???c",
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/i,
                    message: "*M???t kh???u ph???i c?? ????? d??i t??? 8 ?????n 16 k?? t???, ??t nh???t m???t ch??? c??i vi???t hoa, m???t ch??? s???"
                  }})} type={isShowPass?"text":"password"} placeholder='   M???t Kh???u*' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute mb:text-12px w-fit h-fit'> {isShowPass?"???n":"Hi???n"}</span>
                  </div>
              
                <p className='mb:text-12px self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.password?.message}</p> 
                </div>}
                {/*  */}
                {editState==='password'&&<div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className='.inp2 bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                 {...register("repassword",{required:"*????y l?? tr?????ng b???t bu???c",
                  
                })} type={isShowPass?"text":"password"} placeholder='   Nh???p L???i M???t Kh???u*' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit mb:text-12px h-fit'> {isShowPass?"???n":"Hi???n"}</span>
                  </div>
              
                <p className='mb:text-12px self-start text-aCaption font-title2-caption text-[#FF0000]'>{isCormfim?errors.repassword?.message:"*M???t kh???u kh??ng kh???p"}</p> 
                </div>}
              
                <div className=' mb:hidden spacer h-[6vh]'></div>
                {isLoading||<button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">L??U TH??NG TIN</u> </button>}
      </form>
    </div>
  );
}

export default Edit;