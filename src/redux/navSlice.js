import { createSlice } from '@reduxjs/toolkit'

const navSlice = createSlice({
    name: "nav",
    initialState:{
  
      color:{
        textColor:"text-primaryBlack",
        bgColor:"primary"
      },
      eventCart:{
        isOpen:false,
        eventDetail:false
      },
      static:false,
      cart:[],
      isOn:false,
      isBuySuccess:false
      
      
    },
    reducers:{
      
        primaryBGBlack:(state)=>{
          state.color.bgColor='primaryBlack';
          state.color.textColor='text-whiteText'
        },
        primaryBGYellow:(state)=>{
          state.color.bgColor='primaryYellow';
          state.color.textColor='text-primaryBlack'
        },
        primaryBG:(state)=>{
          state.color.bgColor='primary';
          state.color.textColor='text-primaryBlack'
       
        },
        onEventCart:(state,action)=>{
            state.eventCart.isOpen=true
            state.eventCart.eventDetail=action.payload
        },
        offEventCart:(state)=>{
          state.eventCart.isOpen=false
          state.eventCart.eventDetail=false
      } ,
      onStatic:(state)=>{
        state.static=true
      },
      offStatic:(state)=>{
        state.static=false
      },
      updateNumber:(state,action)=>{
        state.cart =action.payload
 
      },
      isOnNav:(state)=>{
        state.isOn = true
      },
      isOffNav:(state)=>{
        state.isOn = false
      },
      successBuy:(state)=>{
        state.isBuySuccess= true
      },
      successBuyFaild:(state)=>{
        state.isBuySuccess= false
      }
       
    }
})
export const {
  primaryBGBlack,
  primaryBGYellow,
  primaryBG,
  onEventCart,
offEventCart,
onStatic,
offStatic,
updateNumber,
isOnNav
      ,
isOffNav,
successBuy,
successBuyFaild
} = navSlice.actions
export default navSlice.reducer