import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EditProfileCard = ({ user }) => {
  const { photoUrl, firstName, lastName, age, about, gender, skills } = user;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border rounded-2xl p-4 bg-white">
      <CardHeader className="flex flex-col items-center">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
          <img
            src={photoUrl}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-2xl font-semibold mt-4 text-center text-gray-800">
          {firstName} {lastName}
        </CardTitle>
      </CardHeader>

      <Separator className="my-2" />

      <CardContent className="space-y-3 text-sm text-gray-700">
        {age && (
          <div>
            <span className="font-medium text-gray-900">Age:</span> {age}
          </div>
        )}
        {gender && (
          <div>
            <span className="font-medium text-gray-900">Gender:</span> {gender}
          </div>
        )}
        {about && (
          <div>
            <span className="font-medium text-gray-900">About:</span>
            <p className="text-gray-600 mt-1">{about}</p>
          </div>
        )}
        {skills && (
  <div>
    <span className="font-medium text-gray-900">Skills:</span>
    <div className="flex flex-wrap gap-2 mt-1">
      {(Array.isArray(skills) ? skills : skills.split(",")).map((skill, idx) => (
        <span
          key={idx}
          className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded"
        >
          {skill.trim()}
        </span>
      ))}
    </div>
  </div>
)}

      </CardContent>
    </Card>
  );
};

export default EditProfileCard;
