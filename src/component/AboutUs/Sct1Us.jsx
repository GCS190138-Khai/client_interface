import { useEffect } from 'react';
import { useState } from 'react';




import { useSelector ,useDispatch } from 'react-redux';
import { primaryBG, primaryBGYellow } from '../../redux/navSlice';


function Sct1() {
  
  useEffect(()=>{

    window.scrollTo({  top: 0})
  
 },[])
  const dispatch = useDispatch()
  dispatch(primaryBG())
  const bgColor = useSelector((state)=>state.nav.color.bgColor)

  // const pic = require('../../Asset/aboutUs/sct1.1.svg').default
  const pic = "https://live.staticflickr.com/65535/52252453962_e60e9974f8_o.png"
  const [paragraph1,setParagraph1]= useState('Nhóm dự án nghệ thuật cộng đồng khởi nguồn từ Đà Lạt')
  return (  
  <div className={`sct1Us flex flex-col mb:gap-[40px] gap-[10vh] items-center w-screen min-h-screen bg-${bgColor}`}
  
  >
   
        <div className="h-[70vh] mb:h-[17.8rem] mb:px-[20px] px-[2%]  text-primaryBlack   justify-end items-start   w-screen flex flex-col">
        <div className=' hidden mb:inline-block mb:h-[30px] '></div>
      <div className=' flex flex-col mb:h-[fit]   w-[100%] font-semibold    text-[4rem]'>
        <span className=' pb-[15px] mb:pb-0 mb:text-12px mb:w-[10rem]  font-normal uppercase text-aCaption'>{`(Với tinh thần Nghệ thuật kết nối chúng ta, chúng tôi là)`}</span>
        <div className='flex  w-[100%]'>
          <div className=' w-[90vw] mb:w-[90vw] mb:normal-case mb:leading-[1.4] mb:text-30px leading-[1.2] font-[500]  text-aTitle1 capitalize'>
        {paragraph1}
          </div>
          <div className=' mb:hidden h-[97.5%] flex justify-end items-end w-[10vw]  '>
            <div className=' text-aSubtitle font-title-Subtitle ' >
          16-22&#169;
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=' h-[auto] px-[2%] flex justify-between items-start w-screen'>
      
      <div className='pt-[20px] mb:hidden flex flex-col items-start gap-[1.6vw] text-aCaption font-title2-caption  h-[7rem]   text-[#1B1D21] '>
                                <div>
                                    PHỐ BÊN ĐỒI
                                </div>
                                <div className=' ' >
                                  <div>STUDIO</div>
                                  <div>ĐÀ LẠT, LÂM ĐỒNG</div>
                                </div>
                                  <div>
                                  <div>OFFICE</div>
                                  <div>TP.HỒ CHÍ MINH</div>
                                  </div>
                                  <div className=" flex flex-col items-end">
                                  <button className='flex gap-1 items-center'><u>INFO@PHOBENDOI.ART</u><img className='h-3 object-contain rounded-none w-3' src={require('../../Asset/Nav/muitenBuutonDen.svg').default} alt="" /> </button>
                                  <div className=' self-start'>(+84) 97 411 0770</div>
                                  </div>
                                </div>
      
      <div className=' mb:w-screen mb:px-[20px] h-[auto] w-[auto] '>
        <div className=' spacer h-[20px] mb:hidden'></div>
         <img className=' object-cover rounded-2xl mb:h-[34.375rem] mb:w-full h-[200vh] w-[65vw] ' src={pic} alt="123" />
      </div>
    </div>
  </div>
  );
}

export default Sct1;
