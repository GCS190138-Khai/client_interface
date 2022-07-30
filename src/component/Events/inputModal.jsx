import { useEffect } from "react";
import { useState } from "react";

function Sct1() {
const [Name, setName] = useState('')
const [Type, setType] = useState(['loai 1','loai 2'])

useEffect(() => {
  console.log(Name)
  console.log(Type)
  return () => {
    
  }
}, [Name,Type])

  return (
    <div className=" flex flex-col  pt-[20vh] w-[20vw] h-[30vh]">
        <input type="text" value={Name} onChange={(e)=>{setName(e.target.value)}} />
      { Type.map((item,i)=>{
        return(
          <div key={i}  className="">
            <input onChange={(e)=>{setType(e.target.value)}} type="text" value={item}  />
             <span  onClick={()=>{setType(Type.splice(i,1)) }} >delete</span>
          </div>
        )
      }) }
      <span onClick={()=>{setType(Type=>[...Type,'new type'])}} > add new type </span>
     


    </div>
   );
}

export default Sct1;