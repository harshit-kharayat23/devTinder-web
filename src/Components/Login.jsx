import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { FE_DOMAIN_URL } from '../../utils/constants';

const Login=()=>{

    const [emailId,setEmailId]=useState('harshitkharayat@gmail.com');
    const [password,setPassword]=useState('Harshit@2181');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const userInfo=useSelector((store)=>)
    const handleLogin=async()=>{

        try{
            const res=await axios.post(FE_DOMAIN_URL+"/login",{
                emailId,
                password
            },
            {
                withCredentials:true,
            },
         
        );
        dispatch(addUser(res.data))
        return navigate("/feed")
        
        }catch(err){ 
            console.error(err)
        }
        
    }
  return (
    <div className='flex justify-center items-center my-25'>
      <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <h1 className="card-title justify-center text-2xl font-bold">Sign In</h1>
                <div className=''>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend ">Email Id</legend>
                   
                    <input type="email" className="input" value={emailId}  onChange={(e)=>setEmailId(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Password {password}</legend>
                    <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Type here" />
                </fieldset>
            
             
                </div>
                <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Login
