import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            currentUser:false,
            isFetching:false,
            error: false
        },
        register:{
            isFetching:false,
            error:false,
            success: false,
        },
        modal:{
            isShowLoginMD:false,
            isShowRegisterMD: false
        },
        role:{
            isAdmin:false
        },
        logOut:{
            isFetching:false,
            error: false
        }
      
      
    },
    reducers:{
        loginStart: (state)=>{
            state.login.isFetching=true;
        },
        loginSuccess: (state,action)=>{
            state.login.isFetching=false;
            state.login.currentUser= action.payload;
            if(action.payload.role==="1"){
               state.role.isAdmin=true;
            }
            state.login.error=false;
            state.modal.isShowLoginMD=false
        },
        loginFailed: (state,action)=>{
            state.login.isFetching=false;
            state.login.error=action.payload
        },
        // register----------------
        registerStart: (state)=>{
            state.register.isFetching=true;
        },
        registerSuccess: (state)=>{
            state.register.isFetching=false;
            state.register.error=false;
            state.register.success=true;
            state.modal.isShowRegisterMD=false;
           
        },
        registerFailed: (state)=>{
            state.register.isFetching=false;
            state.register.error=true;
            state.register.success=false;
            state.register.isLoaded=true;
        },
        //--------------on/off Modal
        onModal:(state)=>{
                state.modal.isShowLoginMD=true
        },
        offModal:(state)=>{
            state.modal.isShowLoginMD=false
        },
        onResgisterMD:(state)=>{
            state.modal.isShowRegisterMD=true
        },
        offResgisterMD:(state)=>{
            state.modal.isShowRegisterMD=false
         
        },
        logOutStart: (state)=>{
            state.logOut.isFetching=true;
        },
        logOutSuccess: (state)=>{
            state.logOut.isFetching=false;
            state.login.currentUser= false;    
         
            state.logOut.error=false;
        },
        logOutFailed: (state)=>{
            state.logOut.isFetching=false;
            state.logOut.error=true;
        },
    }
})
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    onModal,offModal,
    onResgisterMD,
    offResgisterMD,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} = authSlice.actions
export default authSlice.reducer