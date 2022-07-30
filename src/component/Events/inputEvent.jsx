import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { primaryBG, primaryBGBlack } from "../../redux/navSlice";
import Select from 'react-select'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, Calendar } from 'react-date-range';
import { createEvent } from "../../api";
import { addDays, endOfDay, set, startOfDay } from "date-fns";
import vi from 'date-fns/locale/vi'
import { format } from "date-fns/esm";
import { useEffect } from "react";
 




function InputEvent() {
   
  const location = useLocation()
  const navigation = useNavigate()
  // const {tab } = location.state===null?"tất cả":location.state

  const [range,setRange]= useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(),7),
      key:'selection'
    }
  ])
  const selecterObject=( arr )=>{
    let newSelector=[]

    arr?.map((item,i)=>{
      return newSelector.push({...item,value:item._id,label:item.name})
    })
    return newSelector

  }

  const dispatch = useDispatch()
  dispatch(primaryBG())
  const [onlinePaymentTab, setOnlinePaymentTab] = useState(false)
  const [isSingle, setisSingle] = useState(false)
  const [Name, setName] = useState('')
  const [Type, setType] = useState('')
  const [EventCode, setEventCode] = useState('')
  const [HeroPic, setHeroPic] = useState('')
  const [artist,setArtist] = useState(['Hãy nhập tên nghệ sĩ vào đây'])
  const [Discription, setDiscription] = useState([''])
  const [EventStatus, setEventStatus] = useState(0)
  const [typeOfTicket, setTypeOfTicket] = useState(2)
  const [IsShowArtist, setIsShowArtist] = useState(false)
  const [Address, setAddress] = useState('')
  const [duration, setduration] = useState(0)
  const [startHour, setstartHour] = useState(0)
  const [startMin, setstartMin] = useState(0)
  const [isHidden, setisHidden] = useState(true)
  const [TicketLimitationAtOnce, setTicketLimitationAtOnce] = useState(10)
  const [online, setonline] = useState({
    isShow: true,
    stk:"01292948491212",
    bank:"vietcombank",
    stkName:"Nguyen Van A",
    ckContent:"Cu phap: "
  })
  const [offline,setoffline] = useState({})
  const [ticket,setTicket]=useState([{
    name:"Hãy điền tên vé",
    cost:5000000,
    session:[{
      time:9,
      maxTicket:500,
      min:0
    }
  ]
  }])
  const [dateRange,setDateRange]=useState([{date:new Date()}])
  
 
  // console.log( format(range[0].endDate,"MM/dd/yyyy") , format(range[0].startDate,"MM/dd/yyyy"))

  const parseDateLoop=(tickets,startDate,sec)=>{
    let arr =[]
    console.log(sec)
    for (let index = 0; index <= sec; index++) {
      
      let ranges={ date: addDays(startDate,index), tickets: tickets }
      
      arr.push(ranges)
    }
    console.log(arr)
     return arr
  }
 

  


  const Event={
    name:Name,
  
    eventCode:EventCode, 
    heroPic:HeroPic,
    artist:artist,
    duration:duration,
    startMin:startMin,
    startHour:startHour,
    discription:Discription,
    eventStatus:EventStatus,
    startDate: startOfDay(dateRange[0]?.date) ,
    endDate: endOfDay(dateRange[dateRange.length-1]?.date) ,
    isShowArtist:IsShowArtist,
    address:Address,
    ticketLimitationAtOnce:TicketLimitationAtOnce,
    dateRange:dateRange,
    typeOfTicket:typeOfTicket,
    isHidden:isHidden
  }

  // console.log(Event)
  const handleSubmit =()=>{
      createEvent(dispatch,Event,navigation)
  }

  // const onAddSeat = (e,index) => {
    
  //   // 1. Make a shallow copy of the array
  //   let temp_state = [...Seat];
    
  //   // 2. Make a shallow copy of the element you want to mutate
  //   let temp_element = { ...temp_state[index] };
    
  //   // 3. Update the property you're interested in
  //   temp_element.seats = [...temp_element.seats,e ];
    
  //   // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
  //   temp_state[index] = temp_element;
    
  //   // 5. Set the state to our new copy
  //   setSeat( temp_state );
  // }
  // const onDeleteSeat = (index,i) => {
    
  //   // 1. Make a shallow copy of the array
  //   let temp_state = [...Seat];
    
  //   // 2. Make a shallow copy of the element you want to mutate
  //   let temp_element = { ...temp_state[index] };
    
  //   // 3. Update the property you're interested in
  //   temp_element.seats.splice(i,1)
    
  //   // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
  //   temp_state[index] = temp_element;
    
  //   // 5. Set the state to our new copy
  //   setSeat( temp_state );
  // }
  // const handleSeatId = (value,index) => {
  //   let temp_state = [...SeatId];
  //   temp_state[index] =value
  //   setSeatId(temp_state)

  // };
  const handleArtist = (value,index) => {
    let temp_state = [...artist];
    temp_state[index] =value
    setArtist(temp_state)

  };
  const handleDiscription = (value,index) => {
    let temp_state = [...Discription];
    temp_state[index] =value
    setDiscription(temp_state)

  };
  
  const handleDelete = (i,ar)=>{
     let temp_state = [...ar] 
     temp_state.splice(i,1)
    return temp_state
  }
  
const handleOnchangeName =(index,e,arr)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  temp_element.name =  e
  temp_state[index] =temp_element
    return setTicket(temp_state)
}
const handleOnchangeCost =(index,e,arr)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  temp_element.cost =  e
  temp_state[index] =temp_element
    return setTicket(temp_state)
}
const handleOnchangeHour =(index,e,arr,indexChild)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  let temp_child ={ ...temp_element.session[indexChild]} 
  // console.log("child",temp_child)
  temp_child.time = parseInt(e) 
  // console.log("child2",temp_child)
  temp_element.session[indexChild] = temp_child
  // console.log("element",temp_element)
  temp_state[index] = temp_element
    return setTicket(temp_state)
}
const handleOnchangeMin =(index,e,arr,indexChild)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  let temp_child ={ ...temp_element.session[indexChild]} 
  // console.log("child",temp_child)
  temp_child.min = parseInt(e) 
  // console.log("child2",temp_child)
  temp_element.session[indexChild] = temp_child
  // console.log("element",temp_element)
  temp_state[index] = temp_element
    return setTicket(temp_state)
}
const handleOnchangeMax =(index,e,arr,indexChild)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  let temp_child ={ ...temp_element.session[indexChild]} 
  // console.log("child",temp_child)
  temp_child.maxTicket = parseInt(e) 
  // console.log("child2",temp_child)
  temp_element.session[indexChild] = temp_child
  // console.log("element",temp_element)
  temp_state[index] = temp_element
    return setTicket(temp_state)
}
const handleOnchangeAddHour =(index,arr)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  let temp_child =[...temp_element.session,{time:9 , maxTicket:500 } ]
  // console.log("child",temp_child)
  // temp_child= [...temp_child,]
  // console.log("child2",temp_child)
  temp_element.session = temp_child
  // console.log("element",temp_element)
  temp_state[index] = temp_element
    return setTicket(temp_state)
}
const handleOnchangeDeleteHour =(index,arr,indexChild)=>{
  let temp_state = [...arr];
  let temp_element = { ...temp_state[index] };
  temp_element.session.splice(indexChild,1)
  // console.log("child",temp_child)
  // temp_child= [...temp_child,]
  // console.log("child2",temp_child)
   
  // console.log("element",temp_element)
  temp_state[index] = temp_element
    return setTicket(temp_state)
}
const handleOnchangeAddTicket =(arr)=>{
  let temp_state = [...arr,{
    name:"Hãy điền tên vé",
    cost:5000000,
    session:[{
      time:9,
      maxTicket:500
    }
  ]
  }];
  

 
    return setTicket(temp_state)
}
const handleOnchangeDeleteTicket =(index,arr)=>{
  let temp_state = [...arr];
  temp_state.splice(index,1)

    return setTicket(temp_state)
}

  return ( 

    <div className=" h-[auto] flex pt-[20vh]  px-[2%]  flex-col items-center w-[100%] bg-primary ">
      
      {!onlinePaymentTab?<div className="  w-[100%] h-[auto]  flex flex-col border-2 border-red-400 " >
      <div className="gap-[5vh] flex flex-col items-center  ">
     
  

      <div className=" gap-[5vh] flex flex-col">
      <label htmlFor="name"> name </label> <input required value={Name} onChange={(e)=>setName(e.target.value)} type="text" id="name" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name of Event"/>
      {/* <label htmlFor="type"> type </label><input required value={Type} onChange={(e)=>setType(e.target.value)} id="type" placeholder="ví dụ: Buổi Hòa Nhạc" type="text" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
      {/* <label htmlFor="duration">{` thời lượng tính bằng giờ (hours):  `}</label><input  value={duration} onChange={(e)=>setDuration(e.target.value)} id="duration"  type="number" className="block p-4 pl-10 w-[10vw] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
      <label htmlFor="eventCode"> eventCode </label><input required value={EventCode} onChange={(e)=>setEventCode(e.target.value)} id="EventCode" placeholder="code này không được trùng lặp" type="text" className="block p-4 pl-10  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <label htmlFor="heroPic"> heroPicture </label><input required value={HeroPic} onChange={(e)=>setHeroPic(e.target.value)} id="heroPic" placeholder="hãy dán link ảnh đã up vào đây. ví dụ: http://" type="text" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <div className=" flex items-center gap-3 ">
        thời gian bắt đầu của sự kiện 
      <label htmlFor="startHour "></label><input required value={startHour} onChange={(e)=>setstartHour(e.target.value)} id="startHour" placeholder="giờ ( hours ) " min={0} max={23} type="number"  className="block p-4 pl-10 w-[10vw] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <label htmlFor="startMin">giờ </label><input required value={`${startMin}`} onChange={(e)=>setstartMin(e.target.value)} id="startMin" placeholder=" phút ( minutes ) " min={0} max={59} type="number"  className="block p-4 pl-10 w-[10vw] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> <label htmlFor=""> phút </label>
      </div>
      <label htmlFor="duration"> thời lượng tiêu chuẩn tính bằng giờ {`(hours)`}  </label> <input required value={`${duration}`} onChange={(e)=>setduration(e.target.value)} id="duration" placeholder=" thời lượng của event này trong 1 khung giờ ( đơn vị tính bằng giờ-hours )" type="number"  className="block p-4 pl-10 w-[6vw] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <label htmlFor="artist"> artist </label>
     { artist?.map((item,i)=>{
      return(
        <div key={i} className="div items-center flex gap-4">
          Nghệ sĩ THỨ {`${i+1}`}:
          <input onChange={(e)=>handleArtist(e.target.value,i)} key={i} id="name" value={item} type="text" placeholder= {`Nhập tên nghệ sĩ ở đây`} className=' block p-4 pl-10 w-[50vw] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          {i===0?"":<button onClick={()=>{setArtist(handleDelete(i,artist))}} className=" w-[12vw] h-[5vh] text-center text-white rounded-xl bg-red-500  "> Delete {`Nghệ sĩ THỨ ${i+1}`}</button> } 
          {/* đổi cái splice */}
        </div>
      )
     }) }
    <div> <button onClick={()=>setArtist(artist=>[...artist,`Hãy điền tên nghệ sĩ mới thêm`])} className="rounded-xl w-[10vw] text-white text-center bg-pink-400 h-[3vw]"> Thêm nghệ sĩ</button> </div>

      <label htmlFor="discription"> discription </label> 
      {Discription.map((item,i)=>{
        return(
          <div className="">

            <textarea key={i} value={item} onChange={(e)=>handleDiscription(e.target.value,i)} id="discription" rows="4" className="block p-2.5 resize-none w-[40%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Viết Discription về Event"></textarea>
            {i===0?"":<button onClick={()=>{setDiscription(handleDelete(i,Discription))}} className=" w-[20vw] h-[5vh] text-center text-white rounded-xl bg-red-500  "> Delete {`Đoạn viết về sự kiện ${i+1}`}</button> } 
          </div>
        )
      })}
      {Discription.length<5?<div><button onClick={()=>setDiscription(Discription=>[...Discription,`Hãy điền đoạn văn mới thêm`])} className="rounded-xl w-[20vw] text-white text-center bg-pink-400 h-[3vw]">Thêm đoạn văn tiếp theo </button></div>: <div className=" text-aButtonVw text-red-600 ">" Bạn đã thêm tới giới hạn tối đa là 5 đoạn"</div> }
     

      </div>
     <label  htmlFor="EventStatus">EventStatus</label> <select defaultValue={0} onChange={(e)=>setEventStatus(e.target.value)}  className="w-[20vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="EventStatus" id="EventStatus">
      <option value={0}>isComing</option>
      <option value={1}>isOpening</option>
      <option value={2}>isClosing</option>
     </select>
     
     <label  htmlFor="typeOfTicket">typeOfTicket</label> <select defaultValue={typeOfTicket} onChange={(e)=>setTypeOfTicket(e.target.value)}  className="w-[20vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="EventStatus" id="EventStatus">
      <option value={0}>Vào cổng tự do</option>
      <option value={1}>Vé đăng ký free</option>
      <option value={2}>Vé cần thanh toán</option>
     </select>
     <input disabled value={`${typeOfTicket==="0"?`Vào cổng tự do`:typeOfTicket==="1"?`Vé đăng ký free`:`Vé cần thanh toán`}`}  type="text" className={` ${typeOfTicket==="0"?`text-primaryYellow bg-violet-600`:typeOfTicket==="1"?` text-green-600 bg-gray-50`:`text-red-600 bg-yellow-200`} text-center    w-[15vw] block p-4   text-sm   rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
     <label htmlFor="default-toggle" className="relative inline-flex items-center mb-4 cursor-pointer">
  <input type="checkbox" value={IsShowArtist} onChange={(e)=>setIsShowArtist(!IsShowArtist)} id="default-toggle" className=""/>
  
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Có show Section nghệ sĩ hay không, mặc định là KHÔNG</span>
</label>
  <label htmlFor="Address">Đã chọn: </label><input id="Address" value={IsShowArtist?"CÓ show Section nghệ sĩ":"KHÔNG show Section nghệ sĩ"} disabled type="text" className={`${IsShowArtist?"text-green-500":" text-red-600"} block p-4 text-center  w-[20%] text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
<label htmlFor="Address">Địa chỉ tổ chức event </label><input id="Address" value={Address} onChange={(e)=>setAddress(e.target.value)} type="text" className="block p-4 pl-10 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  <label htmlFor="TicketLimitationAtOnce"> Có giới hạn mua vé là bao nhiêu ? </label><input id='TicketLimitationAtOnce' onChange={e=>setTicketLimitationAtOnce(e.target.value)} value={TicketLimitationAtOnce} type="number" min="0" max="20" pattern="[+]?[0-9]" name="TicketLimitationAtOnce" className="block p-4 pl-10 w-[10%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <label htmlFor=""> Các hạng vé:</label>
    <div className=" flex gap-2 h-auto p-10 flex-wrap  " >
       
        {
          ticket.map((item,i)=>{
            return(
              <div key={i} className=" flex flex-col gap-2 items-center justify-center p-4 h-fit rounded-[10px] w-[20vw] bg-slate-300 border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                 <div><label htmlFor="name"> tên vé </label> <input type="text" id='name' onChange={(e)=>handleOnchangeName(i, e.target.value,ticket)} value={item.name} name=""  /> </div>
                <div> <label htmlFor="cost"> giá vé</label> <input type="number" id='cost' onChange={(e)=>handleOnchangeCost(i,e.target.value,ticket)} min={0} value={item.cost} name="" /> </div>
                 
                 {
                  item.session.map((item,index)=>{
                    return(
                      <div key={index} className=" border-t-[1px] border-primaryBlack  pt-[0.5rem] pb-[0.5rem] h-auto flex flex-col gap-2 ">
                        khung giờ thứ {`${index+1}`}
                       <div className=" flex items-center gap-2">  <input type="number" onChange={(e)=>handleOnchangeHour(i,e.target.value,ticket,index)} min={0} max={23} value={item.time}  name="" id="" /> giờ 
                       <input type="number" onChange={(e)=>handleOnchangeMin(i,e.target.value,ticket,index)} min={0} max={59} value={item.min}  name="" id="" /> phút
                       </div> 
                      <div> <label htmlFor=""> Số lượng vé </label>  <input type="number" className=" w-[11vw] " onChange={(e)=>handleOnchangeMax(i,e.target.value,ticket,index)}  value={item.maxTicket} min={1}   /></div>
                        {index===0?"":<button className=" w-[12vw] h-[5vh] text-center text-white rounded-xl bg-red-500" onClick={()=>handleOnchangeDeleteHour(i,ticket,index)} > Xóa khung giờ thứ {`${index+1}`} </button>}
                      </div>
                    )
                  })
                 }
                 <button onClick={()=>handleOnchangeAddHour(i,ticket)} className="   hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 " > Thêm khung giờ </button>
                 {i===0?"":<button className=" w-[20vw] h-[5vh] text-center text-white rounded-xl bg-red-500" onClick={()=>handleOnchangeDeleteTicket(i,ticket)} > Xóa hạng vé {`${i+1}`} </button>}
              </div>
            )

          })
        }
         <button onClick={()=>handleOnchangeAddTicket(ticket)} className=" rounded-[10px] self-center bg-green-500 h-[10vh] text-white p-4 w-[10vw] " > Thêm hạng vé   </button>
    </div>
    <div className=" items-center w-[100%] flex flex-col "  >

    <button className=" self-center rounded-xl w-[20vw] bg-cyan-600 h-[3vw]"  onClick={()=>{
      setDateRange([{date:new Date()}])
      setisSingle(!isSingle)
      }} > Range or single  </button>
      {isSingle?<DateRange
       locale={vi}
       dateDisplayFormat={"dd-MM-yyyy-HH-m"}
      onChange={item=> {
        setRange([item.selection])
       
        setDateRange(parseDateLoop(ticket,item.selection.startDate,(item.selection.endDate - item.selection.startDate)/1000/60/60/24))  }}
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      ranges={range}
      months={1}
      direction={"horizontal"}
      className="calendarElement w-[22vw]  "
      minDate={new Date()}
      ></DateRange>
      :<Calendar
      locale={vi}
      className="calendarElement w-[22vw] "
      date={dateRange[0].date}
      onChange={e=>setDateRange([{date:e, tickets:ticket}]) }
      minDate={new Date()}
     
      ></Calendar>}
    </div>
    <div className=" flex  gap-2">

    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Event sẽ được hide sau khi tạo ? </span>
    <label htmlFor ="checked-toggle" className="relative inline-flex items-center mb-4 cursor-pointer">
      
    <input type="checkbox" value={isHidden} onChange={()=>{setisHidden(!isHidden)
    // console.log(isHidden)
    }} id="checked-toggle" class="sr-only peer" />
    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
   
    </label>
    </div>
      <button onClick={handleSubmit} className="w-[15vw] self-center rounded-xl bg-cyan-600 h-[3vw]  "> Submit </button>
      </div>:
      <div>

        
      </div>
      }

   
      
       </div>
   );
}

export default InputEvent;