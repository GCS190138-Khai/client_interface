import gsap from "gsap";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select,{ components } from "react-select";
import { getOneProduct } from "../../api";
import { offStatic, onStatic, primaryBG, primaryBGBlack, updateNumber } from "../../redux/navSlice";
import NavbarProduct from '../../NabarProduct'
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../footer";
import ShopCart from "../../Cart";
import _ from "lodash";
import ReadQuillEditor from "../../Util/ReadOnlyEditor";
gsap.registerPlugin( ScrollTrigger);
function ProductDetailMB() {
  
  
  const { productID}= useParams()
  const  location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mainCont = useRef(null)
  const left = useRef(null)
  const cont = useRef(null)
  const [isLoading, setisLoading] = useState(true)
  const [isOn, setIsOn] = useState(false)
  const [product, setProduct] = useState(false)
  const [slot, setslot] = useState(1)
  const cart = useSelector((state)=>state.nav.cart)
  const [setoptionSelected, setsetoptionSelected] = useState(false)
  const [limitation, setlimitation] = useState(product?product.option[0].number:100)
  const isStatic = useSelector((state)=>state.nav.static)


  
      useEffect(()=>{
        if(!left.current&&!cont.current){
          return
        }
 
       gsap.to(left.current, {
          scrollTrigger: {
            id:"proDetail",
            scrub: true,
            trigger:cont.current,
            start:" top bottom",
            end:"bottom bottom",
 
          }, 
          scrollTo:{y:ScrollTrigger.maxScroll(left.current)},
     
          ease: "none"
        
        });

        return ()=>{
         
          
        }
      })

const addToCart= (item, option)=>{
    if(productID==="none"){

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
      
       
        setslot(1)
        
        
        return 
      }else {
        let newList = [...cart]
       const elemt = _.find(cart,(o)=>
       
          
          
          o.info.product===cartItem.info.product&&o.version===cartItem.version
      )
      if(!elemt){
        newList.push(cartItem)
        dispatch(updateNumber(newList))
        
     
        return setslot(1)
      }else{
        let  newList2 = cart.map((map)=>{
            
          if(map.info.product===cartItem.info.product&&map.version===cartItem.version){
            
            return {...map,quantity:map.quantity+cartItem.quantity}
          }
          
          return {...map}
        })
        
        dispatch(updateNumber(newList2))
       
        
        return setslot(1)
      } 
      }
    }
 

}
const handleClick =(state)=>{
  setIsOn(state)
}
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img className=" w-[18px] h-[9px] " src={require("../Events/arrowselect.svg" ).default}alt="123" />
      </components.DropdownIndicator>
    );
  };

  useEffect(()=>{
    gsap.to(window,{ scrollTo:{y:0},duration:0})
        dispatch(primaryBG())
        if(productID==="none"){

          return alert('Tính năng này sẽ sớm đc ra mắt !')
        }else{

          if(isLoading){
         
            (async () => {
              const data =await getOneProduct(productID)
              setProduct(data)
           
             
              return setisLoading(false)
               
             
            })();
            
          }
        }
      
  },[productID])
  useEffect(()=>{
    if(product){
      setsetoptionSelected(product.option[0])
    }
  },[product])
  if(isLoading){
    return ( 
      <div className="  w-screen px-[10%] pt-[20vh] ">
         <div className="  flex  w-full h-screen">
          <div className=" flex flex-col w-[70%]">
          <div className="flex gap-1 text-aCaption font-normal uppercase items-center  w-fit"><img src={require("./backarrow.svg").default} className=" h-[11px] w-[15px]" alt="123" /> <span className=" relative">
           <div onClick={location.state.tab?()=>navigate(-1):()=>navigate('/shop')} className=" cursor-pointer  text-aCaption font-[400]">{!location.state?.tab?"quay lại cửa hàng":`quay lại${location.state.tab}`}</div> 
          <dir className=" w-full mt-[-0.4vh] m-0 absolute  border-b border-primaryBlack"></dir>
          </span></div>
          <div>
         
          </div>
          </div>
          <div className=" w-[30%]">
          Loading......
          </div>
         </div>
      </div>
     );
  }else{

    return ( 
      <div
      //  onLoad={()=>trigger()}
        className="   bg-primary">
      <div className=" ">

        <NavbarProduct handleClick={handleClick}></NavbarProduct>
        {isStatic?<ShopCart></ShopCart>:""}
      </div>
      {!isOn?

      <div  className="   flex flex-col items-center  w-screen px-[20px] pt-[4.875rem] ">
      
         <div className="  flex flex-col gap-[1.25rem]  w-full ">
         <div className=" ">
              <img className=" rounded-[10px] h-[25rem] object-cover object-center w-[100%]" src={product.option[0].thumnailPics} alt="123" />
          </div>
          <div className=" h-full justify-between flex flex-col w-full">
  
          <div className=" flex flex-col gap-[0.313rem]">
            <div className=" leading-snug text-28px font-[500] ">{product.name}</div>
            <div className=" leading-[0.7] text-16px font-[500]">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(product.option[0].cost)}</div>
          </div>
          </div>
          
         </div>

         {/*  */}
         <div className=" pt-[3.75rem] relative  flex flex-col items-center w-screen">
         <div className=" w-full px-[20px]  flex flex-col gap-[0.313rem]">
                    <div className=" uppercase
                     text-12px font-caption-600">Mô tả</div>
                    <div className=" font-p text-16px">
                    <ReadQuillEditor full={true} className="p-0  break-words w-full" value={product.discription}></ReadQuillEditor>
                    
                    </div>
                  </div>
         
         
            <div className=" z-[5] pt-[3.75rem]   w-full">
              <div  className=" px-[20px] gap-[3.75rem] pb-[6.25rem] relative  flex flex-col  w-full">
                <div  className=" w-full gap-[10vh] flex flex-col ">
                
                    <div className=" w-full gap-4  flex flex-col"  > 
                    <div className=" uppercase text-aCaption font-caption-600">Thông tin thêm</div>
                    <ul className=" list-inside	list-disc">
                     
                      {
                        product.moreInfo.map((item,i)=>{
                          return (
                            <li key={i}>
                              {item}
                            </li>
                          )
                        })
                      }
                    </ul>
                    </div>
                    
                </div>
                <div className=" flex flex-col gap-[5vh] w-full "> 
                    {product.pics.map((item,i)=>{
                      return(
                        <div key={item} className="div">
                          <img className=" object-cover  object-center h-[18.75rem] w-full " src={item} alt="123" />
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className=" flex justify-center z-10 sticky bottom-0   bg-primary  w-screen h-auto ">
            <div className="    bg-[#E6DFD7]  h-auto w-[100vw]  ">
              <div className="flex flex-col items-center py-[20px] px-[20px]   w-full">
                {/*  */}
                <div className=" pb-[0.313rem] w-full justify-between h-full flex flex-col">
                 
                  <Select 
                        className=" hover:ring-0
       capitalize text-16px font-p w-full "
      
        components={{  DropdownIndicator }}
        getOptionLabel={option => option.style}
        getOptionValue={option => option}
        options ={product.option}
        value={setoptionSelected}
      
        onChange={(e)=>{setsetoptionSelected(e)
        setslot(1)
        }}
       
        isSearchable={false}
       
        styles={{
          indicatorSeparator:(provided,state)=>({
            ...provided,
            display:"none"
          }),
          control: (provided,state) => ({
            ...provided,
            height:"3rem",
            border:"none",
            outline:"none",
            boxShadow: 'none',
            paddingLeft:"15px",
            width:"100%",
            background:"#F7F3EE"
            
          }),
          indicatorsContainer:(provided,state)=>({
            ...provided,
            paddingLeft:"15px",
            paddingRight:"15px",
           
          }),
          valueContainer:(provided,state)=>({
            ...provided,
            padding:"0"
            
           
          }),
          menuList:(provided,state)=>({
            ...provided,
            width:"20rem",
            // background:state.
            
           
          })  ,
          menu:(provided,state)=>({
            ...provided,
            width:"20rem",
       
            
           
          }),
          option:(provided,state)=>({
            ...provided,
            background:state.isSelected?"#1B1D21":"",
            
     
            
          })     
                        }}/>
                </div>
                {/*  */}
                <div className=" w-full justify-between h-full flex flex-col ">
   
                  <div className=" h-[3rem] flex w-full  " >   
                  <button  onClick={ ()=> {
        slot > 1 ?
        setslot(slot -1): console.log()
                    } } className=" rounded-l-[6px] bg-[#F7F3EE]  h-[100%] pl-[1.15rem]"><img className="  w-[0.875rem] " src={require("../../negative.svg").default} alt="123" /></button>
                   <div className=" text-16px font-p bg-[#F7F3EE] w-full  flex justify-center items-center ">{slot<10?`0${slot}`:slot}</div>
                   <button onClick={ ()=> {
                   slot < limitation ?
                   setslot(slot +1): console.log()
                   } } className=" rounded-r-[6px] bg-[#F7F3EE]  h-[100%]  pr-[1.438rem]"><img className="  w-[0.875rem] h-[1rem] " src={require("../../plus.svg").default} alt="123" /></button>
                 </div>
                </div>
                {/*  */}
                <div className=" pt-[1.25rem] w-full items-end  flex flex-col justify-center">
                  <button onClick={()=>addToCart(product,setoptionSelected)} className=" items-center justify-center rounded-[6px] gap-[10px] flex h-[3.75rem] w-full border border-primaryBlack">
                      <div className=" text-16px font-[500] uppercase">thêm vào giỏ</div>
                      {/* <img className="w-[14px] object-cover object-center h-[14px] " src={require("./button.svg").default} alt="123" /> */}
                  </button>
                </div>
{/*  */}
              </div>
            </div>
          </div>
         </div>
      </div>
      :
      <div className="  d w-screen h-screen flex justify-center items-center text-28px ">

        Loading...

      </div>
      }
      {!isOn?<Footer></Footer>:""}
      </div>
     );
  }
}

export default ProductDetailMB;