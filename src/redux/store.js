import { configureStore,combineReducers} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersRudcer from './userSlice'
import navSlice from './navSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import projectSlice from './projectSlice'
import eventSlice from './eventSlice'
import productSlice from './productSlice'
const persistConfig ={
    key:'root',
    version:1,
    storage
}
const rootReducer= combineReducers({
    auth:authReducer,
    users: usersRudcer,
    nav: navSlice,
    project: projectSlice,
    event:eventSlice ,
    products: productSlice

})
const persistedReducer= persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck:{
              ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
          },
      }),
  })
  export let persistor = persistStore(store)