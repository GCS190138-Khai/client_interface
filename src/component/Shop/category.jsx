import { el } from "date-fns/locale";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Select, { components } from "react-select";
import { fetchProducts, getAllGen, searchProducts } from "../../api";
import { getAllCate, getAllProducts } from "../../selector";
import { useUpdateEffect } from "./shop";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { onStatic, primaryBG, primaryBGBlack, updateNumber } from "../../redux/navSlice";
import { useLayoutEffect } from "react";
import _ from 'lodash';

import './input.css'
gsap.registerPlugin( ScrollTrigger);
const cartFromLocal = JSON.parse(localStorage.getItem('cart')||'[]')
function Categories() {
  const sortBy =[
    {
      label:"mặc định",
      value:"none"
    },
  {
      label:"thứ tự a-z",
      value:"az"
  },
  {
      label:" thứ tự z-a",
      value:"za"
  },
  {
      label:"giá tăng dần",
      value:"price-up"
  },
  {
    label:"giá giảm dần",
    value:"price-down"
  },
  
  ]
  const [isLoading, setLoading] = useState(true);
  const list = useSelector((state)=>getAllProducts(state))
  const listOfCate = useSelector((state)=>getAllCate(state))
  const [productsList, setproductsList] = useState(false)
  const [backTitle,setBackTitle]= useState(" tất cả sản phẩm")
  const dispatch = useDispatch()
  const [slot, setslot] = useState(1)
  const [handleSelect, sethandleSelect] = useState(false)
  const [optionSelected, setoptionSelected] = useState(false)
  const [isDisable, setisDisable] = useState(false)
  const cart = useSelector((state)=>state.nav.cart)
  const [select, setSelect] = useState(sortBy[0])
  const [isChange, setisChange] = useState(false)
  const cont = useRef()
  const input = useRef()
  const input2 = useRef()
  const icon = useRef()
  const underline = useRef() 
  const mainCont = useRef()
  const product = useRef()
  const [search, setSearch] = useState("")
  const [showAdd, setshowAdd] = useState(false)
const {genresID} = useParams()
useEffect(()=>{
  gsap.to(window,{ scrollTo:{y:0},duration:0})
  if(isLoading){

    dispatch(primaryBGBlack())
  }
},[])

useEffect(()=>{
  
  if(isLoading){
    
    (async () => {
      await   getAllGen(dispatch)
      await fetchProducts(dispatch)
        getList(list,genresID)
      return setLoading(false)
       
     
    })();

   
   } 
   getList(list,genresID)
},[isLoading,genresID])
//  useUpdateEffect(()=>{
  
//   getList(list,genresID)
  

//  },[genresID])


if(!listOfCate){
  setLoading(true)
}
if(!list){
  setLoading(true)
}



 useEffect(()=>{
  let arbort = new AbortController();

  if(isLoading){
    return
  }
  const tl = gsap.timeline({
    id:"cate",
    paused:true,
    onStart:()=>{
      dispatch(primaryBG())
    },
    onReverseComplete:()=>{
      dispatch(primaryBGBlack())
    }
    ,
    
  })
  tl.to(input.current,{ translateY:"0.5vh" ,width:"22vw", duration:0.2 })
      .to( input2.current,{duration:0.2,"--place":"uppercase","--text":"0.875rem",fontSize:"0.875rem" },"<")
      .to(icon.current,{ width:"1.5vw", height:"1.5vw",duration:0.2 },"<")
      .to(underline.current,{ translateY:"-1.5vh"  ,duration:0.2 },"<")


  ScrollTrigger.create({
    id:"cate",
    snap:false,
    start:"100px center",
    end:`+=${400}`,
    trigger:cont.current,
    animation:tl,
    scrub:true,
    // markers:true
  
    
  })
  return ()=>{
    // tl.getById("cate").kill(false)
    ScrollTrigger.getById("cate").kill(true)
    
    arbort.abort()
  }
 },[genresID,isLoading])
  

 



 const handleDisable=(i)=>{

  if(i===isDisable){  
   
    return
  }else{

  
   
   
    setisDisable(i)
        sethandleSelect(false)
                  setoptionSelected(false)
                  setslot(1)
                 
  }
 }
const getList =(listPro,cateID) =>{
  if(!cateID){
    
      setBackTitle(" tất cả sản phẩm")
      setproductsList(listPro)
      return handleSort(productsList,select) 
   
  }
  if(cateID==="new-releases"){
    
    
    let newList = []
    listPro.forEach(
      item => {
        if(item.isNewest){
          newList.push(item)
        }
       
      }
    )
    setBackTitle(" vừa ra mắt")
    setproductsList(newList)
    return handleSort(productsList,select) 
  }
  if(cateID==="best-seller"){
    let newList = []
    listPro.forEach(
      item => {
        if(item.isBestSeller){
          newList.push(item)
        }
       
      }
    )
    
    setBackTitle(" Bán chạy")
    setproductsList(newList)
    return handleSort(productsList,select) 
  }
  let newList = []
  listPro.forEach(
    item => {
      if(item.genres.find( item1=>item1._id===cateID) ){
        newList.push(item)
      }
     
    }
  )
 const obj = listOfCate.find(item=> item._id ===cateID)
 
   setBackTitle(` ${obj.name}`)
   setproductsList(newList)
   return handleSort(productsList,select) 
}

const hanleSelected =(i,option)=>{
  
  if(handleSelect===i){
    sethandleSelect(false)
    setoptionSelected(false)
    setslot(1)
  }else{
    sethandleSelect(i)
    setoptionSelected(option)
    setslot(1)
 
  }
  
}
useEffect(()=>{
  
  if(isChange){

     
     setisChange(false)
  }else{

  }
  
},[cart,isChange])
 
const addToCart= (item, option)=>{
  if(item._id==="none"){
    return alert('Tính năng này sẽ sớm đc ra mắt !')
  }else{
  const cartItem ={
    name:item.name,
    quantity:slot,
    cost:option.cost,
    thumnailPics:option.thumnailPics,
    version:option.style,
    info:{
      product:item._id,
      user: "current"
    }
  }
  dispatch(onStatic()) 
  if(cart.length===0){
    dispatch(updateNumber([cartItem]))
    sethandleSelect(false)
    setoptionSelected(false)
    setslot(1)
    

    return setisChange(true)
  }else {
    let newList = [...cart]
   const elemt = _.find(cart,(o)=>
   
      
      
      o.info.product===cartItem.info.product&&o.version===cartItem.version
  )
  if(!elemt){
    newList.push(cartItem)
    dispatch(updateNumber(newList))
    sethandleSelect(false)
    setoptionSelected(false)
    return setslot(1)
  }else{
    let  newList2 = cart.map((map)=>{
        
      if(map.info.product===cartItem.info.product&&map.version===cartItem.version){
        
        return {...map,quantity:map.quantity+cartItem.quantity}
      }
      
      return {...map}
    })
    dispatch(updateNumber(newList2))
    sethandleSelect(false)
    setoptionSelected(false)
    return setslot(1)
  } 
  }
}

}

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <img className=" w-[18px] h-[9px] " src={require("../Events/arrowselect.svg" ).default}alt="123" />
    </components.DropdownIndicator>
  );
};
 


const handleSort =(arr,e)=>{
  let sorted = []
  if(e.value ==="none"){
    return
  }
  if(e.value==="az"){

    sorted =  _.orderBy(arr,(o)=>o.productCode.toLowerCase(),[ 'asc']) 
  }
  if(e.value === "za"){
    sorted =  _.orderBy(arr,(o)=>o.productCode.toLowerCase(),[ 'desc']) 
  }
  if(e.value==="price-up"){
    sorted =  _.orderBy(arr,(o)=>o.option[0].cost,[ 'asc']) 
  }
  if(e.value==="price-down"){
    sorted =  _.orderBy(arr,(o)=>o.option[0].cost,[ 'desc']) 
  }
    return setproductsList(sorted)
}

const handleSearch = async (e)=>{
  e.preventDefault();

  const newOneForHeight = window.innerHeight
 
  gsap.to(window,{ scrollTo:{y:newOneForHeight}})
 
  if(search.trim()===""){
    
    getList(list,genresID)
    return 
  }else{
    const data = await searchProducts(search,genresID)  
    if(data.length===0){
      return setproductsList(false) 
    }
    return handleSort(data,select) 
  }
}
if(isLoading){
  return(
    <div className=" w-screen h-screen flex items-center justify-center text-aTitle1">
      loading...
    </div>
  )
}else{

  return (
    <div ref={mainCont}  className=" relative flex-col flex gap-[2vh]   w-[100%]  ">
      <div ref={cont} className="  bg-primary z-[5] justify-between sticky flex flex-col pb-[3vh]    top-[-18vh] h-[28vh] w-full  ">
        <div className="pr-[2vw] items-center flex capitalize text-aTitle2 font-title-Subtitle">
          <div className=" w-[84.3%] ">
          {backTitle}
          </div>  
          <div className=" w-[15.7%]   ">
             
          <Select 
                        className=" hover:ring-0
        uppercase text-aCaption font-title2-caption  "
      
        components={{  DropdownIndicator }}
        options ={sortBy}
        value={select}

      
        isSearchable={false}
        onChange={e => {setSelect(e)
          handleSort(productsList,e)
        } }
        styles={{
          indicatorSeparator:(provided,state)=>({
            ...provided,
            display:"none"
          }),
          control: (provided,state) => ({
            ...provided,
            height:"2rem",
            border:"1px solid black",
            outline:  "none",
            boxShadow: 'none',
            paddingLeft:"16px",
            background:" inherit",
            paddingRight:"8px",
            borderRadius:"3rem",
            textAlign:"center",
            width:"fit-content"
            
          }),
          indicatorsContainer:(provided,state)=>({
            ...provided,
            padding:"0 !important",
            width:"30px"
           
          }),
          valueContainer:(provided,state)=>({
            ...provided,
            padding:"0",
            width:"fit-content"
         
            
           
          }),
          singleValue: (provided) => ({
            ...provided,
            position: 'static',
            transform: 'none',
            width:"fit-content"
          }),
          menuList:(provided,state)=>({
            ...provided,
         
            // padding:"at"
          })  ,
          menu:(provided,state)=>({
            ...provided,
            minWidth:"80px"
             
          }),
          option:(provided,state)=>({
            ...provided,
            background:state.isSelected?"#1B1D21":"",
            paddingLeft:"16px", 
            paddingRight:"16px", 
        
          })     
                        }}/>
          </div>
          </div>
        <div  className=" pt-[2vh] flex justify-start pr-[2.5%] ">
              <form onSubmit={(e)=>handleSearch(e)} ref={input} className="  w-[45vw] flex flex-col justify-center">
              <img ref={icon} className="  absolute   w-[2vw] h-[2vw] " src={require("./search.svg" ).default}alt="123" />
              <input ref={input2} onChange={(e)=>setSearch(e.target.value)} value={search}  placeholder={`trong${backTitle}`} className=" input      text-aPara font-[500]     pl-[2vw]   w-full h-[6vh] outline-none border-none    bg-inherit focus:ring-0  " type="text" /> 
              <div ref={underline} className=" translate-y-[-1vh]   border-primaryBlack w-full h-[1px] bg-[#191919]   "></div>          
              </form>
  
        </div>
      </div>

      <div  className="gap-[2%] pt-[2vh] pr-[2%] pb-[20vh] h-[auto] gap-y-[15vh] flex flex-wrap w-full ">
      <div ref={product} className=" w-full h-[1px]"> </div>
          {
           productsList ? productsList?.map((item,i)=>{
              return(
                <div key={i} className=" gap-[2vh]  flex flex-col    h-[70vh] w-[30%] ">
                 
                  <div className="relative group  rounded-[20px] w-full h-[85%] inline-block overflow-hidden">
       
                  <div className=" absolute h-full w-full  ">
                  <div className=" absolute group-hover:z-[3]  peer-focus-within:hidden  h-[70%] w-full" >
                    <Link className="absolute group-hover:z-[3] h-full w-full " state={{ tab:backTitle }}        to={`/${item._id}`}>
                      <span></span>
                      </Link>

                    </div>
                  <button onClick={ (e)=>{
            
          handleDisable(i)
          }} className=" cursor-pointer gap-1 mt-[95%]  focus-within:flex   group-hover:flex flex-col justify-center items-center uppercase px-[2.5vh]
                    hidden group-hover:z-[3] justify-self-end 
                    focus-within:mt-0 group 
                    peer
                    focus-within:z-[3]
                    focus-within:py-[2.5vh]
                 
                    focus-within:justify-between
                         absolute focus-within:absolute  
                          focus-within:w-[100%] focus-within:h-[100%] group focus-within:bg-primaryYellow   h-[5vh]   w-full ">
                                       {/* <Link className="  " to={`/shop/${item._id}`}>
  
                    </Link> */}
                   

                    <div  className=" justify-between items-center px-[30px] py-[18px] flex  text-aCaption font-title2-caption  group-focus-within:hidden w-full   rounded-[3rem] bg-primaryYellow">
                    <span>Thêm vào giỏ hàng</span>  
                    <img className=" w-[15px] h-[15px] " src={require("./plus.svg" ).default}alt="123" />
                    </div>
                    <div onMouseEnter={()=>setshowAdd(i)} onMouseLeave={()=>setshowAdd(false)} className=" group-focus-within:flex hidden w-full h-full">
                    {showAdd===i ?<div className=" flex flex-col justify-between w-full h-full">

                    {item.option.length <=6 ?<div></div>:
                    <div className=" w-full items-center justify-between flex  pb-[1vh]  h-fit"> 
                      <span className=" text-aCaption font-title2-caption"> {"(lăn chuột để xem thêm)"}</span>
                    
                      
                      <img className="w-[0.875rem] h-[0.875rem]" src={require("./down.svg").default} alt="123" />
                   
                    </div> }
                    <div className=" flex   overflow-x-auto overflow-auto h-[42%]  w-full ">
                    <div className=" flex-wrap justify-between     flex h-fit gap-y-2 pb-[2vh] w-full">
  
                    { item.option.map((optionItem,i)=>{
                      return(
                        <div   onClick={()=>{
                          if(optionItem.number>0){
                            hanleSelected(i,optionItem)
                          }else{
                            alert('Phiên bản này đã hết hàng xin vui lòng thử lại sau !')
                          }
                        }}  className={` ${handleSelect===i?" bg-primaryBlack text-white ":""}    min-w-[49%] shrink-0 justify-center items-center h-fit rounded-[3rem] py-[1.2vh] border border-primaryBlack group-focus-within:flex hidden `} key={optionItem.style}>
                          <span className=" text-aCaption font-title2-caption">{optionItem.number>0?optionItem.style:"hết hàng"}</span> 
                        </div>
                      )
                    })}
                    </div>
  
                    </div>
                    <div className=" mt-[15%]   border border-primaryBlack   justify-center flex   items-center h-[11%] w-full py-[1vh] rounded-[6px] bg-primaryYellow">
                      
                    <div className=" group-focus-within:flex h-[3rem] hidden w-full opacity-0  group-focus-within:opacity-100  " >
      
       
      <div  onClick={ ()=> {
        slot > 1 ?
        setslot(slot -1): console.log()
      } } className=" cursor-pointer    flex items-center rounded-l-[6px] bg-transparent  h-[100%] pl-[18px]"><img className="  w-[1rem] " src={require("../../negative.svg").default} alt="123" /></div>
       <div className=" text-aPara font-p bg-transparent w-full       flex justify-center items-center ">{slot<10?`0${slot}`:slot}</div>
        <div onClick={ ()=> {
        slot < optionSelected.number||99 ?
        setslot(slot +1): console.log()
      } } className=" cursor-pointer    flex items-center rounded-r-[6px] bg-transparent h-[100%]  pr-[18px]"><img className="  w-[1rem] h-[1rem] " src={require("../../plus.svg").default} alt="123" /></div>
                    </div>
                     
                     </div>
                    <div onClick={()=>{
                      optionSelected? addToCart(item,optionSelected):console.log()
                    }} className={` ${optionSelected?" bg-primaryBlack  text-white ":" bg-primaryYellow  cursor-not-allowed "} bg group-focus-within:border group-focus-within:border-primaryBlack opacity-0  group-focus-within:opacity-100    group-focus-within:justify-center group-focus-within:flex hidden  justify-center items-center h-[25%] w-full py-[1vh] rounded-[6px] `}>
                      
                     <span>Thêm vào giỏ </span>  </div>
                    </div>:""}
                    </div>
                  </button>
                  
                  </div>
                  <img className=" group-hover:-z-10 group-hover:scale-125   object-cover object-center w-full h-full " src={item.option[0].thumnailPics} alt={i} />
                  </div>
                  <Link  state={{ tab:backTitle }}  to={`/${item._id}`}>
                  <div className=" w-full h-[15%]">
                    <div className=" text-aPara font-[500]">{item.name}</div>
                    <div className=" mt-[-0.5vh] text-aCaption font-title2-caption">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.option[0].cost)}</div>
                  </div>
                  </Link>
                </div>
              )
            }): 
            <div>Không tìm thấy sản phẩm xin vui lòng thử lại sau</div> 
            }   
            
            
             
               
      </div>
    </div>
    );
}

}

export default Categories;