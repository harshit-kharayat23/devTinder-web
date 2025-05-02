import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { FE_DOMAIN_URL } from '../../utils/constants';

const Login=()=>{

    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [emailId,setEmailId]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')
    const [isLoginForm,setLoginForm]=useState(true)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const handleSignUp=async()=>{
        try{
            const res=await axios.post(FE_DOMAIN_URL+"/signup",
                {firstName,lastName,emailId,password},
                {withCredentials:true}
            )
            console.log(res?.data?.data);
            dispatch(addUser(res?.data?.data));
            return navigate("/profile")
    
        }catch(err){
                setError(err?.response?.data)
                console.error(err?.response?.data)
            }
        
    }

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
            
            setError(err?.response?.data)
            console.error(err?.response?.data)
            
        }      
    }
  return (
    <div className='flex justify-center items-center my-25'>
      <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <h1 className="card-title justify-center text-2xl font-bold">{isLoginForm?"Log In":"Sign Up"}</h1>
                <div className=''>
                <fieldset className="fieldset">
                {!isLoginForm && <><legend className="fieldset-legend ">First Name</legend>
                
                <input type="text" className="input" value={firstName}  onChange={(e)=>setFirstName(e.target.value)} placeholder="Type here" />
                <legend className="fieldset-legend ">LastName</legend>

                <input type="text" className="input" value={lastName}  onChange={(e)=>setLastName(e.target.value)} placeholder="Type here" />
                </>
                }
                    <legend className="fieldset-legend ">Email Id</legend>
                   
                    <input type="email" className="input" value={emailId}  onChange={(e)=>setEmailId(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Password {password}</legend>
                    <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Type here" />
                </fieldset>
            
             
                </div>
                <p className=' text-red-500'>{error}</p>
                <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"Login":"Sign Up"}</button>
                </div>
                <p className=' cursor-pointer font-bold text-md text-center' onClick={()=>setLoginForm(value=>!value)}>{!isLoginForm?"Existing User ? Login Here":"New User? Sign Up here"}</p>
            </div>
        </div>  
    </div>
  )
}

export default Login
