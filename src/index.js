import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store, persistor} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';
import AboutUs from './component/AboutUs/aboutUs'
import WorkTab from './component/Work/work';
import Contact from './component/Contact/contact'
import Shop from './component/Shop/shop';
import Mainpage from './component/MainPage/Mainpage';
import Events from './component/Events/Event'
import Project1 from './component/Projects/Docnhalang'
import Work from './component/Work';
import AllEvents from './component/Events/AllEvent';
import EventDetail from './component/Events/EventDetail';
import NewEvent from './component/Events/NewEvent';
import IsComingEvent from './component/Events/IsComingEvent';

import ProductDetail from './component/Shop/productDetail';
import Categories from './component/Shop/category';
import Account from './component/account';
import Login from './component/account/loggin';
import Register from './component/account/resgister';

import CheckOut from './component/Shop/check_out';
import CartFallBack from './component/Shop/cart_fall_back';
import Repass from './component/account/sercurity';
import ForgotPassword from './component/account/forgotpassword';
import { useWindowWidth } from '@react-hook/window-size';





ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
  
    <Routes >
    <Route path=':productID' element={<ProductDetail></ProductDetail>}  ></Route>
    <Route path='/project/:id'  element = {<Project1/>} />
      <Route path='/'  element = {<App/>}>
      <Route path='cart' element={<CartFallBack></CartFallBack>}  > </Route>
 
          <Route  index  element = { <Mainpage />}/>
          <Route  path='aboutus' element = { <AboutUs />}/>
          <Route path='work/' element={<Work></Work>}>
          <Route path='' element={<WorkTab></WorkTab>}/>
        
          </Route>
          <Route path='contact' element={<Contact/>}/>
          <Route path='account' element={<Account></Account>}>
            <Route index element={<Login></Login>}></Route>
            <Route path='register' element={<Register></Register>}></Route>
            
          </Route>
          <Route path='shop' element ={<Shop/>}>
       
              <Route index element={<Categories/>}></Route>
              <Route path=':genresID' element={<Categories/>}></Route>

             
              </Route>
            
         
          <Route path='event' element ={<Events/>}>
              
              <Route index element={<AllEvents></AllEvents>}></Route>
              <Route path='newEvent' element={<NewEvent></NewEvent>}></Route>
              <Route path='iscoming' element={<IsComingEvent></IsComingEvent>}></Route>
          </Route>
              <Route path='event/:eventID' element={<EventDetail></EventDetail>}  ></Route>

  
      </Route  >
      <Route path='check_out' element={<CheckOut></CheckOut>}  > </Route>
      <Route path='/re-password' element={<Repass></Repass>} >
      </Route>
    <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
         {/* {role? <Route path='/adminPBD' element ={<Admin/>}/>:""} */}
        </Routes>  

    </BrowserRouter>
      
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
