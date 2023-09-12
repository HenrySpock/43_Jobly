// import React, { useState } from 'react';
// import JoblyApi from '../JoblyApi';

// const initialFormData = {
//   username: '',
//   password: '',
//   email: '',
//   firstName: '',
//   lastName: '' 
// };

// // function SignupForm() {
// function SignupForm({ signup }) { 
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     email: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await JoblyApi.registerUser(formData);
//       // console.log('Token after registration:', response.token);
//       // // Set token, set localStorage, redirect, etc, here 
//       // JoblyApi.token = response.token; 

//       // localStorage.setItem("jobly_token", response.token);
//       // setFormData(initialFormData);
//       await signup(formData);
//       setFormData(initialFormData);

//     } catch (error) {
//       console.error('Error during registration:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   window.runtimeJoblyApi = JoblyApi; 

//   return (
//     <form onSubmit={handleSubmit} className="centered-content">
//       <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//       <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//       <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
//       <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

// export default SignupForm;






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
      // Validate form data before submitting
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

    // Validate each field and set error messages
    if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long.';
    }

    // Add other validation checks for other fields here

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      return true; // Form data is valid
    } else {
      setErrors(newErrors);
      return false; // Form data is invalid
    }
  };

  return (
    <form onSubmit={handleSubmit} className="centered-content">
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      {/* Display error message for password */}
      {errors.password && <p className="error-message">{errors.password}</p>}
      {/* Add other input fields and error messages as needed */}
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
