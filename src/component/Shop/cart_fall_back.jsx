import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopCart from "../../Cart";
import { onStatic, primaryBG } from "../../redux/navSlice";


function CartFallBack() {
  const dispatch = useDispatch()
  const isStatic = useSelector((state)=>state.nav.static)
  
  useEffect(()=>{
    dispatch( primaryBG())
  },[])
  useEffect(()=>{
    dispatch(onStatic())
    window.scrollTo(0,0)
  },[])
   console.log()

  return ( 

    <div className=" flex h-screen w-screen">

        <div className=" pt-[20vh] pb-[10vh] flex flex-col justify-between pl-[2%] w-[40%]" >
          <span className=" capitalize text-aTitle1 font-[500]   leading-[1.2] ">giỏ hàng của bạn</span>
          <div> <img className=" w-[72px] h-[71px] " src="https://live.staticflickr.com/65535/52259435837_45ef8d0945_t.jpg" alt="" /></div>
        </div>
        <div className=" absolute w-[100%]">

        {isStatic?<ShopCart></ShopCart>:""}
        </div>
    </div>
   );
}

export default CartFallBack;