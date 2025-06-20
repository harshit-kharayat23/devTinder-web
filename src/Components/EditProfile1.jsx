import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { FE_DOMAIN_URL } from '../../utils/constants';
import { addUser } from '../../utils/userSlice';
import EditProfileCard from './EdilProfileCard';

const EditProfile1 = ({loggedInUser}) => {

    const dispatch=useDispatch();
    const [firstName,setfirstName]=useState(loggedInUser.firstName || '');
    const [lastName,setlastName]=useState(loggedInUser.lastName || '');
    const [photoUrl,setPhotoUrl]=useState(loggedInUser.photoUrl || '')
    const  [gender,setGender]=useState(loggedInUser.gender || '');
    const  [age,setAge]=useState(loggedInUser.age || '');
    const  [skills,setSkills]=useState(loggedInUser.skills || '' );
    const  [about,setAbout]=useState(loggedInUser.about || '');
    const [error,setError]=useState('')
    const [showToast,setShowToast]=useState(false)

        const handleEdit = async () => {
            try {
              const response = await axios.patch(
                FE_DOMAIN_URL + "/profile/edit",
                {
                  firstName,
                  lastName,
                  photoUrl,
                  gender,
                  age,
                  about,
                  skills,
                },
                { withCredentials: true }
              );
              console.log(response)
              dispatch(addUser(response?.data?.data?.loggedInUser));
              setShowToast(true);
            setTimeout(()=>{
                     setShowToast(false);
                 },3000)
            } catch (err) {
              setError(err?.response?.data || "Something went wrong");
              console.error(err);
            }
          };
          
    

  return (
    <>
         <div className='flex justify-center my-20'>
        <div className='flex justify-center gap-10'>
            <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <h1 className="card-title justify-center text-2xl font-bold">Edit Profile</h1>
                <div className=''>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend ">First Name</legend>
                   
                    <input type="text" className="input"  value={firstName} onChange={(e)=>setfirstName(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Last Name</legend>
                    <input type="text" className="input" value={lastName}  onChange={(e)=>setlastName(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Photo Url</legend>
                    <input  type="text" className="input" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Age</legend>
                    <input type="text" className="input" value={age}  onChange={(e)=>setAge(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Gender</legend>
                    <input type="text" className="input" value={gender}  onChange={(e)=>setGender(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">About</legend>
                    <input type="text" className="input" value={about}  onChange={(e)=>setAbout(e.target.value)} placeholder="Type here" />
                    <legend className="fieldset-legend ">Skills</legend>
                    <input type="text" className="input" value={skills}  onChange={(e)=>setSkills(e.target.value)} placeholder="Type here" />
                </fieldset>
            
             
                </div>
                <p className=' text-red-500'>{error}</p>
                <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={handleEdit} >Save Profile</button>
                </div>
            </div>
        </div>  

       <EditProfileCard  user={{firstName,lastName,age,gender,skills,photoUrl,about}}/> 
    
    </div>
</div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>    
            </div>}
    </>

  )
}

export default EditProfile1
