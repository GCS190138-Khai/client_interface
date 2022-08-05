import axios from "axios";

import {loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess  } from "../redux/authSlice";
import { createEventFailed, createEventStart, createEventSuccess, createTicketFailed, createTicketStart, createTicketSuccess, getEventFailed, getEventStart, getEventSuccess, getOneEventFailed, getOneEventStart, getOneEventSuccess } from "../redux/eventSlice";
import { getCateFailed, getCateStart, getCateSuccess, getProductsFailed, getProductsStart, getProductsSuccess } from "../redux/productSlice";
import { getProjectFailed, getProjectStart, getProjectSuccess } from "../redux/projectSlice";
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from "../redux/userSlice";

const URL = 'https://phobendoi.art/api'

export const fetchProducts =async (dispatch)=>{ 
    dispatch(getProductsStart())
    try {
      const res =  await axios.get(`${URL}/products`)
        return dispatch(getProductsSuccess(res.data))
    } catch (error) {
        return dispatch(getProductsFailed())
    }
   
}
export const getOneProduct =async (id)=>{ 
    
    try {
      const res =  await axios.get(`${URL}/products/`+id)
        return res.data
    } catch (error) {
        return error
    }
   
}
export const createContact = async (data,navigate)=>{

    try {
      const res = await axios.post(`${URL}/contact`,data);

        return res

    } catch (error) {
        return console.log(error)
    }
}
export const getAllContactAdmin = async (data)=>{

    try {
   
      const res = await axios.post(`${URL}/contact/admincontact`,data);

        return res.data

    } catch (error) {
        return console.log(error)
    }
}

export const getLimitProduct =async (data)=>{ 
    
    try {
      const res =  await axios.post(`${URL}/products/limit`,data)
    
        return res.data.number
    } catch (error) {
        return error
    }
   
}
export const searchProducts = async(search,cateID)=>{
    try {
        const res =  await axios.get(`${URL}/products/search`,{
            params:{
                search:search,
                cateID:cateID
            }
        })
        return res.data
    } catch (error) {
        return  error
    }
}
export const  fetchGenres= async ()=> {
 return  await axios.get(`${URL}/genres/gen/`)}
 export const getAllGen = async (dispatch)=>{
    dispatch(getCateStart())
    try {
      const res =  await axios.get(`${URL}/genres/all`)
        return  dispatch(getCateSuccess(res.data))
    } catch (error) {
        return dispatch(getCateFailed())
    }
    
 }
export const loginUser = async (user, dispatch )=>{
    dispatch(loginStart)
    try {
        const res = await axios.post(`${URL}/auth/login`,user)
        dispatch(loginSuccess(res.data))
      
    } catch (error) {

        dispatch(loginFailed(error.response.data.message))
      
        return error.response.data.message
            
      
    }
}
export const registerUser = async(user,dispatch,role,currentUser,navi)=>{
    dispatch(registerStart())
    try {
     const res =   await axios.post(`${URL}/auth/register`,user);
        dispatch(registerSuccess());
        
        if(role==="admin"||role==="1"){

            getAllUsers(currentUser.accessToken,dispatch)
        }else{
            if(!res.data.message){

             return   navi("/account")
            }
            return res.data.message
        }

        return 
     
    } catch (error) {
        
        dispatch(registerFailed(error))
    }
}
export const getAllUsers = async(accessToken,dispatch,axiosJWT)=>{
    dispatch(getUsersStart())
  
    try {
        if(!axiosJWT){
            const res = await axios.get(`${URL}/user`,{
                headers:{
                    token:`Bearer ${accessToken}`
                }
            });
            dispatch(getUsersSuccess(res.data));
        }else{

            const res = await axiosJWT.get(`${URL}/user`,{
                headers:{
                    token:`Bearer ${accessToken}`
                }
            });
            dispatch(getUsersSuccess(res.data));
        }
        
    } catch (error) {
        dispatch(getUsersFailed())
    }
}

export const deleteUser = async(accessToken,dispatch,id,role,axiosJWT)=>{
        dispatch(deleteUserStart())
        
    try {
    
        const res = await axiosJWT.post(`${URL}/user/delete/`+id,role,{
            headers:{
                token:`Bearer ${accessToken}`
            }
        });
        getAllUsers(accessToken,dispatch)
        dispatch(deleteUserSuccess(res.data));
        
    } catch (error) {
        dispatch(deleteUserFailed(error.res.data))
    }
}
export const logOut = async(dispatch,id,navigate,accessToken,axiosJWT)=>{
    dispatch(logOutStart())
    try {
        await axiosJWT.post(`${URL}/auth/logout`,id,{
            headers:{token:`Bearer ${accessToken}`}
        })
        dispatch(logOutSuccess())
        navigate("/")
    } catch (error) {
        dispatch(logOutFailed())
    }
}
export const updateProduct = async(accessToken ,dispatch, id, role, axiosJWT) =>{

} 
export const getAllProject = async(dispatch,limit)=>{
    dispatch(getProjectStart())
    try {
   
        const res = await axios.get(`${URL}/project/`,{
            params: { limit: limit } 
        });
        dispatch(getProjectSuccess(res.data));
    } catch (error) {
        dispatch(getProjectFailed(error))
    }
}
 


///////Event
export const createEvent = async (dispatch,event,navigate)=>{
    dispatch( createEventStart() )
    try {
       await axios.post(`${URL}/event`,event);
        dispatch( createEventSuccess());
        navigate(-1)

    } catch (error) {
        dispatch(createEventFailed(error))
    }
}

 export const getAllEvent= async(dispatch)=>{
    dispatch( getEventStart() )
    try {
      
        const res = await axios.get(`${URL}/event/get-all-event`);
        dispatch(getEventSuccess(res.data));
    } catch (error) {
        dispatch(getEventFailed(error))
    }
}
export const getAllEventAdminBlock= async(dispatch)=>{
    dispatch( getEventStart() )
    try {
      
        const res = await axios.get(`${URL}/event/get-all-event-admin`);
        dispatch(getEventSuccess(res.data));
    } catch (error) {
        dispatch(getEventFailed(error))
    }
}

export const getAllEventAdmin= async(dispatch)=>{
    dispatch( getEventStart() )
    try {
      
        const res = await axios.get(`${URL}/event/get-all-admin`);
        dispatch(getEventSuccess(res.data));
    } catch (error) {
        dispatch(getEventFailed(error))
    }
}
export const getAllOpen= async()=>{
   
    try {
      
        const res = await axios.get(`${URL}/event/getAllOpen`);
        return res.data
    } catch (error) {
        return  console.log({error})
    }
}
export const getAllComing= async()=>{
   
    try {
      
        const res = await axios.get(`${URL}/event/getAllComing`);
        return res.data
    } catch (error) {
        return  console.log({error})
    }
}
export const getEventById= async(dispatch,id,user)=>{
    if(user){

        if(user.role==="1"|| user.role==="admin"){
            try {
      
                const res = await axios.get(`${URL}/event/get-one/`+id);
                return res.data
            } catch (error) {
                return console.log(error)
            }
        }
    }


    dispatch(getOneEventStart())
 
    try {
      
        const res = await axios.get(`${URL}/event/get-one/`+id);
        dispatch(getOneEventSuccess(res.data));
    } catch (error) {
        dispatch(getOneEventFailed(error))
    }
}
export const updateEvent= async(id,event,user)=>{
    if(user){

        if(user.role==="1"|| user.role==="admin"){
            try {
      
                const res = await axios.post(`${URL}/event/update/`+id,event);
                return res.statusText ==="OK" ? "success": "fasle"
            } catch (error) {
                return console.log(error)
            }
        }
    }


}
export const createTicket = async (dispatch,ticket)=>{
    dispatch(createTicketStart())
    try {
     const res =  await axios.post(`${URL}/event/create-ticket`,ticket);
        dispatch( createTicketSuccess());
   
        return res.data

    } catch (error) {
        dispatch(createTicketFailed(error))
    }
}
export const activeTikect = async (dispatch,ticket,id)=>{
 
    try {
      const res = await axios.post(`${URL}/event/active-ticket`,ticket);
     
    return res.data
    
    } catch (error) {
     return console.log(error)
    }
}
export const getEventByIdAdmin= async( id)=>{

    try {
      
        const res = await axios.get(`${URL}/event/get-one-admin/`+id);
          
            return res.data
    } catch (error) {
         return console.log(error)
    }
}
