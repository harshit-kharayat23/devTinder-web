import React from "react"
import { useSelector } from "react-redux"
const Card=({user})=>{

    const {photoUrl,firstName,lastName,age,about,gender,skills}=user;
    return(
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                className="rounded-lg my-5"
                src={photoUrl}
                alt="user" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                {age && <p>Age: {age} </p>}
                {gender && <p>Gender: {gender} </p>}
                {about && <p>{about}</p>}
                {skills && <p>Skills: {skills}</p>}
                <div className="card-actions justify-center my-4">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Intersted</button>
                </div>
            </div>
        </div>
    )
}
export default Card;