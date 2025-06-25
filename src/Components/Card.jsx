import axios from "axios";
import React from "react";
import { FE_DOMAIN_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const UserCard = ({ user }) => {
  const { _id, photoUrl, firstName, lastName, age, about, gender, skills } = user;
  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      await axios.post(`${FE_DOMAIN_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-200">
      <CardHeader className="flex flex-col items-center">
        <img
          src={photoUrl}
          alt="user"
          className="w-40 h-40 rounded-full object-cover shadow-md border mt-4"
        />
        <CardTitle className="mt-4 text-2xl font-semibold text-center text-gray-800">
          {firstName} {lastName}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="px-6 py-4 space-y-2 text-sm text-gray-700">
        {age && <p><strong>Age:</strong> {age}</p>}
        {gender && <p><strong>Gender:</strong> {gender}</p>}
        {about && (
          <p>
            <strong>About:</strong> {about}
          </p>
        )}
        {skills && (
          <div>
            <strong>Skills:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {(Array.isArray(skills) ? skills : skills.split(",")).map((skill, i) => (
                <span
                  key={i}
                  className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Button className="cursor-pointer"  variant="outline" onClick={() => handleFeed("ignored", _id)}>
            Ignore
          </Button>
          <Button  className="cursor-pointer" onClick={() => handleFeed("interested", _id)}>
            Interested
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
