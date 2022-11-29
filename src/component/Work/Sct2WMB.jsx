
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useSelector ,useDispatch } from 'react-redux';


import React,{useRef,useEffect, useState}  from "react"
import { useLayoutEffect } from "react";
import { getAllProject } from "../../api";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../selector";

import up from '../../arrowUp.svg'

gsap.registerPlugin(ScrollTrigger);

function MBSct2W() {
  
    const txt1 = useRef(null)
    const txt2 = useRef(null)
    const listElements = useRef([])
    const listProjects = useRef([])
    const listArrow = useRef([])
    const [isLoading, setLoading] = useState(true);
    const listLower = useRef([])
    const [tab, setTab] = useState(true)
  const dispatch=useDispatch()
    const navigate=useNavigate()
   const [isAnim, setisAnim] = useState(false)
  //  alert('Hiện web chưa hỗ trợ trên thiết bị di động ')
    const [list, setlist] = useState([
      {
        title:"Studio",
        p1:{
          pic:require('../../Asset/work/Sct2.1.png'),
          tags:["Events Site","Workshops","Creative Hub"]
        },
        state:false
    },
    {
        title:"Cố Vấn",
        pic:require('../../Asset/work/Sct2.1.png'),
        p:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing",
        subTittle1:"Art Curating",
        subTittle2:"Art Management",
        state:false
    },
    {
      title:"Sự Kiện",
      pic:require('../../Asset/work/Sct2.1.png'),
      p:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing",
      subTittle1:"Art Curating",
      subTittle2:"Art Management",
      state:false
  },


  ])   
  const newList = [
    {
      title:"Creative Studio",
      p1:{
        pic:"https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png",
        tags:["Events Site","Workshops","Creative Hub"],
        para1:[" Là không gian văn hóa - sáng tạo tại Đà Lạt, nằm ở trên đường Lý Tự Trọng - trải dài cùng những tán thông ngay tại lõi đô thị của thành phố, Phố Bên Đồi Creative Studio là nơi kết nối và lan tỏa tinh thần Art Connects Us - nghệ thuật kết nối chúng ta của Phố Bên Đồi."],
        para2:"Với các lớp học - workshops, tủ sách cộng đồng và chương trình văn hóa - nghệ thuật được tổ chức thường xuyên, Phố Bên Đồi Creative Studio mong muốn là creative hub - nơi kết nối những người yêu các hoạt động văn hóa - sáng tạo tại Đà Lạt.",

      },
      p2:{
        pic:'https://live.staticflickr.com/65535/52247516157_0988dddd94_o.png',
        tags:["PBĐ x STEMax"],
        para1:["Cùng STEMax phát triển giáo dục STEAM tại Đà Lạt","STEAM (Science - Technology - Engineering - Art - Math) là một phương thức học tập trong đó học sinh sẽ phát triển các năng lực khoa học kỹ thuật và nghệ thuật thông qua các dự án học tập, trải nghiệm thực tế."],
        para2:"Thông qua hình thức giáo dục STEAM, học sinh cũng có thể phát triển năng lực giải quyết vấn đề, trí thông minh cảm xúc, sự sáng tạo và các năng lực nghề nghiệp khác trong tương lai. Với mong muốn đưa giáo dục chất lượng cho thế hệ trẻ của Đà Lạt, Phố Bên Đồi và STEMax kết hợp thực hiện chương trình trải nghiệm STEAM tại Phố Bên Đồi Creative Studio.",
  

      },
      state:false
  },
  {
    title:"Sự kiện",
    p1:{
      pic:"https://live.staticflickr.com/65535/52248775129_83a7360e34_o.png",
      tags:["Public Engagement Via Classical Music,", "Talk",", Exhibition"],
      para1:[" Tổ chức các sự kiện văn hóa - nghệ thuật, kết nối các nghệ sĩ với khán giả qua các chương trình nghệ thuật cộng đồng."],
    },
 
    state:false
  },
  {
    title:"Tư Vấn",
    p1:{
      pic:"https://live.staticflickr.com/65535/52248775154_9c9337b1d3_o.png",
      tags:["Publishment","  Events Consultancy","Communication"],
      para1:[" Giải pháp hình ảnh & nội dung sáng tạo cho các đơn vị và đối tác"],
    },
 
    state:false
  },


]


const listPro = useSelector((state)=>getAllProjects(state))

if(!listPro){
  
  getAllProject(dispatch,15)
}
useEffect(()=>{
  if(listPro){
    setLoading(false)
  }
},[listPro])
useEffect(()=>{
  let abortController = new AbortController();  
 
  if(!tab){
      gsap.set(listProjects.current,{opacity:0,x:200})
      ScrollTrigger.batch(listProjects.current,{
        batchMax:1,
        id:"tab",
        start:"20% 60%",
        end:"+=70",
        onEnter: batch => gsap.to(batch,{ duration:0.4, x:0 ,opacity:1,stagger:{each:0.1 },ease: "back.out(1.7)"}),
        // onLeave: batch => gsap.to(batch,{ duration:0.3, width:"0" ,opacity:0,stagger:{each:0.3 },ease: "back.out(1.7)"}),
        // onEnterBack:batch => gsap.to(batch,{ duration:0.3, width:"100vw" ,opacity:1,stagger:{each:0.3 },ease: "back.out(1.7)"}),
        // onLeaveBack:batch => gsap.to(batch,{ duration:0.3, width:"0" ,opacity:0,stagger:{each:0.3 },ease: "back.out(1.7)"}),
    
      
    
      })
    }
    return ()=>{
      abortController.abort()
    }
},[tab])
    const toggleTab=()=>{
        setTab(!tab)  
    }

    const  play= (index)=>{
      let pt
      index===0?pt="0":pt="3.75rem"
      const tl = gsap.timeline({onStart:()=>{   
        setisAnim(true)
      } ,onComplete: ()=>{  setisAnim(false) }})
          tl.to(listArrow.current[index],{ rotate:"180deg",duration:0.5,ease: "back.out(4)" })
          tl.to(listElements.current[index],{  paddingTop:pt, paddingBottom:"3.75rem",duration:0.2},"<") 
          tl.to(listLower.current[index],{display:"flex",duration:0.5,height:"auto",ease: "back.out(4)"},"<")
          tl.to(listLower.current[index],{display:"flex",opacity:1,duration:0.5,ease: "back.out(4)"},)   
    }
    const reverse=(index)=>{
      const tl = gsap.timeline({onStart:()=>{ setisAnim(true)} ,onComplete:()=>{ setisAnim(false) }})
      tl.to(listArrow.current[index],{ rotate:"0",duration:0.5,ease: "back.out(4)" })
      tl.to(listLower.current[index],{opacity:0,duration:0.2},"<")
      tl.to(listLower.current[index],{duration:0.5,height:"0",ease: "back.out(4)"},"<")
      tl.to(listElements.current[index],{ paddingTop:"1.25rem", paddingBottom:"1.25rem",duration:0.2},"<") 
      tl.to(listLower.current[index],{display:"none",duration:0.1},"<")
    }  
    const handleToggle=(index)=>{
    
      if(isAnim){
        return   
      }    
      if(!list[index].state){
        play(index)
         const newList  = [...list] 
          newList[index] = {
            ...newList[index],
            state:!list[index].state
          }
       
        setlist(newList)
    
      }else{
        reverse(index)
        const newList  = [...list] 
        newList[index] = {
          ...newList[index],
          state:!list[index].state
        }
 
      setlist(newList)
      }
    }
    const handDirect=(i)=>{
      navigate(`/project/${i}`)
    }
    if(isLoading){
      return(
        <div className="div">
          loading...
        </div>
      ) 
    }else{

      return (  
         <div  className=" gap-[3.75rem] flex flex-col items-center mb:pt-[100px]  pt-[10vh] w-screen  ">
          <div className=" mb:hidden flex w-screen justify-center">
              <div className=" text-aCaption font-title2-caption">{`(NHẤN CHỌN ĐỂ XEM THÊM)`} </div>
          </div>
          <div className="  translate-y-[-2vh] mb:translate-y-0 mb:text-28px mb:leading-[1] flex text-aSubtitle font-title-Subtitle w-screen justify-center gap-[3vw]">
           {tab ?<div     className=" cursor-pointer  border-b border-primaryBlack ">Dịch Vụ</div>:<div onClick={toggleTab}   className=" cursor-pointer opacity-50">Dịch Vụ</div>}
           {tab ? <div  onClick={toggleTab}   className=" cursor-pointer  opacity-50">Các Dự Án</div>:<div  className=" cursor-pointer  border-b border-primaryBlack">Các Dự Án</div>}
          </div>
          {tab?<div className=" px-[20px] flex flex-col w-screen h-[auto] ">
            {
              newList.map((item,index)=>{
                
                return(
                  <div key={index}  ref={e=>(listElements.current[index]=e)} className={`${index===0?"pb-[1.25rem]":"py-[1.25rem]"}    cursor-pointer  flex flex-col border-b border-primaryBlack `}>
                    <div onClick={()=>{
                    handleToggle(index)
                  }} className="flex h-[28.8vh] mb:h-fit   items-end">
                      <div className=" leading-[1] mb:translate-y-0  w-[10%] mb:text-12px  text-aCaption font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                      <div className=" mb:text-28px w-[85%] leading-[0.8] text-aTitle1 font-[500]" > {item.title}</div>
                      <div className="    justify-self-end "> <img className=" w-[1.5rem] h-[1.5rem] object-fill" ref={e=>(listArrow.current[index]=e)} src={up} alt="error" /></div>
                    </div>
                    <div ref={e=>(listLower.current[index]=e)} className=" hidden h-[0] ">
                   
                      <div className=" w-full  flex flex-col gap-[3.75rem] ">

                       <div className=" w-full flex flex-col">
                          <div className=" py-[2.5rem] w-full"> <img className=" w-full object-cover object-center rounded-[20px] h-[21rem] " src={item.p1.pic} alt="" /></div>
                          <div className=" gap-[1.25rem] w-full flex flex-col ">
                            <div className={index===0?" flex justify-between  w-full":" flex flex-wrap w-full"}>
                              {item.p1.tags.map((i)=>{
                                return(
                                  <div key={i} className=" text-16px w-fit leading-[1.2] font-[500]"> {i} </div>
                                )
                              })}
                            </div>
                            {/*  */}
                            <div className=" flex gap-[1.25rem] flex-col">
                                {
                                  item.p1.para1.map((para)=>{
                                    return(
                                      <div key={para} className=" text-16px font-light leading-[1.3] w-[350px] ">
                                        <div>{para}</div>
                                      </div>
                                    )
                                  })
                                }
                                <div className=" text-16px font-light leading-[1.3] w-[350px] ">
                                  {item.p1?.para2}
                                </div>
                            </div>
                          </div>
                        </div> 
                        {item.p2 ?<div className="  w-full flex flex-col ">
                          <div className="py-[2.5rem] w-full"> <img className=" w-full object-cover object-center rounded-[20px] h-[21rem]  " src={item.p2?.pic} alt="" /></div>
                          <div className=" gap-[1.25rem] w-full flex flex-col ">
                            <div>
                              {item.p2?.tags.map((i)=>{
                                return(
                                  <div key={i} className=" text-16px w-fit leading-[1.2] font-[500]"> {i} </div>
                                )
                              })}
                            </div>
                            {/*  */}
                            <div className=" flex gap-[1.25rem] flex-col">
                              <div className=" flex flex-col">

                                {
                                  item.p2?.para1.map((para)=>{
                                    return(
                                      <div key={para} className=" text-16px font-light leading-[1.3] w-[350px] ">
                                        <div>{para}</div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                                <div className=" text-16px font-light leading-[1.3] w-[350px] ">
                                  {item.p1?.para2}
                                </div>
                            </div>
                          </div>
                        </div>:""} 
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>: 
        <div className=" hidden py-[1%] px-[1%]   flex-col w-screen h-[auto] ">
        {
          list.map((item,index)=>{
            
            return(
              <div key={index}  ref={e=>(listElements.current[index]=e)} className="  cursor-pointer gap-[5vh] flex flex-col border-b border-primaryBlack ">
                <div onClick={()=>{
                handleToggle(index)
              }} className="flex   items-center">
                  <div className="  w-[10%] translate-y-[-3vh] text-aCaption font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                  <div className=" w-[70%] text-aTitle1 font-title-Subtitle" > {item.title}</div>
                  <div className=" justify-self-end "> <img ref={e=>(listArrow.current[index]=e)} src={require('../../Asset/work/arrowup.png')} alt="error" /></div>
                </div>
                <div ref={e=>(listLower.current[index]=e)} className="  hidden h-[0] ">
                  <div className=" w-[42%] flex justify-center  "><img className=" w-[22vw] h-[22vw] object-cover " src={item.pic} alt="error" /> </div>
                  <div className=" text-aPara font-p w-[23.7%] ">{ item.p} </div>
                  <div className=" w-[30%] flex justify-end items-end text-aSubtitle font-title-Subtitle">
                    <div className=" flex flex-col justify-center h-[39%]">
                    <div>{item.subTittle1} </div>
                    <div>{item.subTittle2} </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
         }
          {tab?<div className=" hidden   flex-col gap-[10vh] px-[1%] h-[300vh] w-screen">
            {
             
                listPro?.map((item,index)=>{
                
                  return(
                    <div key={index+2} id={index}  ref={e=>(listProjects.current[index]=e)} className=" flex w-[0] opacity-0  ">
                    <div  className="  group hover:h-[45vh] group-hover:ease-bounced duration-700  cursor-pointer h-[20vh] w-[98%]   flex flex-col border-b border-primaryBlack ">
                      <div className="flex items-start">
                    
    
                        <div className="  w-[10%] pt-[10vh] text-aCaption font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                        <div className=" w-[0%] flex group-hover:ease-bounced duration-500 justify-start group-hover:w-[25%]  "><img className=" w-0 h-[5vw] group-hover:w-[20vw] group-hover:ease-bounced duration-500 rounded-[2rem] group-hover:h-[16vw]  object-cover " src={item.picHero} alt="error" /> </div>
                        <div className=" w-[55%] text-aTitle2   flex flex-col  font-title-Subtitle" > 
                          <div className=" flex">
                            <div>{item.name} </div>
                            <span className=" text-aPara font-p">{item.year}</span>
                          </div>
                        <div className="spacer h-[5vh] group-hover:ease-bounced duration-500 group-hover:opacity-100 group-hover:h-[16vh] w-[100%]" ></div>
                        <div  className=" hidden group-hover:ease-bounced duration-500 group-hover:flex  justify-between w-[56%] uppercase text-aCaption  font-title2-caption" >
                        <div> {item.type[0]} </div>
                        {/* <div className=" w-[55%] ">{item.title}</div> */}
                        </div>
                        </div>
                    
                       
                      </div>
                    </div>
                    <div className="w-[98%] absolute flex justify-end "> <img className="rotate-[45deg]"  src={require('../../Asset/work/arrowup.png')} alt="error" /></div>
                    </div>
                  )
                })
            }
          
    
          </div>:<div  className="  flex flex-col mb:px-[20px]  items-center   h-[fit] w-screen">
      
          {
             
             listPro?.map((item,index)=>{
             
               return(
                 <div onClick={()=>handDirect(index)} key={index+2} id={index}  ref={e=>(listProjects.current[index]=e)} className=" flex justify-center mb:w-full  w-[100vw] opacity-1  ">
               
                 
                 <div  className=" notmb:delay-500 notmb:group notmb:hover:h-[42vh] notmb:group-hover:ease-in-out notmb:duration-700 py-[2.5rem] mb:w-full  cursor-pointer  w-[96%] notmb:hover:pt-[3vh] 
                   flex h-fit flex-col border-b  border-primaryBlack ">
                   <div className="flex items-start">
                 
 
                     
                     <div className=" w-[0%] flex delay-500 mb:hidden  duration-500 justify-start group-hover:w-[18%]  "><img className=" w-0 h-[5vw] notmb:delay-500 notmb:group-hover:w-[200px] duration-700 rounded-[20px] notmb:group-hover:h-[200px]  object-cover " src={item.picHero} alt="error" /> </div>
                     <div className=" w-[70%]  mb:w-full text-aTitle2   flex flex-col  font-title-Subtitle" > 
                       <div className=" flex ">
                       <div className="  w-[10%] pt-[1.1rem]  notmb:delay-500 notmb:duration-500 notmb:group-hover:pt-[10vh] text-aCaption mb:text-12px font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                         <div className=" capitalize mb:text-28px mb:w-full ">{item.name} </div>
                         <span className=" text-aPara mt-1 font-p mb:text-16px ">{item.year}</span>
                       </div>
                     <div className="spacer delay-500 h-[0vh] mb:hidden  duration-700 group-hover:opacity-100 group-hover:h-[11vh] w-[100%]" ></div>
                     <div  className=" opacity-0 flex notmb:delay-500 mb:opacity-100 notmb:duration-700 notmb:group-hover:opacity-100 notmb:translate-y-[-7vh] notmb:group-hover:translate-y-[0] justify-between w-[100%] uppercase text-16px   font-title2-caption" >

                     <div className=" normal-case w-[82vw] ">{item.title}</div>
                     </div>
                     </div>
                 
                    
                   </div>
                 </div>
                 <div className="z-[-1] mb:hidden  w-[97.5vw] absolute flex justify-end "> <img className="rotate-[45deg]"  src={require('../../Asset/work/arrowup.png')} alt="error" /></div>
                 </div>
               )
             })
         }
    
          </div>}
          <div className="spacer h-[2.5rem] w-screen " ></div>
         </div>
      );
    }
}

export default MBSct2W;
