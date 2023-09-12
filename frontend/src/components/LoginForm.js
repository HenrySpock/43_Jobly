import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';

const initialFormData = {
  username: '',
  password: ''
}; 

function LoginForm({ login }) {
  const [formData, setFormData] = useState(initialFormData);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setFormData(initialFormData);

      navigate('/'); 

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="centered-content login-form">
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
