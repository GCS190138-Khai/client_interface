import axios from "axios"

import jwt_decode from "jwt-decode"
import { loginSuccess } from "./redux/authSlice"





  const refreshTonken=async(currentUser)=>{
        try {
          const res = await axios.post(`https://api.phobendoi.art/api/auth/refresh`,currentUser)
      
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
export const createAxios = (currentUser,dispatch,stateSuccess) =>{
    
    const axiosJWT= axios.create()
    axiosJWT.interceptors.request.use(
    
        async(config)=>{
          
          let date = new Date()
          const decodedToken =jwt_decode(currentUser.accessToken)
      
          const check = decodedToken.exp*1000 < date.getTime()
          
          if(decodedToken.exp*1000 < date.getTime()){
          
             const data = await refreshTonken(currentUser);
            
             const refreshUser ={
               ...currentUser,
               accessToken: data.accessToken,
               refreshToken: data.refreshToken
             }
             dispatch(loginSuccess(refreshUser))
             config.headers["token"]= "Bearer"+data.accessToken;
          }
            
          return config
        },
        (error)=>{
           
          return Promise.reject(error)
        }
      )
      return axiosJWT
}
export const toVND = (data) =>{
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(data)
}