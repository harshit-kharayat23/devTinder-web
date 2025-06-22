import React from "react";
import { Link } from "react-router-dom";

const ConnectionCard = ({ user }) => {
  const { photoUrl, firstName, lastName, age, about, gender, skills,_id } = user;

  return (
    <div className="flex items-center bg-base-300 w-full max-w-lg mx-auto shadow-md rounded-2xl p-4 mb-6">
      <figure>
        <img
          className="rounded-full w-24 h-24 object-cover border-2 border-primary"
          src={photoUrl}
          alt="user"
        />
      </figure>
      <div className="ml-4 flex-1">
        <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
        {age && <p className="text-sm text-gray-400">Age: {age}</p>}
        {gender && <p className="text-sm text-gray-400">Gender: {gender}</p>}
        {about && (
          <p className="text-sm mt-2">
            <span className="font-semibold">About:</span> {about}
          </p>
        )}
        {skills && (
          <p className="text-sm mt-1">
            <span className="font-semibold">Skills:</span> {skills}
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <Link to={"/chat/"+_id }><button className="btn btn-primary px-4 py-1 text-sm">Chat</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
