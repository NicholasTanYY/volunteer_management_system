import React, { useState, ChangeEvent, FormEvent } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import { UserProfile } from '../../utilities/UserProfileInterface';
import AllSkillSets from '../../utilities/AllSkillSets';
import AllInterestAreas from '../../utilities/AllInterestAreas';
import ProfilePicComponent from '../../components/ProfilePicComponent';

const UserProfilePage: React.FC = () => {

  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    fullName: '',
    gender: null,
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    availability: '',
    occupation: '',
    school: '',
    interests: null,
    skills: null,
  });

  const handleInterestsChange = (selectedOption: any) => {
    setProfileInfo({ ...profileInfo, interests: selectedOption });
  }

  const handleSkillChange = (selectedOption: any) => {
    setProfileInfo({ ...profileInfo, skills: selectedOption });
  }

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [event.target.name]: event.target.value });
  }

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(profileInfo); //TODO: database logic here
  }

  return (
    <div>
      <UserNavigationbar />
      <h2>My Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <div className="d-flex justify-content-evenly">
          <ProfilePicComponent />
          <div className="w-50 border">
            <label>
              Full Name (as of NRIC)
              <input type="text" className="form-control" name="fullName" value={profileInfo.fullName} onChange={handleProfileChange} />
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
          <div className="w-50 d-flex flex-column justify-content-evenly">
            <div className="border w-50 d-flex justify-content-center">
              <label>
                Interests
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
            <div className="border w-50 d-flex justify-content-center">
              <label>
                Skills
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserProfilePage;
