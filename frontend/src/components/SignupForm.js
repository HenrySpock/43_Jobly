import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const initialFormData = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '' 
};

function SignupForm({ signup }) { 
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      if (validateFormData()) {
        await signup(formData);
        setFormData(initialFormData);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const validateFormData = () => {
    const newErrors = {}; 
    if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long.';
    } 
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      return true; 
    } else {
      setErrors(newErrors);
      return false; 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="centered-content">
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      {errors.password && <p className="error-message">{errors.password}</p>}
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
