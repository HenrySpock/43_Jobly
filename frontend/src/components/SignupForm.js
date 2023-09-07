import React, { useState } from 'react';
import JoblyApi from '../JoblyApi';

const initialFormData = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '' 
};

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JoblyApi.registerUser(formData);
      console.log('Token after registration:', response.token);
      // Set token, set localStorage, redirect, etc, here 
      JoblyApi.token = response.token; 

      localStorage.setItem("jobly_token", response.token);
      setFormData(initialFormData);

    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  window.runtimeJoblyApi = JoblyApi; 

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
