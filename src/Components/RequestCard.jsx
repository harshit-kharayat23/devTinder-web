import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeRequest } from "../../utils/requestSlice";
import { FE_DOMAIN_URL } from "../../utils/constants";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const RequestCard = ({ user }) => {
  const [showButtons, setShowButtons] = useState(true);
  const { photoUrl, firstName, lastName, age, about, gender, skills, _id } = user;
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        FE_DOMAIN_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl shadow-md mb-6">
      {/* Image */}
      <img
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-primary"
        src={photoUrl}
        alt="user"
      />

      {/* Content */}
      <CardContent className="px-0 sm:px-2 w-full">
        <h2 className="text-xl font-semibold mb-1">
          {firstName} {lastName}
        </h2>
        {age && <p className="text-sm text-muted-foreground">Age: {age}</p>}
        {gender && <p className="text-sm text-muted-foreground">Gender: {gender}</p>}
        {about && (
          <p className="text-sm mt-2 text-gray-800 dark:text-gray-600">
            <span className="font-semibold">About:</span> {about}
          </p>
        )}
        {skills && (
          <div className="mt-2 flex flex-wrap gap-2">
            {(Array.isArray(skills) ? skills : skills.split(" ")).map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded text-gray-700 dark:text-gray-200"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        {showButtons && (
          <div className="mt-4 flex gap-4">
            <Button className="text-sm px-4 py-2 bg-blue-500 text-white"
              variant="destructive"
              onClick={() => {
                reviewRequest("rejected", _id);
                setShowButtons(false);
              }}
            >
              Reject
            </Button>
            <Button className="cursor-pointer bg-pink-500 text-white"
              onClick={() => {
                reviewRequest("accepted", _id);
                setShowButtons(false);
              }}
            >
              Accept
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestCard;
