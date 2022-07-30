import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: "projects",
    initialState:{
      Projects:{
        allProjects:false,
        isLoad:false,
        error: false,
        isLoadingFinish:false
    }
      
    },
    reducers:{
      getProjectStart:(state)=>{
       state.Projects.isLoad=true

    },
    getProjectSuccess:(state,action)=>{
        state.Projects.isLoad =false;
        state.Projects.allProjects=action.payload;
        state.Projects.error=false;
        state.Projects.isLoadingFinish=true
    },
    getProjectFailed:(state)=>{
        state.Projects.isLoad =false;          
        state.Projects.error=true;
    },
       
    }
})
export const {
  getProjectStart,
  getProjectSuccess,
  getProjectFailed
} = projectSlice.actions
export default projectSlice.reducer