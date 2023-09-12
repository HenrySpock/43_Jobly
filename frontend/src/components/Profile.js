import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';
import './Profile.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dataToSend = { ...formData };  
    delete dataToSend.username;  
    
    try { 
      const returnedData = await JoblyApi.updateUser(currentUser.username, dataToSend);
      const updatedUser = returnedData.user;
      console.log("Returned user data after update:", updatedUser);

      if (!updatedUser.token && currentUser.token) {
        updatedUser.token = currentUser.token;
      }
      setCurrentUser(updatedUser);  
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrors(err);
    }
  }

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="centered-content">
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
