

import React,{useRef,useEffect}  from "react"
import { Link } from "react-router-dom";
import "./Sct7.scss"





function Section7() {
 
    const  items =[{
        title:`Coming Soon`,
        cost:"",
        pic:require('../../Asset/Mainpage/item1.svg')
    },
    {
        title:`Coming Soon`,
        cost:"",
        pic:require('../../Asset/Mainpage/item2.svg')
    },
    {
        title:`Coming Soon`,
        cost:"",
        pic:require('../../Asset/Mainpage/item3.svg')
    },
    
]
   
     
  return (  
    <div className="flex flex-col min-h-screen pb-[160px] gap-[7vh] pt-[65px] container_7 ">
       
        <div className="  header_text">
        <div className="text flex ">
        <div className="text1_1 text-aCaption mt-[2.5rem] font-[400] ">
        {`(SẢN PHẨM TỪ STUDIO)`}
        </div>
        <div className=" translate-x-[-11.3vw] indent-[15vw] w-[85vw] text-aTitle2 leading-[5vw] font-[500] ">
        Phố Bên Đồi cùng cộng đồng kể chuyện và những ước mơ về Đà Lạt thông qua những sản phẩm văn hóa. “Design by community, for the community”
        </div>
        </div>
        </div>
        <div className=" flex-col    gap-[20vh] items-center flex justify-center min-h-screen w-screen">


        <div className="   items-start gap-[5vw] flex justify-center w-screen h-[95%]">
        { items.map((item,index)=>{
            return (

        <div key={index} className="h-[65vh] group relative  w-[25vw]" >
             <div className=" flex justify-center items-center rounded-[20px] absolute w-[100%] h-[100%] ">
                 <img className=" group-hover:ease-bounced duration-500 absolute z-20 object-cotain h-0 w-0 group-hover:w-[8vw] group-hover:h-[8vw] " src={require("../../Asset/Mainpage/yellow45degArr.svg").default} alt="eror" />
                 <div className=" group-hover:ease-bounced duration-500 group-hover:bg-[#000000] rounded-[20px] group-hover:opacity-50 h-[100%] w-[100%] "></div>
             </div>
            <img className=" h-[65vh] group-hover:ease-bounced duration-500 group-hover:object-contain group-hover:object-center object-cover w-[25vw] rounded-[20px] " src={item.pic.default} alt="error" />
            <div className=" translate-x-[1vw] w-[90%] mt-[1vw]">
                <div className=" text-aPara font-medium">{`${item.title}`}</div>
                <div className=" text-aButtonVw">{item.cost}<u></u></div>
            </div>
               
            
        </div>
            )
        }) 
        }
        </div>
        <button  className=' text-aButtonVw flex gap-3 items-end ' ><img className='h-6 mt-[-0.5vw] object-contain rounded-none w-5' src={require('../../Asset/Nav/buttonLeftArrow.svg').default} alt="" /> <Link to={'/shop'}><span className=' border-b-[1px] font-bold leading-4 border-black'>XEM TẤT CẢ</span></Link>    </button>
        </div>
       

     
    </div>
  );
}

export default Section7;
