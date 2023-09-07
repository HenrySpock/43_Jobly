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

import JoblyApi from './JoblyApi';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (formData) => {
    try {
      const { token } = await JoblyApi.loginUser(formData);
      localStorage.setItem('token', token);
      setToken(token);
      const user = await JoblyApi.getCurrentUser(); 
      setCurrentUser(user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const signup = async (formData) => {
    try {
      const { token } = await JoblyApi.registerUser(formData);
      localStorage.setItem('token', token);
      setToken(token);
      const user = await JoblyApi.getCurrentUser();  
      setCurrentUser(user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const logout = () => {
    JoblyApi.logoutUser();  
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
  };

  {currentUser && (
    <div>
      <p>Welcome, {currentUser.username}!</p>
      {/* Render authenticated content */}
    </div>
  )}
  
  return (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/:handle" element={<CompanyDetails />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/jobs/:id" element={<JobDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
