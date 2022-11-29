import { PAUSE } from "redux-persist";

function Sct2() {
  const paragraph1 = 'Đà Lạt từ xưa đến nay vẫn luôn là thành phố được nhiều nghệ sĩ yêu mến. Trong gần 130 năm hình thành và phát triển, nơi đây đã mang đến những nguồn cảm hứng bất tận cho nhiều tác phẩm thuộc mọi loại hình nghệ thuật, từ thơ văn đến âm nhạc, từ hội họa đến điện ảnh. '
  const paragraph2 ='Trong thành phố ấy, có những địa điểm đang dần bị lãng quên, có những góc phố ít người biết đến; có những câu chuyện chưa bao giờ được kể, nhưng bên cạnh đó cũng có những không gian sáng tạo, không gian nghệ thuật mới, các nghệ sĩ, chuyên gia, nhà khoa học và các bạn trẻ sinh sống tạo thêm nhiều trải nghiệm thú vị về văn hoá nghệ thuật cùng cộng đồng địa phương và khách du lịch.'
  const paragraph3 ='ART CONNECTS US - Với tinh thần “Nghệ thuật kết nối Chúng ta” Phố Bên Đồi mong muốn tạo ra một nền tảng kết nối các nguồn lực, nghệ sĩ, chuyên gia từ cộng đồng trong nước và quốc tế để chung tay xây dựng thương hiệu “Đà Lạt - Thành phố Nghệ thuật”, đưa thành phố hoà vào dòng chảy văn hóa sáng tạo.'
  const paragraph4='Trải qua 6 năm hoạt động, tính đến năm 2022, với những sự kiện thành công và uy tín được tạo dựng trong nước và quốc tế, chương trình nghệ thuật đa hình thái Phố Bên Đồi đã và đang thu hút được sự quan tâm lớn của cộng đồng yêu nghệ thuật, chuyên gia, các doanh nghiệp cũng như sự ủng hộ từ người dân và chính quyền địa phương.'
  const paragraph5 ='Phố Bên Đồi đã đi tiên phong trong việc tạo ra một nền tảng để kết nối các nguồn lực trong cộng đồng, đồng thời xây dựng thương hiệu "Đà Lạt - Thành phố nghệ thuật", đóng vai trò quan trọng trong chiến lược phát triển của ngành công nghiệp sáng tạo Việt Nam và quốc tế.'
  const paragraph6= 'Thông qua các hình thức nghệ thuật đương đại, công nghệ, hoạt động cộng đồng và du lịch, Phố Bên Đồi khuyến khích công chúng nâng cao nhận thức về bảo tồn đô thị, bảo vệ môi trường và phát triển bền vững.'
  const pic = "https://live.staticflickr.com/65535/52253422656_40fecf4428_o.png"
  return ( <div className=" bg-primary w-screen ">
        <div className="min-h-[120vh] mb:min-h-fit px-[2%] mb:px-[20px] mb:pt-[100px]  pt-[120px]   w-screen flex flex-col">
      <div className=' flex mb:flex-col   w-[100%] font-semibold   '>
        <span className=' w-[32.5%] mb:text-12px  font-normal text-aCaption'>{`(CÂU CHUYỆN)`}</span>
        <div className='flex gap-[10.5vw] mb:w-full  w-[64.5%]'>
          <div className=' mb:hidden w-[13vw] text-aSubtitle opacity-0 '>
          “Đà Lạt - City of Arts”
          </div>
          <div className=' mb:w-full mb:text-16px text-aPara font-p flex flex-col gap-[2vh] items-end w-[33vw]  '>
            <div className='' >
              {paragraph1}
            </div>
            <div className='' >
              {paragraph2}
            </div>
            <div className='' >
              {paragraph3}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=" min-h-fit mb:pt-[100px] mb:px-[0] pt-[120px] w-screen px-[2%]">
        <img className=" mb:w-screen mb:object-cover mb:object-center mb:h-[37.5rem] " src={pic} alt="error" />
    </div>
    <div className=" min-h-fit mb:pb-[100px] mb:min-h-fit pb-[120px] mb:pt-[100px] mb:px-[20px] px-[2%]  pt-[120px]   w-screen flex flex-col">
      <div className=' flex mb:flex-col   w-[100%] font-semibold   '>
        <span className=' w-[32.2%]  font-normal mb:text-12px text-aCaption'>{`(SỰ PHÁT TRIỂN)`}</span>
        <div className='flex gap-[42px] mb:w-full  w-[64.5%]'>
          <div className=' mb:hidden w-[300px] text-aSubtitle capitalize opacity-0 '>
          Khẳng định uy tín trong nước và quốc tế
          </div>
          <div className=' text-aPara mb:text-16px mb:w-full font-p flex flex-col items-end w-[524px]  '>
            <div className='' >
              {paragraph4}
            </div>
            <div className='' >
              {paragraph5}
            </div>
            <div className='' >
              {paragraph6}
            </div>
          </div>
        </div>
      </div>
    </div>


  </div> );
}

export default Sct2;