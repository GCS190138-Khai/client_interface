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
      
      
    },
    reducers:{
        loginStart: (state)=>{
            state.login.isFetching=true;
        },
        loginSuccess: (state,action)=>{
            state.login.isFetching=false;
            state.login.currentUser= action.payload;
            if(action.payload.role[0]==="1"){
               state.role.isAdmin=true;
            }
            state.login.error=false;
            state.modal.isShowLoginMD=false
        },
        loginFailed: (state)=>{
            state.login.isFetching=false;
            state.login.error=true
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
            state.login.isFetching=true;
        },
        logOutSuccess: (state)=>{
            state.login.isFetching=false;
            state.login.currentUser= false;    
            state.role.isAdmin=false;    
            state.login.error=false;
        },
        logOutFailed: (state)=>{
            state.login.isFetching=false;
            state.login.error=true;
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