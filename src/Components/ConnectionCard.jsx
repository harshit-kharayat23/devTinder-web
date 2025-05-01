import React from "react"
import { useSelector } from "react-redux"
const ConnectionCard=({user})=>{

    const {photoUrl,firstName,lastName,age,about,gender,skills}=user;
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
                </div>
            </div>
        </div>
    )
}
export default ConnectionCard;