import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState:{
        users:{
            allUsers:false,
            isFetching:false,
            error: false,
            isLoadingFinish:false
        },
        msg:""
        
    },
    reducers:{
        getUsersStart:(state)=>{
            state.users.isFetching=true;

        },
        getUsersSuccess:(state,action)=>{
            state.users.isFetching =false;
            state.users.allUsers=action.payload;
            state.users.error=false;
            state.users.isLoadingFinish=true
        },
        getUsersFailed:(state)=>{
            state.users.isFetching =false;          
            state.users.error=true;
        },
        deleteUserStart:(state)=>{
            state.users.isFetching=true;
        },
        deleteUserSuccess:(state,action)=>{
            state.users.isFetching =false;
            state.users.error=false;
            state.users.isLoadingFinish=true;
            state.msg=action.payload
        },
        deleteUserFailed:(state,action)=>{
            state.users.isFetching =false;          
            state.users.error=true;
            state.msg=action.payload
        }

    }
})
export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
 
} = userSlice.actions
export default userSlice.reducer