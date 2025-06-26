import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FE_DOMAIN_URL } from '../../utils/constants';
import { addUser } from '../../utils/userSlice';
import EditProfileCard from './EdilProfileCard';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { toast } from 'sonner';

const EditProfile1 = ({ loggedInUser }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(loggedInUser.firstName || '');
  const [lastName, setLastName] = useState(loggedInUser.lastName || '');
  const [photoUrl, setPhotoUrl] = useState(loggedInUser.photoUrl || '');
  const [gender, setGender] = useState(loggedInUser.gender || '');
  const [age, setAge] = useState(loggedInUser.age || '');
  const [skills, setSkills] = useState(loggedInUser.skills || '');
  const [about, setAbout] = useState(loggedInUser.about || '');
  const [error, setError] = useState('');

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        FE_DOMAIN_URL + '/profile/edit',
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
      dispatch(addUser(response?.data?.data?.loggedInUser));
      toast.success('Profile updated successfully!');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
      toast.error('Update failed.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 my-10">
      <div className="flex flex-col md:flex-row justify-center items-start gap-10">
        {/* Edit Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
          <div className="space-y-4">
            <div>
              <Label>First Name</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <Label>Photo URL</Label>
              <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            </div>
            <div>
              <Label>Age</Label>
              <Input value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <Label>Gender</Label>
              <Input value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
            <div>
              <Label>About</Label>
              <Input value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <div>
              <Label>Skills</Label>
              <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full mt-4" onClick={handleEdit}>
              Save Profile
            </Button>
          </div>
        </div>

        {/* Profile Card Preview */}
        <EditProfileCard
          user={{ firstName, lastName, age, gender, skills, photoUrl, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile1;
