import { useState } from "react";
import { useEffect } from "react";
import { getAllContactAdmin } from "../api";

function AdminContact() {


const [isLoading, setLoading] = useState(true)
const [contacts, setcontacts] = useState(false)

  useEffect(()=>{
  
    if(isLoading){
      
      (async () => {
  
        const res = await  getAllContactAdmin()
        setcontacts(res)
        return setLoading(false)
         
       
      })();
  
     
     } 
     console.log({contacts})
  },[])
  if(isLoading){
    return ( <div className="di">
      ....Loadig
  </div> );
  }else{

  return ( <div className="di">

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 w-[20%] px-6">
                    Information
                </th>
                <th scope="col" class="py-3 w-[75%] px-6">
                    Message
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className=" ">
          {
              contacts.map((item,i)=>{
                return (
                  <tr key={item.name+item.address+item.position+i} class="bg-white  border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="w-[20%] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <div>name:{item.name}</div>
                   <div>address:{item.address}</div>
                   <div>position:{item.position}</div>
                   <div>company:{item.company}</div>
                </th>
                <td class="py-4 w-[75%] px-6">
                    <p>{item.message}</p>
                </td>
                <td class="py-4 px-6">
                   <button className={!item.isHandle?" hover:text-red-600":"hover:text-green-600"} > {!item.isHandle?"Not Yet !":"Taked"}</button>
                </td>
              
            </tr>
                )
              })
          }
            
         
        </tbody>
    </table>
</div>
    
  </div> );
  }
}

export default AdminContact;