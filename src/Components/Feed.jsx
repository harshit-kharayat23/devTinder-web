import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { FE_DOMAIN_URL } from "../../utils/constants";
import UserCard from "./Card";
import ShimmerUserCard from "./ShimmerUserCard"; // optional shimmer

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      if (feedData && feedData.length > 0) {
        setLoading(false);
        return;
      }
      const feed = await axios.get(FE_DOMAIN_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        {/* Spinner alternative */}
        {/* <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div> */}

        {/* Shimmer card alternative */}
        <ShimmerUserCard />
      </div>
    );
  }

  if (!feedData || feedData.length === 0) {
    return (
      <p className="text-center font-bold text-2xl mt-16">No Users Available</p>
    );
  }

  return (
    <div className="flex justify-center px-4 my-10">
      <UserCard user={feedData[0]} />
    </div>
  );
};

export default Feed;
