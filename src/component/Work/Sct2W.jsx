
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useSelector ,useDispatch } from 'react-redux';


import React,{useRef,useEffect, useState}  from "react"
import { useLayoutEffect } from "react";
import { getAllProject } from "../../api";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../selector";



gsap.registerPlugin(ScrollTrigger);

function Sct2W() {
  
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
      tags:["Public engagement via","Classical music, Talk,","Exhibition"],
      para1:[" Tổ chức các sự kiện văn hóa - nghệ thuật, kết nối các nghệ sĩ với khán giả qua các chương trình nghệ thuật cộng đồng."],
    },
 
    state:false
  },
  {
    title:"Tư vấn",
    p1:{
      pic:"https://live.staticflickr.com/65535/52248775154_9c9337b1d3_o.png",
      tags:["publishment","events Consultancy","communication"],
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
        start:"30% 60%",
        end:"+=300",
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
 
      const tl = gsap.timeline({onStart:()=>{   
        setisAnim(true)
      } ,onComplete: ()=>{  setisAnim(false) }})
          tl.to(listArrow.current[index],{ rotate:"180deg",duration:0.5,ease: "back.out(4)" })
          tl.to(listLower.current[index],{display:"flex",duration:0.5,height:"auto",paddingBottom:"14vh",ease: "back.out(4)"},"<")
          tl.to(listLower.current[index],{display:"flex",opacity:1,duration:0.5,ease: "back.out(4)"},)    
    }
    const reverse=(index)=>{
      const tl = gsap.timeline({onStart:()=>{ setisAnim(true)} ,onComplete:()=>{ setisAnim(false) }})
      tl.to(listArrow.current[index],{ rotate:"0",duration:0.5,ease: "back.out(4)" })
      tl.to(listLower.current[index],{opacity:0,duration:0.2},"<")
      tl.to(listLower.current[index],{duration:0.5,height:"0",ease: "back.out(4)"},"<")
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
      navigate(`${i}`)
    }
    if(isLoading){
      return(
        <div className="div">
          loading...
        </div>
      ) 
    }else{

      return (  
         <div  className=" gap-[7vh] flex flex-col items-center  pt-[10vh] w-screen  ">
          <div className="px-[2%] flex w-screen justify-center">
              <div className=" text-aCaption font-title2-caption">{`(NHẤN CHỌN ĐỂ XEM THÊM)`} </div>
          </div>
          <div className="  translate-y-[-2vh]  flex text-aSubtitle font-title-Subtitle w-screen justify-center gap-[3vw]">
           {tab ?<div     className=" cursor-pointer  border-b border-primaryBlack ">Dịch Vụ</div>:<div onClick={toggleTab}   className=" cursor-pointer opacity-50">Dịch Vụ</div>}
           {tab ? <div  onClick={toggleTab}   className=" cursor-pointer  opacity-50">Các Dự Án</div>:<div  className=" cursor-pointer  border-b border-primaryBlack">Các Dự Án</div>}
          </div>
          {tab?<div className=" gap-[5vh] py-[1%] px-[2%] flex flex-col w-screen h-[auto] ">
            {
              newList.map((item,index)=>{
                
                return(
                  <div key={index}  ref={e=>(listElements.current[index]=e)} className="  cursor-pointer gap-[4.8vh] pb-[4.5vh] flex flex-col border-b-2 border-primaryBlack ">
                    <div onClick={()=>{
                    handleToggle(index)
                  }} className="flex h-[28.8vh]   items-center">
                      <div className="  w-[10%] translate-y-[-1.5rem] text-aCaption font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                      <div className=" w-[75.8%] text-aTitle1 font-[600]" > {item.title}</div>
                      <div className=" rotate-180  justify-self-end "> <img ref={e=>(listArrow.current[index]=e)} src={require('../../Asset/work/arrowup.png')} alt="error" /></div>
                    </div>
                    <div ref={e=>(listLower.current[index]=e)} className=" hidden h-[0] ">
                      <div className=" w-[10vw] "></div>
                      <div className=" w-[77.5vw] flex flex-col gap-[13vh] ">

                       <div className=" w-[77.5vw] flex">
                          <div className=" w-[418px]"> <img className=" w-[300px] object-cover object-center rounded-[20px] h-[300px] " src={item.p1.pic} alt="" /></div>
                          <div className=" gap-[23px] w-[51vw] flex flex-col">
                            <div>
                              {item.p1.tags.map((i)=>{
                                return(
                                  <div key={i} className=" text-aSubtitle leading-[1.2] font-[500]"> {i} </div>
                                )
                              })}
                            </div>
                            {/*  */}
                            <div className=" flex justify-between">
                                {
                                  item.p1.para1.map((para)=>{
                                    return(
                                      <div key={para} className=" text-aPara font-light leading-[1.3] w-[350px] ">
                                        <div>{para}</div>
                                      </div>
                                    )
                                  })
                                }
                                <div className=" text-aPara font-light leading-[1.3] w-[350px] ">
                                  {item.p1?.para2}
                                </div>
                            </div>
                          </div>
                        </div> 
                        {item.p2 ?<div className=" w-[77.5vw] flex  ">
                          <div className=" w-[418px]"> <img className=" w-[300px] object-cover object-center rounded-[20px] h-[300px] " src={item.p2?.pic} alt="" /></div>
                          <div className=" gap-[23px] w-[51vw] flex flex-col">
                            <div>
                              {item.p2?.tags.map((i)=>{
                                return(
                                  <div key={i} className=" text-aSubtitle leading-[1.2] font-[500]"> {i} </div>
                                )
                              })}
                            </div>
                            {/*  */}
                            <div className=" justify-between flex">
                              <div className=" flex flex-col">

                                {
                                  item.p2?.para1.map((para)=>{
                                    return(
                                      <div key={para} className=" text-aPara font-light leading-[1.3] w-[350px] ">
                                        <div>{para}</div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                                <div className=" text-aPara font-light leading-[1.3] w-[350px] ">
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
        <div className=" hidden py-[1%] px-[1%]  flex-col w-screen h-[auto] ">
        {
          list.map((item,index)=>{
            
            return(
              <div key={index}  ref={e=>(listElements.current[index]=e)} className="  cursor-pointer gap-[5vh] flex flex-col border-b-2 border-primaryBlack ">
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
          {tab?<div className=" hidden pt-[10vh]  flex-col gap-[10vh] px-[1%] h-[300vh] w-screen">
            {
             
                listPro?.map((item,index)=>{
                
                  return(
                    <div key={index+2} id={index}  ref={e=>(listProjects.current[index]=e)} className=" flex w-[0] opacity-0  ">
                    <div  className="  group hover:h-[45vh] group-hover:ease-bounced duration-700  cursor-pointer h-[20vh] w-[98%]   flex flex-col border-b-2 border-primaryBlack ">
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
                    <div className="   w-[98%] absolute flex justify-end "> <img className="rotate-[45deg]"  src={require('../../Asset/work/arrowup.png')} alt="error" /></div>
                    </div>
                  )
                })
            }
          
    
          </div>:<div  className=" pt-[10vh] flex flex-col gap-[7vh]  items-center   h-[fit] w-screen">
      
          {
             
             listPro?.map((item,index)=>{
             
               return(
                 <div onClick={()=>handDirect(index)} key={index+2} id={index}  ref={e=>(listProjects.current[index]=e)} className=" flex justify-center  w-[100vw] opacity-1  ">
                 {index===4?
                //  Do thi Vn
                 <div  className=" delay-500  group hover:h-[50vh] group-hover:ease-in-out duration-700  cursor-pointer h-[32vh] w-[96%] hover:pt-[7vh]   flex flex-col border-b-2 border-primaryBlack ">
                 <div className="flex items-start">
               

                   <div className="  w-[10%] pt-[6.3vh]  delay-500 duration-500 group-hover:pt-[10vh] text-aCaption font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                   <div className=" w-[0%] flex delay-500  duration-500 justify-start group-hover:w-[18%]  "><img className=" w-0 h-[5vw] delay-500 group-hover:w-[200px] duration-700 rounded-[20px] group-hover:h-[200px]  object-cover " src={item.picHero} alt="error" /> </div>
                   <div className=" w-[60%] text-aTitle2   flex flex-col  font-title-Subtitle" > 
                     <div className=" flex">
                       <div className=" capitalize leading-[1.2] relative ">{item.name} <span className=" absolute mt-[-1vh] text-aPara font-p">{item.year}</span> </div>
                       
                     </div>
                   <div className="spacer delay-500 h-[0vh]  duration-700 group-hover:opacity-100 group-hover:h-[4vh] w-[100%]" ></div>
                   <div  className=" opacity-0 flex delay-500  duration-700 group-hover:opacity-100 translate-y-[-7vh] group-hover:translate-y-[0] justify-between w-[100%] uppercase text-aCaption  font-title2-caption" >

                   <div className=" capitalize w-[80vw] ">{item.title}</div>
                   </div>
                   </div>
               
                  
                 </div>
               </div>
                 :
                 <div  className=" delay-500  group hover:h-[42vh] group-hover:ease-in-out duration-700  cursor-pointer h-[20vh] w-[96%] hover:pt-[3vh]   flex flex-col border-b-2 border-primaryBlack ">
                   <div className="flex items-start">
                 
 
                     <div className="  w-[10%] pt-[7.5vh]  delay-500 duration-500 group-hover:pt-[10vh] text-aCaption font-title2-caption"> {index+1<10?`0${index+1}`:`${index+1}`} </div>
                     <div className=" w-[0%] flex delay-500  duration-500 justify-start group-hover:w-[18%]  "><img className=" w-0 h-[5vw] delay-500 group-hover:w-[200px] duration-700 rounded-[20px] group-hover:h-[200px]  object-cover " src={item.picHero} alt="error" /> </div>
                     <div className=" w-[70%] text-aTitle2   flex flex-col  font-title-Subtitle" > 
                       <div className=" flex">
                         <div className=" capitalize ">{item.name} </div>
                         <span className=" text-aPara font-p">{item.year}</span>
                       </div>
                     <div className="spacer delay-500 h-[0vh]  duration-700 group-hover:opacity-100 group-hover:h-[11vh] w-[100%]" ></div>
                     <div  className=" opacity-0 flex delay-500  duration-700 group-hover:opacity-100 translate-y-[-7vh] group-hover:translate-y-[0] justify-between w-[100%] uppercase text-aCaption  font-title2-caption" >

                     <div className=" capitalize w-[80vw] ">{item.title}</div>
                     </div>
                     </div>
                 
                    
                   </div>
                 </div>}
                 <div className="  w-[80.5vw] absolute flex justify-end "> <img className="rotate-[45deg]"  src={require('../../Asset/work/arrowup.png')} alt="error" /></div>
                 </div>
               )
             })
         }
    
          </div>}
          <div className="spacer h-[15vh] w-screen " ></div>
         </div>
      );
    }
}

export default Sct2W;
