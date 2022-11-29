import _, { get } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLimitProduct } from "./api";
import { offStatic, onEventCart, onStatic, updateNumber } from "./redux/navSlice";


function ShopCart() {

  const cart = useSelector((state)=>state.nav.cart)
  const [sum, setSum] = useState()

  const dispatch = useDispatch()

const handleNegative = (id,version) =>{
  let newList  = cart.map(item=>
    
    {if(item.info.product===id&&item.version===version){
     
      if(item.quantity>1){
       
        return {...item,quantity : item.quantity-1 }
      }
    }
    return {...item}
  })
  dispatch(updateNumber(newList))
 

}

const handlePlus = async (id,version) =>{
  
  let data ={
    id:id,
    style:version
  }
    const limit = await getLimitProduct(data)
  console.log(limit)
  let newList  = cart.map(item=>
    
    {if(item.info.product===id&&item.version===version){
      
      if(item.quantity<limit){
        console.log("click")
        return {...item,quantity : item.quantity+1 }
      }
    }
    return {...item}
  })
  
  dispatch(updateNumber(newList))
 
  
}
const handleDelete = (id,version)=>{
  let text = "Bấm ok để gỡ sản phẩm khỏi giỏ.";
  
  if (window.confirm(text) === true) {
    const newList =  _.reject(cart, (o) =>(o.info.product===id&&o.version ===version))
    
    if(newList.length===0){
      return dispatch(updateNumber([]))
    }
    return  dispatch(updateNumber(newList))
  } 
  
  return 
}
useEffect(()=>{
 
  handleSum()
},[cart])
const handleSum = ()=>{
  let initialValue = 0
 const res  = cart.reduce((total,currentvalue)=>{
  return total + currentvalue.cost*currentvalue.quantity
 },initialValue)
 return setSum(res)
}
  return (  
    <div className=" z-[1000]   flex justify-between  w-screen h-screen fixed  ">


      <div onClick={()=>dispatch(offStatic())} className=" bg-primaryBlack opacity-20 mb:w-0 w-[62%] h-screen "> </div>
      <div className=" gap-[3vh] mb:gap-[1.25rem] text-primary flex flex-col bg-primaryBlack w-[38%] mb:w-full h-screen mb:px-[20px] px-[3vw] py-[3vh]   ">
        {/*  */}
        <div className="  items-center mb:text-28px flex mb:normal-case justify-between text-aSubtitle font-title-Subtitle uppercase">Giỏ hàng {cart.length<10?`(0${cart.length})`:`(${cart.length})`} <button onClick={()=>dispatch(offStatic())} className=" h-fit flex justify-end  w-[6%]"> 
<img className=" w-[3rem] mb:w-[1.875rem] mb:h-[1.875rem] h-[3rem] object-cover object-center " src={require("./crosswhit.png")} alt="" />
        </button></div>
        <div className=" w-full h-[1px] bg-primary"></div>
        {/*  */}
        <div className="h-[60%]  mb:h-[29.688rem] overflow-y-auto flex flex-col  w-full">
            {
              cart?.map((item,i)=>{
                return (
                  <div key={item.info.product+item.version+i} className=" item items-center mb:min-h-[5.625rem] min-h-[120px] justify-between mb:border-b-0 border-b border-primary w-full flex">
                      <div className=" w-[75px] mb:w-[5.625rem] mb:h-[5.625rem] h-[75px]">
                        <img className="mb:w-[5.625rem] mb:h-[5.625rem] h-full w-full object-cover object-center" src={item.thumnailPics} alt="" />
                      </div>
                      {/*  */}
                      <div className=" mb:h-[100%] mb:justify-between mb:w-[14.063rem] w-[82%] flex flex-col h-[78px]">
                        <div className="  flex gap-[2vw]">
                        <div className="  mb:w-full w-[70%] ">
                            <div className="text-aCaption font-caption-600 mb:text-12px  ">{item.name}</div>
                            <div className=" text-aCaption font-title2-caption mb:text-12px text-[#767676]">{item.version}</div>
                            <div className=" mb:text-12px notmb:hidden w-full text-aCaption font-title2-caption">
                          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)}
                        </div>
                        </div>
                        <div className=" mb:hidden w-[30%] text-aCaption font-title2-caption">
                          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)}
                        </div>
                        </div>
                        {/*  */}
                        <div className="  flex">
                          <div className=" self-end w-[70%] ">
                          <div className=" mb:w-[4.5rem]  mb:justify-between h-fit flex items-center   " >   
                  <button  onClick={ ()=> {
                    handleNegative(item.info.product,item.version)
                    } } className="  bg-inherit h-[100%] "><img className=" mb:h-[0.438rem] mb:w-[0.438rem] h-[10px]  w-[10px] " src={require("./negawhite.svg").default} alt="123" /></button>
                   <div className=" mb:text-12px  text-aCaption font-title2-caption bg-inherit  w-[4vw]  flex justify-center items-center ">{item.quantity<10?`0${item.quantity}`:item.quantity}</div>
                   <button onClick={ ()=> {
                handlePlus(item.info.product,item.version)
                   } } className="  bg-inherit  h-[100%] "><img className=" mb:h-[0.438rem] mb:w-[0.438rem]  w-[10px] h-[10px] " src={require("./pluswhite.svg").default} alt="123" /></button>
                           </div>
                          </div>
                          <div onClick={()=>handleDelete(item.info.product,item.version)} className=" mb:text-12px cursor-pointer font-caption-600 text-right text-[#767676] w-[30%]">
                            Gỡ
                          </div>
                          <div>

                          </div>
                        </div>
                      </div>
                  
                
                  </div>
                )
              })
            }
        </div>
        {/*  */}
        <div className=" flex items-center mb:h-[1.25rem]  justify-between">
          <div className=" uppercase text-aCaption mb:text-12px font-title2-caption" >tạm tính</div>
          <div className=" text-aPara mb:text-16px font-[500]"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(sum)} </div>
        </div>
        {/*  */}
        <Link to={'/check_out'}>
        <div className="flex bg-primary  items-center rounded-[5px] mb:h-[3.75rem] h-[6rem]  w-full justify-center">

            <span className=" text-primaryBlack text-aPara font-[500]  w-fit h-fit">ĐẾN THANH TOÁN</span>
        </div>
        </Link>
      </div>
   

    </div>
  );
}

export default ShopCart;