import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getAllProject } from "../../api";
import { primaryBG } from "../../redux/navSlice";

function Index() {
  const dispatch = useDispatch()

  useEffect(()=>{

    window.scrollTo({  top: 0})
  
 },[])
  useLayoutEffect(()=>{
    dispatch(primaryBG())
    let abortController = new AbortController();  
    getAllProject(dispatch,15)
   
    return () => {
      abortController.abort()
    };
  },[])
  return (
   <Outlet></Outlet>
    );
}

export default Index;