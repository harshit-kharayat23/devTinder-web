import axios from "axios";
import React from "react"
import { FE_DOMAIN_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";
const Card=({user})=>{

    const {_id,photoUrl,firstName,lastName,age,about,gender,skills}=user;
    const dispatch=useDispatch();
    const handleFeed=async(status,userId)=>{
        try{
            const res=await axios.post(
                FE_DOMAIN_URL+"/request/send/"+status+"/"+userId
                ,{}
                ,{withCredentials:true}
            );  
            dispatch(removeUserFromFeed(userId))

        }catch(err){
                console.log(err.message)
        }
    }

    return(
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                className="rounded-lg my-5 "
                src={photoUrl}
                alt="user" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold">{firstName+" "+lastName}</h2>
                {age && <p>Age: {age} </p>}
                {gender && <p>Gender: {gender} </p>}
                {about && <p><span className="font-bold">About : </span>{about}</p>}
                {skills && <p>Skills: {skills}</p>}
                <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={()=>{handleFeed("ignored",_id)}}>Ignore</button>
                <button className="btn btn-secondary " onClick={()=>{handleFeed("interested",_id)}}>Interested</button>
                </div>
            </div>
        </div>
    )
}
export default Card;