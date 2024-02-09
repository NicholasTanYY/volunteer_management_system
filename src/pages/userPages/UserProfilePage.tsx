import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import Select from 'react-select';
import { UserProfile } from '../../utilities/UserProfileInterface';
import AllSkillSets from '../../utilities/AllSkillSets';
import AllInterestAreas from '../../utilities/AllInterestAreas';
import ProfilePicComponent from '../../components/ProfilePicComponent';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAppSelector } from '../../redux/hooks';
import { redirect } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  // const navigate = useNavigate();
  const username = useAppSelector(state => state.username.value);
  const [isDone, setIsDone] = useState(false);
  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    username: username,
    fullName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    availability: '',
    occupation: '',
    school: '',
    interests: [],
    skills: [],
  });

  const fetchData = async () => {
    setIsDone(false);
    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/data`, {username});
    let {fullName, gender, dateOfBirth, email, phoneNumber, availability, occupation, school, interests, skills} = response.data;
    if (interests == null) {
      interests = []
    } else {
      interests = interests.map((label:string) => AllInterestAreas.find(item => item.label === label));
    }
    if (skills == null) {
      skills = []
    } else {
      skills = skills.map((label:string) => AllSkillSets.find(item => item.label === label));
    }
    setProfileInfo({username, fullName, gender, dateOfBirth, email, phoneNumber, availability, occupation, school, interests, skills});
    setIsDone(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInterestsChange = (selectedOption: any) => {
    setProfileInfo({ ...profileInfo, interests: selectedOption });
  }

  const handleSkillChange = (selectedOption: any) => {
    setProfileInfo({ ...profileInfo, skills: selectedOption });
  }

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [event.target.name]: event.target.value });
  }

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    profileInfo.interests = profileInfo.interests.map((interest : any) => interest.label);
    profileInfo.skills = profileInfo.skills.map((skill : any) => skill.label);
    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/updateProfile`, profileInfo);
    console.log(JSON.stringify(response.data));
    fetchData();
  }

  return (
    !isDone
      ? <div></div>
      :
      <div>
      <UserNavigationbar />
      <h2>My Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <div className="d-flex justify-content-evenly">
          <ProfilePicComponent />
          <div className="d-flex flex-column justify-content-center w-25 shadow rounded p-4">
            <h5>Personal Particulars</h5>
            <label>
              Full Name (as of NRIC)
              <input type="text" className="form-control" name="fullName" value={profileInfo.fullName} onChange={handleProfileChange} />
            </label>
            <label>
              Gender
              <input type="text" className="form-control" name="gender" value={profileInfo.gender} onChange={handleProfileChange} />
            </label>
            <label>
              Date of Birth
              <input type="text" className="form-control" name="dateOfBirth" value={profileInfo.dateOfBirth} onChange={handleProfileChange} />
            </label>
            <label>
              Email
              <input type="text" className="form-control" name="email" value={profileInfo.email} onChange={handleProfileChange} />
            </label>
            <label>
              Phone Number
              <input type="text" className="form-control" name="phoneNumber" value={profileInfo.phoneNumber} onChange={handleProfileChange} />
            </label>
            <label>
              Availability
              <input type="text" className="form-control" name="availability" value={profileInfo.availability} onChange={handleProfileChange} />
            </label>
            <label>
              Occupation
              <input type="text" className="form-control" name="occupation" value={profileInfo.occupation} onChange={handleProfileChange} />
            </label>
            <label>
              School (if any)
              <input type="text" className="form-control" name="school" value={profileInfo.school} onChange={handleProfileChange} />
            </label>
          </div>
          <div className="w-25 d-flex flex-column justify-content-evenly align-items-center">
            <div className="shadow rounded d-flex justify-content-center w-100 h-25 p-4">
              <label className="w-100">
                <h5>Interests</h5>
                <Select
                  value={profileInfo.interests}
                  onChange={handleInterestsChange}
                  options={AllInterestAreas}
                  isMulti={true} // Allow multiple selections
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </label>
            </div>
            <div className="shadow rounded d-flex justify-content-center w-100 h-25 p-4">
              <label className="w-100">
                <h5>Skills</h5>
                <Select
                  value={profileInfo.skills}
                  onChange={handleSkillChange}
                  options={AllSkillSets}
                  isMulti={true} // Allow multiple selections
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-end mb-4">
          <Button className="w-25 btn-dark" type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfilePage;
