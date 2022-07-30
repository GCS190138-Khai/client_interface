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
  const pic = require('./image 14.svg').default
  const [paragraph1,setParagraph1]= useState('Nhóm dự án nghệ thuật cộng đồng khởi nguồn từ Đà Lạt')
  return (  
  <div className={`sct1Us flex flex-col gap-[10vh] items-center w-screen min-h-screen bg-${bgColor}`}
  
  >
        <div className="h-[70vh] px-[2%] text-primaryBlack   justify-end items-start   w-screen flex flex-col">
      <div className=' flex flex-col   w-[100%] font-semibold   text-[4rem]'>
        <span className=' pb-[15px]  font-normal uppercase text-aCaption'>{`(Với tinh thần Nghệ thuật kết nối chúng ta, chúng tôi là)`}</span>
        <div className='flex  w-[100%]'>
          <div className=' w-[90vw] leading-[1.2] font-[500]  text-aTitle1 capitalize'>
        {paragraph1}
          </div>
          <div className=' h-[97.5%] flex justify-end items-end w-[10vw]  '>
            <div className=' text-aSubtitle font-title-Subtitle ' >
          16-22&#169;
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=' h-[auto] px-[2%] flex justify-between items-start w-screen'>
      
      <div className='pt-[20px] flex flex-col items-start gap-[1.6vw] text-aCaption font-title2-caption  h-[7rem]   text-[#1B1D21] '>
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
      
      <div className=' h-[auto] w-[auto] '>
        <div className=' spacer h-[20px]'></div>
         <img className=' object-cover rounded-2xl h-[200vh] w-[65vw] ' src={pic} alt="123" />
      </div>
    </div>
  </div>
  );
}

export default Sct1;
