import { createSelector } from '@reduxjs/toolkit'
import { format, parseISO } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { useStore } from 'react-redux'

const allEvent = (state)=>state.event.events.allEvent
export const eventDetail = (state)=>state.event.event.oneEvent
export const eventPayment = (state)=>state.nav.eventCart
export const projectList = (state)=>state.project.Projects.allProjects
export const user = (state)=>state.auth.login.currentUser
const products = (state)=>state.products.Products.allProducts
export const  cate = (state)=>state.products.cate.allCate
export const getOneEvent = createSelector(
  [eventDetail],
  event=> event
)

export const getAllProducts = createSelector(products,
  product => product
  )
  export const getAllCate = createSelector(cate,
    cate => cate
    )
export const getEventPayment = createSelector(
  eventPayment,
 
  event => event
  // {
  //   if(!event){
  //     return console.log("no event")
  //   }
    
  //   return event
  // }
)
export const getAllProjects = createSelector(
  projectList,
  projects => projects
)
export const getCurrentUser = createSelector(
  user,
  user => user
)