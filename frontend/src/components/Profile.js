// import React from 'react';
// // import UserProfile from './UserProfile'; 

// function UserProfile() {
//   return <div>Profile Content</div>;
// }

// const Profile = () => {
//   // Fetch user profile data from API and store in state

//   return (
//     <div>
//       <h2>Profile</h2>
//       <UserProfile />
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';

function Profile({ currentUser, setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || ''
  });
  
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setFormData({
      username: currentUser.username || '',
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || ''
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedUser = await JoblyApi.updateUser(currentUser.username, formData);
  //     setCurrentUser(updatedUser);  // Update the current user in the parent state
  //   } catch (err) {
  //     console.error("Error updating profile:", err);
  //     setErrors(err);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dataToSend = { ...formData };  
    delete dataToSend.username;  
    
    try {
      // const updatedUser = await JoblyApi.updateUser(currentUser.username, dataToSend);
      const returnedData = await JoblyApi.updateUser(currentUser.username, dataToSend);
      const updatedUser = returnedData.user;
      console.log("Returned user data after update:", updatedUser);

      if (!updatedUser.token && currentUser.token) {
        updatedUser.token = currentUser.token;
      }
      setCurrentUser(updatedUser);  // Update the current user in the parent state
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrors(err);
    }
  }

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input value={formData.username} disabled />
        </div>

        <div>
          <label>First Name:</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div>
          <label>Last Name:</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
