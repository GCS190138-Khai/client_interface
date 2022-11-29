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
import { useWindowWidth } from "@react-hook/window-size";
gsap.registerPlugin( ScrollTrigger);

function CategoriesMB() {
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

  const  width = useWindowWidth()
const {genresID} = useParams()

console.log(productsList)
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

  tl.to(icon.current,{ width:"2rem", height:"2rem"})

  ScrollTrigger.create({
    id:"cate",
    snap:false,
    start:"5px center",
    end:`+=${200}`,
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
    <div ref={mainCont}  className="  relative flex-col flex gap-[2vh]   w-[100%]  ">
      <div ref={cont} className=" bg-primary z-[5] justify-between sticky flex flex-col pb-[3vh]    top-[-3rem] h-[11rem] w-full  ">
        <div className=" w-full  items-center flex capitalize text-aTitle2 font-title-Subtitle">
          <div className=" mb:hidden w-[84.3%] ">
          {backTitle}
          </div>  
          <div className=" w-[15.7%] mb:w-full  ">
             
          <Select 
                        className=" w-full hover:ring-0
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
            height:"2.25rem",
            border:"1px solid black",
            outline:  "none",
            boxShadow: 'none',
            paddingLeft:"20px",
            background:" inherit",
            paddingRight:"12px",
            borderRadius:"3rem",
            textAlign:"center",
            width:"100%"
            
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
        <div  className="  w-full  flex justify-start  ">
              <form onSubmit={(e)=>handleSearch(e)} ref={input} className=" w-full flex flex-col justify-center">
              <img ref={icon} className=" pl-[0.625rem]  absolute   w-[1.625rem] h-[1.625rem] " src={require("./search.svg" ).default}alt="123" />
              <input ref={input2} onChange={(e)=>setSearch(e.target.value)} value={search}  placeholder={`trong${backTitle}`} className=" text-12px font-400 placeholder:uppercase placeholder:text-12px pb-[0.5rem]  pl-[2rem]  w-full h-[1.938rem] outline-none border-none    bg-inherit focus:ring-0  " type="text" /> 
              <div ref={underline} className="   border-primaryBlack w-full h-[1px] bg-[#191919]   "></div>          
              </form>
  
        </div>
      </div>

      <div  className= "  gap-[2.5rem] pt-[2vh]  pb-[6.25rem] h-[auto] flex flex-wrap w-full ">
      <div ref={product} className=" w-full h-[1px]"> </div>
          {
           productsList ? productsList?.map((item,i)=>{
              return(
                <div key={i} className=" gap-[0.625rem]  flex flex-col    h-[27.75rem] w-[100%] ">
                 
                  <div className="relative group  rounded-[20px] w-full h-[25rem] inline-block overflow-hidden">
       
                  <div className=" absolute h-full w-full  ">
                  <div className=" absolute group-hover:z-[3]  peer-focus-within:hidden  h-[70%] w-full" >
                    <Link className="absolute group-hover:z-[3] h-full w-full " state={{ tab:backTitle }}        to={`/${item._id}`}>
                      <span></span>
                      </Link>

                    </div>
             {/* Butto-cu */}
                  
                  </div>
                  <img className=" group-hover:-z-10 group-hover:scale-125   object-cover object-center w-full h-full " src={item.option[0].thumnailPics} alt={i} />
                  </div>
                  <Link className=" h-[2.125rem] "  state={{ tab:backTitle }}  to={`/${item._id}`}>
                  <div className="  w-full flex flex-col h-fit">
                    <div className=" text-16px translate-y-[0.25rem] font-[500]">{item.name}</div>
                    <div className=" text-12px font-title2-caption">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.option[0].cost)}</div>
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

export default CategoriesMB;