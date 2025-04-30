import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FE_DOMAIN_URL } from '../../utils/constants'
import axios from 'axios'
import { removeUser } from '../../utils/userSlice'

const  Navbar=()=> {

  const user=useSelector((store=>store.user.loggedInUser))
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogOut=async()=>{
    try{
      const logOut=await axios.post(FE_DOMAIN_URL+"/logout",{withCredentials:true})
      dispatch(removeUser())
      navigate('/login')

    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻 devTinder</Link>
  </div>
  {user && <p className='font-bold'>Welcome! {user.firstName}</p>}
  <div className="flex gap-2">
    <div className="dropdown dropdown-end mx-6">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {user && <div className="w-10 rounded-full ">
       
          <img
            alt="photo"
            src={user.photoUrl} />
        </div>}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar
