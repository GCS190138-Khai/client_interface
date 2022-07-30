import axios from "axios"

import jwt_decode from "jwt-decode"





  const refreshTonken=async()=>{
        try {
          const res = await axios.post(`http://localhost:8000/auth/refresh`,{
            withCredentials:true,
          })
      
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
          if(decodedToken.exp < date.getTime()/1000){
             const data = await refreshTonken();
             console.log("refresh")
             const refreshUser ={
               ...currentUser,
               accessToken: data.accessToken,
         
             }
             dispatch(stateSuccess(refreshUser))
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