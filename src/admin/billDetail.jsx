import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function BillDetail() {

  const  {billID} = useParams()
  const [bill, setBill] = useState(false)
  
  useEffect(()=>{
    (async () => {
        try {
          const res =  await axios.get('https://phobendoi.art/api/bill/get/'+billID)
          return setBill(res.data)
        } catch (error) {
          console.log(error)
        }

    })();

  },[])
if(!bill){
  return (
    <div className=" h-screen w-screen">
      Loading...
    </div>
  )
}else{

  return (
    <div className="flex  pb-[80px] justify-between pt-[10vh] px-[2%] h-auto w-full">
      {/*right  */}
      <form  className="gap-[40px] pr-[3vw]  flex flex-col w-[58%]  ">
        {/* logo */}
        <div> <img className=" w-[146px] h-[96px] object-fill " src="https://live.staticflickr.com/65535/52260428311_97bfa58fc2_o.png" alt="" /> </div>
        {/* info */}
        <div className=" gap-[80px]   flex flex-col ">
          {/* bread */}
          <div className=" gap-[10px] items-center text-aCaption font-[400] uppercase flex">
            <span className=" opacity-50">thông tin đơn hàng</span>
            <img className=" w-[6px] h-[12px] object-fill " src="https://live.staticflickr.com/65535/52259473152_3b61dac0b6_o.png" alt="" />
          
          </div>
          {/* thong tin lien lac */}
       
          {/* // ------Done2 ------// */}
          <div className=" flex gap-[32px] flex-col">
          <div className=" gap-[8px] flex items-center text-aButtonVw font-[600] uppercase text-[#8A8A8A] "> 
          <img className=" w-[25px] object-fill h-[25px]" src="https://live.staticflickr.com/65535/52262732758_c65f4c1f20_o.png" alt="" />
          <span className=" leading-[1] border-b border-primaryBlack border-opacity-30">{bill.name}</span>
          
          </div>
  
            <div className=" rounded-[5px] flex flex-col border border-primaryBlack px-[3%]  " >
            
           
            <div className="  flex items-center  pl-[0.5rem] h-[3.5rem] w-full border-b border-primaryBlack " >
              <label className="text-[#8A8A8A] w-[18%] uppercase" htmlFor="name">Người nhận</label> 
              {/* <input id="name" value={data.name} disabled className=' text-aButtonVw font-[400]  focus:ring-0 w-full outline-none border-none '  type="text" 
                     /> */}
                      <div className=" w-[60%] text-aButtonVw font-[400]  focus:ring-0  outline-none border-none">{bill.buyer.name}</div>
           
            </div>
            <div className="  flex py-[13.5px]  pl-[0.5rem]  w-full border-b border-primaryBlack " >
              <label className="text-[#8A8A8A] w-[18%] uppercase" htmlFor="name">Giao tới</label> 
              {/* <input value={`${data.address},phường/xã ${data.wards},quận/huyện ${data.district}, ${citySelected.name}`} className=' w-full text-aButtonVw font-[400]  focus:ring-0  outline-none border-none '  type="text"
                     /> */}
                     <div className=" w-[60%] text-aButtonVw font-[400]  focus:ring-0  outline-none border-none">{bill.shipmentDetail.fullAdress}</div>
      
            </div>
       
            <div className="  flex items-center  pl-[0.5rem] h-[3.5rem] w-full  " >
              <label className="text-[#8A8A8A] w-[18%] uppercase" htmlFor="email">EMAIL</label> 
              {/* <input id="email" value={data.email} disabled  className=' text-aButtonVw font-[400]  focus:ring-0 w-full outline-none border-none '  type="email" placeholder='Email*' 
                     /> */}
                                     <div className=" w-[60%] text-aButtonVw font-[400]  focus:ring-0  outline-none border-none">{bill.buyer.email}</div>
           
            </div>
  
            </div>
          </div>
          {/* thong tin giao hang */}
      
{/*           
          // ------Done2-sct2 ------// */}
          <div className=" flex gap-[32px] flex-col">
          <div className=" text-aSubtitle font-[500] capitalize text-[#8A8A8A] ">phương thức giao hàng</div>
  
            <div className="  flex flex-col " >
            
            <div className=" min-h-[7vh] border-b border-primaryBlack w-[100%]">
  {/* radio */}
  <div className=" flex pb-[15px]   gap-[15px]">

      <input className="np focus:ring-0 focus:ring-transparent  " checked={!bill.isUseShipmentService}  name="Developer2"  type="radio"  />
          <span className=" text-aButtonVw font-[400] w-[90%] ">Đến nhận hàng trực tiếp tại Phố Bên Đồi Studio (10 Lý Tự Trọng, phường 2, Đà Lạt, Lâm Đồng)</span>
  </div>
  {/* radio */}
  {!bill.isUseShipmentService ?
  <div className=" pb-[1vh] text-[#000000] pt-[15px]  text-[14px] font-title2-caption  ">
   
  </div>:""}
    </div>
    <div className=" min-h-[7vh] pb-[15px] pt-[15px]  border-b border-primaryBlack w-[100%]">

<div className=" flex gap-[15px]   ">
<input name="Developer2"  className="np focus:ring-0 focus:ring-transparent   " checked={bill.isUseShipmentService}  type="radio"  />
<span className=" text-aButtonVw font-[400] w-[90%] ">Sử dụng dịch vụ giao hàng</span>
</div>
{bill.isUseShipmentService ?<div className="  text-[#000000] pt-[15px] text-aCaption font-title2-caption  ">
  <div className=" bg-[#F7F3EE] w-[66%] p-[4vh] ">
        
  </div>
</div>:""}
  </div>
  
  
            </div>

          </div>
          {/* Done2-sct3 */}
         <div className=" flex gap-[32px] flex-col">
          <div className=" text-aSubtitle font-[500] capitalize text-[#8A8A8A] ">phương thức thanh toán</div>
  
            <div className="  flex flex-col " >
            
            <div className=" min-h-[7vh] pb-[15px] pt-[15px]  border-b border-primaryBlack w-[100%]">

<div className=" flex gap-[15px]   ">
<input name="Developer" checked={!bill.isOnlinePayment} className="np focus:ring-0 focus:ring-transparent   "  type="radio" value="Yes" />
<span className=" text-aButtonVw font-[400] w-[90%] ">Thanh toán khi nhận hàng hoặc COD</span>
</div>
{!bill.isOnlinePayment ?<div className="  text-[#000000] pt-[15px] text-aCaption font-title2-caption  ">
  <div className=" bg-[#F7F3EE] w-[66%] p-[4vh] ">
        
  </div>
</div>:""} 
  </div>
    <div className=" min-h-[7vh] pb-[15px] pt-[15px]  border-b border-primaryBlack w-[100%]">

<div className=" flex gap-[15px]   ">
<input name="Developer"  className="np focus:ring-0 focus:ring-transparent   " checked={bill.isOnlinePayment} type="radio" value="Yes" />
<span className=" text-aButtonVw font-[400] w-[90%] ">Thanh toán qua chuyển khoản</span>
</div>
{bill.isOnlinePayment ?<div className="  text-[#000000] pt-[15px] text-aCaption font-title2-caption  ">
  <div className=" bg-[#F7F3EE] p-[4vh] w-[66%] ">

  </div>
</div>:""}
  </div>
  
  
            </div>

          </div>
     
       
          {/* ----------- */}
    
     
          <div  className=" items-center h-[150px] flex">
            <textarea readOnly value={bill.message} maxLength={200} placeholder="ghi chú" className=" rounded-[5px] placeholder:uppercase text-aButtonVw font-[400] h-full w-full resize-none" >

            </textarea>
          </div>
  
          
          <div className=" flex flex-col gap-[40px]">
   

          </div>
          
        </div>
      </form>
      <div className=" w-[1px] bg-primaryBlack  border-l border-primaryBlack opacity-20"> </div>
      {/* left  */}
      <div className="   text-primaryBlack  flex flex-col bg-white w-[38%] h-screen px-[3vw]    ">
 
        <div className="h-fit   pb-[12px]   flex flex-col  w-full">
            {
              bill.products?.map((item,i)=>{
                return (
                  <div key={item.info.product+item.version} className="item items-center min-h-[95px] justify-between   w-full flex">
                      <div className=" relative w-[75px] h-[75px]">
                        <span className=" translate-x-[60px] flex items-center justify-center text-primary translate-y-[-10px] absolute w-[25px] h-[25px] rounded-full bg-primaryBlack text-center text-aCaption font-caption-600 "> <span className=" w-fit h-fit ">{item.quantity}</span></span>
                        <img className=" h-full w-full object-cover object-center" src={item.thumnailPics} alt="" />
                      </div>
                      {/*  */}
                      <div className=" justify-between w-[70%] flex flex-col h-[78px]">
                        <div className="  flex gap-[2vw]">
                        <div className="  w-[70%] ">
                            <div className="text-aCaption font-caption-600  ">{item.name}</div>
                            <div className=" text-aCaption font-title2-caption text-[#767676]">{item.version}</div>
                        </div>
                        <div className=" w-[30%] text-aCaption font-title2-caption">
                          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)}
                        </div>
                        </div>
                        {/*  */}
                        <div className=" flex">
                          <div className=" self-end w-[70%] ">
                          {/* <div className=" h-fit flex items-center   " >   
                  <button  
                   className="  bg-inherit h-[100%] "><img className=" h-[10px]  w-[10px] " src={require("./negawhite.svg").default} alt="123" /></button>
                   <div className="  text-aCaption font-title2-caption bg-inherit  w-[4vw]  flex justify-center items-center ">{item.quantity<10?`0${item.quantity}`:item.quantity}</div>
                   <button  className="  bg-inherit  h-[100%] "><img className="  w-[10px] h-[10px] " src={require("./pluswhite.svg").default} alt="123" /></button>
                 </div> */}
                          </div>
                          <div  className=" opacity-0 cursor-pointer font-caption-600 text-right text-[#767676] w-[30%]">
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
        <div  className=" flex justify-center items-center border-opacity-30 h-[100px] border-t border-b border-primaryBlack ">
            <div className="flex w-full justify-between">
              <input value={bill.discount||'Không'} type="text" className={!bill.discount?" h-[55px] rounded-[5px]   w-[73%] ":" h-[59px] rounded-[5px] text-green-400  w-[73%] "} placeholder="  Nhập mã giảm giá của bạn" />
            
            </div>
        </div>
        {/*  */}
        <div className=" pt-[14px] border-b border-primaryBlack border-opacity-30 pb-[14px]">

      
      
        </div>
        <div className=" flex items-center pt-[13px]  justify-between">
          <div className=" uppercase text-aPara font-[500]" >Tổng Cộng</div>
          <div className=" text-aPara font-[500]"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(bill.tolal_cost)} </div>
        </div>
        {/*  */}
      
      </div>
      </div>
     );
}
}

export default BillDetail;