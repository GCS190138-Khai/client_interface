
import { useRef } from 'react';


function Sct3() {
    const bg = useRef()
  


  const paragraph1='Nghệ thuật đương đại là một cách thể hiện hơi thở cuộc sống đô thị, làm cho mọi vật chuyển động hướng về tương lai, và giúp phát triển những giá trị sáng tạo - đây cũng là giá trị cốt lõi của chúng tôi.'
  return ( 
  <div>
        <div ref={bg} className={`h-screen px-[2%] bg-primaryYellow justify-center items-start   w-screen flex flex-col`}>
      <div className='   w-[90vw] font-[500] leading-[1.2]  text-[4rem]'>
        <span className=' pr-[7vw] font-normal text-aCaption '>{`(CHÂM NGÔN)`}</span>{paragraph1}
      </div>
       

    </div>
  </div>  
  );
}

export default Sct3;