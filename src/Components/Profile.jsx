import React from 'react'
import { useSelector } from 'react-redux';
import EditProfile1 from './EditProfile1';

const Profile=()=> {
  const user=useSelector(store=>store.user.loggedInUser);
  return (
    <div>
       {user && <EditProfile1 loggedInUser={user}/>}
    </div>
  )
}

export default Profile
