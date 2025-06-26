import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const ConnectionCard = ({ user }) => {
  const { photoUrl, firstName, lastName, age, about, gender, skills, _id } = user;

  return (
    <Card className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl shadow-md mb-6">
      {/* Profile Image */}
      <img
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-primary"
        src={photoUrl}
        alt="user"
      />

      {/* Details */}
      <CardContent className="px-0 sm:px-2 w-full" >
        <h2 className="text-xl font-semibold mb-1">{firstName + " " + lastName}</h2>
        {age && <p className="text-sm text-muted-foreground">Age: {age}</p>}
        {gender && <p className="text-sm text-muted-foreground">Gender: {gender}</p>}
        {about && (
          <p className="text-sm mt-2 text-gray-800 dark:text-gray-800">
            <span className="font-semibold">About:</span> {about}
          </p>
        )}
        {skills && (
          <div className="mt-2 flex flex-wrap gap-2">
            {(Array.isArray(skills) ? skills : skills.split(/[ ,]+/)).map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded text-gray-700 dark:text-gray-200"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Chat Button */}
        <div className="mt-4 flex justify-end">
          <Link to={`/chat/${_id}`}>
            <Button className="text-sm px-4 py-2 bg-blue-500 text-white">Chat</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
