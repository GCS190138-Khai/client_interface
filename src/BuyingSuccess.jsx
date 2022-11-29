import { useDispatch } from 'react-redux';
import { successBuyFaild } from './redux/navSlice';

function Bought() {
  const dispatch = useDispatch()
 
  return ( 
    <div className=" fixed z-50 flex justify-center items-center h-screen w-screen ">
        <div onClick={()=> dispatch(successBuyFaild())} className=" absolute w-screen h-screen bg-primaryBlack opacity-30"></div>
        <div className="flex flex-col z-20 absolute mb:w-screen mb:h-screen  w-[70%]  p-[3%] h-[70%] mb:rounded-none rounded-[20px] bg-[#E6DFD7] "> 
          <div className="  mb:h-fit mb:pb-[3.75rem] flex mb:flex-col mb:gap-[6.25rem] h-[90%] ">
          <div className=" notmb:hidden pt-[0.5rem] w-full flex justify-end ">
              <img onClick={()=>{ 
                console.log("click")
                dispatch(successBuyFaild())}} className=' h-[30px] w-[30px]  ' src={require("./cross.png")} alt="" />
            </div>
            <div className=" mb:hidden pt-[0.5rem] pl-[3rem] w-[30%]">
            <img className='  w-[160px] h-[150px] object-fill ' src={require('./smile.png')} alt="" />
            </div>
            <div className=" mb:w-full mb:h-[fit] notmb:justify-between  mb:gap-[3.75rem] h-[75%]  w-[60%] flex flex-col">
                <div className=" leading-[1.2] text-aSubtitle mb:text-28px font-[500]">Cám ơn bạn đã ủng hộ Phố Bên Đồi! Xin vui lòng chờ chúng tôi xác nhận qua Email và process đơn hàng của bạn trong thời gian sớm nhất nhé.</div>
                <div className=" cursor-pointer flex items-center"> 
                  <span className=" mb:text-12px border-b border-primaryBlack leading-[0.8] text-aButtonVw font-[600] uppercase">chính sách đổi trả</span>
                    <img className=' w-[18px] h-[18px] object-fill ' src={require('./arrowLink.png')} alt="" />
                </div>
            </div>
            <div className=" mb:hidden pt-[0.5rem] w-[10%] flex justify-end ">
              <img onClick={()=> dispatch(successBuyFaild)} className=' h-[30px] w-[30px]  ' src={require("./cross.png")} alt="" />
            </div>

          </div>
          {/*  */}
   
          <div className=" mb:hidden spacer border-b border-primaryBlack h-[1px] w-full "></div>
          <div className=' items-center mb:flex-col mb:text-12px mb:font-400 mb:items-start h-[10%] justify-between flex text-aCaption font-[400] uppercase '>
            <div>facebook:  phố bên đồi</div>
            <div>hotline:  093892310338</div>
            <div>email: info@phobendoi.art</div>
          </div>
        </div>
    </div>
   );
}

export default Bought;