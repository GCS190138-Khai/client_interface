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
import IndexAdmin from './admin';
import AllEventsAdmin from './admin/Event';
import EventAdminDetail from './admin/EventAdminDetail';
import ProductDetail from './component/Shop/productDetail';
import Categories from './component/Shop/category';
import Account from './component/account';
import Login from './component/account/loggin';
import Register from './component/account/resgister';
import AdminContact from './admin/Contact';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
  
    <Routes >
    <Route path=':productID' element={<ProductDetail></ProductDetail>}  ></Route>
      <Route path='/'  element = {<App/>}>
          <Route  index  element = { <Mainpage />}/>
          <Route  path='aboutus' element = { <AboutUs />}/>
          <Route path='work/' element={<Work></Work>}>
          <Route path='' element={<WorkTab></WorkTab>}/>
          <Route path=':id'  element = {<Project1/>} />
          </Route>
          <Route path='contact' element={<Contact/>}/>
          <Route path='account' element={<Account></Account>}>
            <Route index element={<Login></Login>}></Route>
            <Route path='register' element={<Register></Register>}></Route>
            
          </Route>
          <Route path='shop' element ={<Shop/>}>
            {/* <Route path='all' element={<AllProduct/>}  >
              <Route path=':productID' element={<ProductDetail></ProductDetail>}  ></Route>
            </Route>
            <Route path='new' element={<NewProduct/>}  >
            <Route path=':productID' element={<ProductDetail></ProductDetail>}  ></Route>
            </Route>
            <Route path='best' element={<BestProduct/>}  >
            <Route path=':productID' element={<ProductDetail></ProductDetail>}  ></Route>
            </Route>
            <Route path=':genresID' element={<CategorizedProdcut/>}></Route>
            <Route path=':productID' element={<ProductDetail></ProductDetail>}  ></Route>
             */}
              <Route index element={<Categories/>}></Route>
              <Route path=':genresID' element={<Categories/>}></Route>
              </Route>
              
         
          <Route path='event' element ={<Events/>}>
              
              <Route index element={<AllEvents></AllEvents>}></Route>
              <Route path='newEvent' element={<NewEvent></NewEvent>}></Route>
              <Route path='iscoming' element={<IsComingEvent></IsComingEvent>}></Route>
          </Route>
              <Route path='event/:eventID' element={<EventDetail></EventDetail>}  ></Route>

          <Route path='adminPhobendoi' element={<IndexAdmin></IndexAdmin>} >
                <Route path="EventAdmin" element={<AllEventsAdmin></AllEventsAdmin>} >
                </Route>
                <Route path="ContactAdmin" element={<AdminContact></AdminContact>} >
                </Route>
                <Route path=':eventID' element={<EventAdminDetail></EventAdminDetail>}  ></Route>
          </Route>
      </Route >

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
