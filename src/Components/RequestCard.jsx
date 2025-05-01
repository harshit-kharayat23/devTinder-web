import axios from 'axios';
import React, { useState } from 'react'
import { FE_DOMAIN_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../../utils/requestSlice';

const RequestCard = ({user}) => {
    const [showButtons,setShowButtons]=useState(true)
    const {photoUrl,firstName,lastName,age,about,gender,skills,_id}=user;
    const dispatch = useDispatch()
    const reviewRequest=async(status,_id)=>{

        try{
            const res=await axios.post(FE_DOMAIN_URL+"/request/review/"+status+"/"+user?._id,
                {},
                {withCredentials:true},
            )
            dispatch(removeRequest(_id));
            

        }
        catch(err){
            console.log(err.message);
        }
    }

    return(
        <div className=" flex bg-base-300  w-1/2 shadow-sm rounded-2xl">
            <figure>
            <img
                className="rounded-[50%] my-10  w-60 mx-3"
                src={photoUrl}
                alt="user" />
            </figure>
            <div className="card-body mx-2">
                <h2 className="card-title font-bold">{firstName+" "+lastName}</h2>
                {age && <p>Age: {age} </p>}
                {gender && <p>Gender: {gender} </p>}
                {about && <p><span className="font-bold">About : </span>{about}</p>}
                {skills && <p>Skills: {skills}</p>}
                <div className="card-actions justify-center my-4">
                {showButtons && <button className="btn btn-primary" onClick={()=>{reviewRequest("rejected",_id); setShowButtons(false)}}>Reject</button>}
               {showButtons && <button className="btn btn-secondary" onClick={()=>{reviewRequest("accepted",_id);setShowButtons(false)}}>Accept</button>}
                </div>
            </div>
        </div>
    )
}

export default RequestCard
