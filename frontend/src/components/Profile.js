import React from 'react';
// import UserProfile from './UserProfile'; 

function UserProfile() {
  return <div>Profile Content</div>;
}

const Profile = () => {
  // Fetch user profile data from API and store in state

  return (
    <div>
      <h2>Profile</h2>
      <UserProfile />
    </div>
  );
};

export default Profile;
