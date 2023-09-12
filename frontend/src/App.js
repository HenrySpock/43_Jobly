import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import Home from './components/Home';
 
import CompaniesList from './components/CompaniesList'; 
import CompanyDetails from './components/CompanyDetails';  
import JobsList from './components/JobsList'; 
import JobDetails from './components/JobDetails';    

import Protected from './components/Protected';

import JoblyApi from './JoblyApi';

import jwtDecode from 'jwt-decode';

import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const initialFormData = {
    username: '',
    password: ''
  }; 
 
  const handleApplyToJob = async (jobId) => {
    try { 
      await JoblyApi.applyForJob(currentUser.username, jobId); 
      const updatedApplications = [...currentUser.applications, jobId];
      setCurrentUser(prevUser => ({ ...prevUser, applications: updatedApplications }));
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  useEffect(() => {
    async function fetchCurrentUser() {
      const token = localStorage.getItem("jobly_token");
  
      if (!token) return;  
      JoblyApi.token = token;
  
      try {
        const decodedToken = jwtDecode(token);
        const user = await JoblyApi.getCurrentUser(decodedToken.username);
 
        if (user && user.user && user.user.username) {
          setCurrentUser(user.user); 
        } else {
          console.error('Invalid user data returned from API:', JSON.stringify(user, null, 2));
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        console.error('Error message:', error.message);
        console.error('Full error object:', error);
        localStorage.removeItem("jobly_token");
      }
    }
  
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    console.log(`Current User: `, currentUser);
  }, [currentUser]);
  
  const login = async (formData) => {
  try {
    let response = await JoblyApi.loginUser(formData);

    if (response.token) { 
      console.log('Before login:', JoblyApi.token);
      JoblyApi.token = response.token; 
      localStorage.setItem("jobly_token", response.token);
      setToken(response.token);
      console.log('After login:', JoblyApi.token);
 
      const decodedToken = jwtDecode(response.token);
      const username = decodedToken.username;

      if (username) { 
        const user = await JoblyApi.getCurrentUser(username);
        setCurrentUser(user.user);
      } else { 
        console.error("Username not found in token");
      }
    }
  } catch (err) {
    console.error("Login failed:", err); 
  }
}

  const signup = async (formData) => {
    try {
      const { token } = await JoblyApi.registerUser(formData);
       
      JoblyApi.token = token;
      localStorage.setItem("jobly_token", token);
      setToken(token);

      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
  
      if (username) {
        const user = await JoblyApi.getCurrentUser(username);
        setCurrentUser(user.user);
      } else {
        console.error("Username not found in token");
      }
  
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
  const logout = () => {
    JoblyApi.logoutUser();  
    localStorage.removeItem('jobly_token');
    setToken(null);
    setCurrentUser(null);
  }; 

  return (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} logout={logout} />
        <Routes> 
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} /> 
          <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/companies" element={<Protected element={<CompaniesList />} />} />
          <Route path="/jobs" element={<Protected element={<JobsList />} />} />
          <Route path="/companies/:handle" element={<Protected element={<CompanyDetails user={currentUser} applyToJobFunction={handleApplyToJob} />} />} />
          <Route path="/jobs/:id" element={<Protected element={<JobDetails user={currentUser} applyToJobFunction={handleApplyToJob}/>} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


