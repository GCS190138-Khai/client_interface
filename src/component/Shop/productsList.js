import React, { useState } from "react"
import {useDispatch} from "react-redux"

import Product from "./product.js"



function Products() {
     const [isShowAdd,setIsShowAdd]=useState(false)
 const dispatch = useDispatch()
 
 


const handleAdd=()=>{
     if(!isShowAdd){
          setIsShowAdd(true)
     }else{
          setIsShowAdd(false)
     }
}

    return (  
         <React.Fragment>
           {/* <div className=" h-[270vh] w-[100vw] flex justify-center font-BVP 
     border-2 border-red-600 flex-wrap gap-[1rem]  gap-y-[2rem] pt-8
     " >
         {products.map((product)=><Product key={product._id} product={ product}/>)}
     <div onClick={()=>handleAdd()}  className=" z-10 translate-x-[45vw] translate-y-[65vh] fixed h-[5rem] w-[5rem] rounded-full bg-yellow-400 flex justify-center items-center cursor-pointer "> <div>add</div> </div>
     
    {isShowAdd?<div className=" mt-[-8rem] h-[100vh] w-[100vw] fixed  flex justify-center items-center">
          <div className="h-[70vh] w-[60vw] border-2 border-red-500 text-center   bg-slate-50">
          <div> Add new product</div>
     </div>
     <div className=" h-[100vh] w-[100vw] absolute -z-10  bg-slate-700 opacity-40 flex justify-center items-center" >
          
     </div>
     </div>:""}
    </div> */}
         </React.Fragment>
  
    );
  }
  
  export default Products;
  