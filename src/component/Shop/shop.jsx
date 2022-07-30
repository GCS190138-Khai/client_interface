
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { primaryBGBlack } from "../../redux/navSlice";

import Select, { components } from "react-select";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchGenres, fetchProducts, getAllGen } from "../../api";
import './arrow.scss'
import { cate, getAllCate, getAllProducts } from "../../selector";
import { useRef } from "react";
import _ from "lodash";

export   function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true)

  // Since ref persists value between renders (and itself doesn't trigger a render when value is changed), we can simply just set ref to a failing condition on our 1st render so that component only is re-rendered when dependencies change and not also "onMount"
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    return callback()
  }, dependencies)
}
function Shop() {
  const [isLoading, setLoading] = useState(true);
  const productList = useSelector((state)=>getAllProducts(state))
  const listOfCate = useSelector((state)=>getAllCate(state))
  const dispatch = useDispatch()

   useLayoutEffect(()=>{
    if(isLoading){
      (async () => {
        await fetchProducts(dispatch)
        await getAllGen(dispatch)
        return setLoading(false)
      })();
    
      
    }
   },[isLoading])
//   useUpdateEffect(()=>{
   
//       fetchProducts(dispatch)
//       getAllGen(dispatch)
//       setLoading(false)
   
// },[])

// useUpdateEffect(()=>{
// getAllGen(dispatch)
// },[])
useEffect(()=>{
  
  dispatch(primaryBGBlack())
 
})


    const counterNew = ()=>{
      let count =0
      productList.forEach(item => {
        if(item.isNewest){
         count= count+1
        }
      });
      return count
    }
    const counterBest = (  )=>{
      let count =0
      productList.forEach(item => {
        if(item.isBestSeller){
         count= count+1
        }
      });
      return count
    }
    const staticLink = [{
          name:" tất cả sản phẩm",
          _id:"",
          number:productList? productList.length:"loading...",
    } ,
    {
      name:" vừa ra mắt",
      _id:"new-releases",
      number:productList?counterNew():"loading...",
    },
    {
      name:"bán chạy",
      _id:"best-seller",
      number:productList?counterBest():"loading...",
    },
  ]
   
   const cateCounter=(id)=>{
    
    let newList =[]
    productList.forEach(
      item => {
        
        if(item.genres.find( item1=>item1._id===id) ){
          newList.push(item)
        }
       
      }
    )
     
    return newList.length<10 ? `0${newList.length}`:`${newList.length}`
   }

   if(isLoading){
    return(
      <div className=" h-screen w-screen fixed text-aTitle1  ">
        loading...
      </div>
    )
   }else{

     return (  
     <div className=" w-screen h-auto  flex flex-col items-center justify-center  " >
           <div className=" relative w-screen h-[95vh]">
            <img className="  fixed -z-10 w-[100vw] object-center h-screen object-cover " src={require("./heropic.svg").default} alt="123" />
            <div className=" fixed -z-[1] text-white items-center   flex  w-screen h-screen">
                 <div className=" w-[10%]"> <img className=" h-[18vh] w-[10vw]" src={require("./arrow.svg").default} alt=" 123" /></div>
                 <div className=" flex justify-center w-[40%] uppercase"> {`(studio sáng tạo)`} </div>
                 <div className=" capitalize w-[50%] text-aTitle1 font-[600]"> 
                   <div>Sản xuất bởi </div>
                   <div className=" mt-[-4vh]">phố bên đồi</div>
                   </div>   
            </div>
           </div>
           <div className=" relative flex  rounded-t-[3.125rem] bg-primary pt-[25vh] h-auto w-screen">
                   <div className=" sticky pl-[2%] pt-[32vh] top-[-22vh] w-[25%] overflow-y-auto h-screen   ">
                     <div className=" min-h-fit gap-[4vh] capitalize text-aPara font-[500] flex flex-col">
                      <div>

                         {
                           staticLink.map((item,i)=>{
                             return(
                               <NavLink key={i}  className={nav=>nav.isActive?"opacity-100 arrow ":"opacity-100"} end={i===0?true:false}    to={item._id} >
                               <div    className="  cursor-pointer text-aPara font-[500] capitalize flex items-start gap-1 ">
                                 {item.name} <span className=" text-aCaption font-title2-caption " >{item.number<10 ? `0${item.number}`:`${item.number}`} </span>
                               </div>
                            
                               </NavLink>
                             )
                           })
                         }
                      </div>
                      <div>

                           {
                           listOfCate?.map((item,i)=>{
                             return(
                               <NavLink key={i}  className={nav=>nav.isActive?"opacity-100 arrow ":"opacity-100"} end={i===0?true:false}    to={item._id} >
                               <div    className="  cursor-pointer text-aPara font-[500] capitalize flex items-start gap-1 ">
                                 {item.name} <span className=" text-aCaption font-title2-caption " >{} {cateCounter(item._id)} </span>
                               </div>
                            
                               </NavLink>
                             )
                           })
                         }
                      </div>
                     </div>
                   </div>
                   <div className=" w-[75%]      ">
                   <Outlet></Outlet>   
                   </div>
           </div>
           
     </div>
     );
   }
  }
  
  export default Shop;
  