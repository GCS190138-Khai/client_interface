import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
    name: "event",
    initialState:{
  
      events:{
       
        allEvent:false,
        isFetching:false,
        error: false,
        isLoadingFinish:false
      },
      createEvent:{
        isFetching:false,
        error:false,
        success: false,
      },
      ticket:{
     
        isFetching:false,
        error: false,
        isLoadingFinish:false
      },
      event:{
        oneEvent:false,
        isFetching:false,
        error: false,
        isLoadingFinish:false
      }
     
      
    },
    reducers:{
      
      getEventStart:(state)=>{
        state.events.isFetching=true 
 
     },
     getEventSuccess:(state,action)=>{
      state.events.isFetching=false 
      state.events.allEvent=action.payload
      state.events.error=false
      state.events.isLoadingFinish=true
     },
     getEventFailed:(state)=>{
      state.events.isFetching=false 
      state.events.error=true     
 
     }, 
     createEventStart:(state)=>{
      state.createEvent.isFetching=true
  
     },
     createEventSuccess:(state)=>{
      state.createEvent.isFetching=false
      state.createEvent.error=false
      state.createEvent.success= true
     },
     createEventFailed:(state)=>{
      state.createEvent.isFetching=false
      state.createEvent.error=true
      state.createEvent.success= false
     },
     createTicketStart:(state)=>{
      state.ticket.isFetching=true 

   },
   createTicketSuccess:(state)=>{
    state.ticket.isFetching=false 
   
    state.ticket.error=false
    state.ticket.isLoadingFinish=true
   },
   createTicketFailed:(state)=>{
    state.ticket.isFetching=false 
    state.ticket.error=true     

   },
   getOneEventStart:(state)=>{
    state.event.isFetching=true 

 },
 getOneEventSuccess:(state,action)=>{
  state.event.isFetching=false 
  state.event.oneEvent=action.payload
  state.event.error=false
  state.event.isLoadingFinish=true
 },
 getOneEventFailed:(state)=>{
  state.event.isFetching=false 
  state.event.error=true     

 }, 
       
    }
})
export const {
  getEventStart,
  getEventSuccess,
  getEventFailed,
  createEventStart,
createEventSuccess,
createEventFailed,
createTicketStart,
createTicketSuccess,
createTicketFailed,
getOneEventStart,
getOneEventSuccess,
getOneEventFailed
} = eventSlice.actions
export default eventSlice.reducer