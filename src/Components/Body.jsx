import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { FE_DOMAIN_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import axios from "axios";

const Body=()=>{
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=useSelector(store=>store.user.loggedInUser)
        const fetchUser=async()=>{
            try{
            if(!userData)return ;
            const user=await axios.get(FE_DOMAIN_URL+"/profile/view",{withCredentials:true})
            dispatch(addUser(user.data));
        }
        catch(err){
        if(err.response?.status===401){
            navigate("/login")
        }
        console.log(err);
    }
}
    useEffect(()=>{

        fetchUser();
        
    },[])
   
    
    return(
        <>
             <Navbar/>
             <Outlet/>
             <Footer/>
        </>
    )
   

}

export default Body;