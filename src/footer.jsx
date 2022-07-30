import gsap from 'gsap'
import { Link } from 'react-router-dom'

function Footer() {
const goTop=()=>{
 
  gsap.to( window,{duration:1, scrollTo:{
    y:0
  }})
 
}
const logo = require('./Asset/Nav/logo.svg').default
const button = require('./Asset/Nav/muitenButton.svg').default
const upper = require('./Asset/Mainpage/upperArrow.svg').default
const picSize = ('200px')
const pages = ['Về chúng tôi','Dịch vụ & Dự án','Cửa hàng','Sự kiện','Liên hệ']
const p1 ='Phố Bên Đồi là dự án nghệ thuật đa hình thái mang tính cộng đồng được thành lập từ năm 2016, với mục tiêu định vị Đà Lạt là điểm đến văn hóa độc đáo ở khu vực Đông Nam Á.'
const info = [{
  title:"Văn phòng",
  address:"232/6 Vo Thi Sau, District 3, HCM City",
  phone:"(+84) 97 411 0770",
  time:"9AM - 9PM",
  button:false
},{
  title:"Creative Studio",
  address:"Tầng 3 - Trung tâm hoạt động thanh thiếu nhi tỉnh Lâm Đồng, Số 10 Đường Lý Tự Trọng, P. 2, TP. Đà Lạt.",
  phone:"(+84) 97 411 0770",
  time:"9AM - 9PM",
  button:false
}
,{
  title:"Follow Us",
  address:"FACEBOOK",
  phone:"",
  time:"",
  button:button
}
]
  return ( 
    <div className=" text-primary flex flex-col items-center justify-center bg-primaryBlack h-[120vh] w-screen">
          <div className="  flex items-center  px-[2%] w-screen h-[54%] ">
            <div className=" w-[30%] justify-center flex flex-col">
              <img height={picSize} width={picSize} src={logo} alt="erro" />
            </div>
            <div className="  flex flex-col translate-y-[6vh] h-[50%] justify-between w-[70%]">
              <div className='pb-[5vh] w-[90%] text-aSubtitle font-title-Subtitle capitalize'>
                {p1}
              </div>
              <div className=' text-aCaption normal-case font-title2-caption justify-between w-[85%] flex'>
                  <div className='  '>
                      <div className=' '>Hợp tác cùng chúng tôi? </div>
                      <div className=' '> Vui lòng để lại lời nhắn  <Link to={"/contact"}><u>tại đây</u></Link> .</div>
                  </div>
                  <div className=' '>
                      <div>Hoặc gửi email qua</div>
                      <div className='flex gap-1 uppercase justify-between cursor-pointer'> <u onClick={()=>{
                                           window.open('https://mail.google.com/mail/u/0/#inbox', '_blank')
                      }}>phobendoi@info.art</u> <img className=' object-cover  translate-y-[0.3vw] w-[0.8vw] h-[0.8vw]' src={button} alt="error" /></div>
                  </div>
              </div>
            </div>
          </div>
          <div className=' pt-[5vh] border-b-2 border-primary w-[96vw] '></div>
          <div className=" flex  px-[2%] w-screen h-[45%] ">
            <div className=" text-aSubtitleVw w-[30%] justify-center flex flex-col">
              { pages.map((item,index)=>{
                return(  <div key={index} className=' capitalize '> <Link to={item==="Về chúng tôi"?"/aboutus":item==="Dịch vụ & Dự án"?"/work":item==="Cửa hàng"?"/shop":item==="Sự kiện"?"/event":"/contact"}>{item}</Link>  </div> )
              })}
            </div>
            <div className=" flex justify-center flex-col w-[60%]">
              <div className='flex gap-[5vw] '>

            { info.map((item,index)=>{
                return( <div key={index} className='  flex flex-col '>
                  <div className=' pb-[2vh] text-aPara font-[600]' >{item.title} </div>
                  <div className={index===1?'flex  w-[19vw] text-aCaption font-title2-caption':'flex cursor-pointer text-aCaption font-title2-caption '}>{item.button? <u onClick={()=>{
                    window.open('https://www.facebook.com/phobendoi', '_blank')
                  }}>{item.address}</u> :item.address} {item.button?<img className=' translate-x-1 translate-y-[0.3vw] w-[0.8vw] h-[0.8vw]' src={item.button} alt="none" />:""}</div>
                  <div className=' text-aCaption font-title2-caption'>{item.phone} </div>
                  <div className=' text-aCaption font-title2-caption'>{item.time}</div>
                </div> )
              })}
              </div>
              <div className=' opacity-50 translate-y-[-1vh] text-aCaption h-[12vh] flex items-end '>
             { `Copyright © 2016 - ${ (new Date().getFullYear() )} Phố Bên Đồi. All rights reserved.`} 
              </div>
            </div>
            <div className='  h-[78%] self-end pl-[4.5vw] w-[10%]'>
              <div onClick={goTop} className=' border-2 flex justify-center items-center cursor-pointer rounded-[50%] h-[5vw] w-[5vw] '>
                <img className=' h-[3vw] w-[3vw]' src={upper} alt="error" />
              </div>
            </div>
          </div>
    </div>
   );
}

export default Footer;