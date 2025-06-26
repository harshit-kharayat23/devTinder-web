import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FE_DOMAIN_URL } from '../../utils/constants'
import { setUserConnections } from '../../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import ConnectionCard from './ConnectionCard'
import ShimmerConnectionCard from './ShimmerConnectionCard'

const Connections = () => {
  const connections = useSelector(store => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(FE_DOMAIN_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(setUserConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 items-center my-10">
        {[...Array(5)].map((_, i) => (
          <ShimmerConnectionCard key={i} />
        ))}
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <p className="text-center font-bold text-3xl my-10">
        No Connections Found!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center my-10">
      {connections.map((card) => (
        <ConnectionCard
          key={card?._id}
          user={{
            _id: card._id,
            firstName: card?.firstName,
            lastName: card?.lastName,
            age: card?.age,
            photoUrl: card?.photoUrl,
            skills: card?.skills,
            about: card?.about,
          }}
        />
      ))}
    </div>
  );
};

export default Connections;
