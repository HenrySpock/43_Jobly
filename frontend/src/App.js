// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
// import Profile from './components/Profile';
// import Home from './components/Home';
 
// import CompaniesList from './components/CompaniesList'; 
// import CompanyDetails from './components/CompanyDetails';  
// import JobsList from './components/JobsList'; 
// import JobDetails from './components/JobDetails';    

// import Protected from './components/Protected';

// import JoblyApi from './JoblyApi';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [currentUser, setCurrentUser] = useState(null);
//   useEffect(() => {
//     console.log(`Current User: `, currentUser);
//   }, [currentUser]);
  
//   const login = async (formData) => {
//     try {
//       const { token } = await JoblyApi.loginUser(formData);
//       localStorage.setItem('token', token);
//       setToken(token);
//       const user = await JoblyApi.getCurrentUser(); 
//       setCurrentUser(user);
//       console.log(`Current User: `, currentUser);
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   const signup = async (formData) => {
//     try {
//       const { token } = await JoblyApi.registerUser(formData);
//       localStorage.setItem('token', token);
//       setToken(token);
//       const user = await JoblyApi.getCurrentUser();  
//       setCurrentUser(user);
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   const logout = () => {
//     JoblyApi.logoutUser();  
//     localStorage.removeItem('jobly_token');
//     setToken(null);
//     setCurrentUser(null);
//   };

//   {currentUser && (
//     <div>
//       <p>Welcome, {currentUser.username}!</p>
//       {/* Render authenticated content */}
//     </div>
//   )}
  
//   return (
//     <Router>
//       <div className="App">
//         <NavBar currentUser={currentUser} logout={logout} />
//         console.log("App.js rendered");
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginForm login={login} />} />
//           <Route path="/signup" element={<SignupForm signup={signup} />} />
//           <Route path="/profile" element={<Profile currentUser={currentUser} />} />

//           {/* <Route path="/companies" element={<CompaniesList />} />
//           <Route path="/companies/:handle" element={<CompanyDetails />} />
//           <Route path="/jobs" element={<JobsList />} />
//           <Route path="/jobs/:id" element={<JobDetails />} />  */}

//           <Route path="/companies" element={<Protected element={<CompaniesList />} />} />
//           <Route path="/companies/:handle" element={<Protected element={<CompanyDetails />} />} />
//           <Route path="/jobs/:id" element={<Protected element={<JobDetails />} />} />
//           <Route path="/jobs" element={<Protected element={<JobsList />} />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const initialFormData = {
    username: '',
    password: ''
  }; 

  useEffect(() => {
    async function fetchCurrentUser() {
      const token = localStorage.getItem("jobly_token");
  
      if (!token) return;  // If there's no token, exit early
  
      // Set token to JoblyApi to use it for authenticated requests
      JoblyApi.token = token;
  
      try {
        const decodedToken = jwtDecode(token);
        const user = await JoblyApi.getCurrentUser(decodedToken.username);
  
        // Checking if the fetched user and its username exist
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

  // const login = async (formData) => {
  //   try {
  //     // const { token } = await JoblyApi.loginUser(formData);
  //     // localStorage.setItem('token', token);
  //     // setToken(token);
  //     // const user = await JoblyApi.getCurrentUser(); 
  //     // setCurrentUser(user);
  //     // console.log(`Current User: `, currentUser);
  //     const response = await JoblyApi.loginUser(formData);
  //     console.log('Before login:', JoblyApi.token);
  //     JoblyApi.token = response.token; // Update the token property with the new token
  //     console.log('After login:', JoblyApi.token);

  //     localStorage.setItem("jobly_token", response.token);

  //     // Fetch the user details now that we have the token.
  //     const user = await JoblyApi.getCurrentUser(); 
  //     setCurrentUser(user);

  //     console.log("Logged in user details:", user);

  //     setFormData(initialFormData);
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };
 
  const login = async (formData) => {
  try {
    let response = await JoblyApi.loginUser(formData);

    if (response.token) {
      // Store the token (this is for authentication on future requests)
      console.log('Before login:', JoblyApi.token);
      JoblyApi.token = response.token; 
      localStorage.setItem("jobly_token", response.token);
      setToken(response.token);
      console.log('After login:', JoblyApi.token);

      // Decode the token to get the username
      const decodedToken = jwtDecode(response.token);
      const username = decodedToken.username;

      if (username) {
        // Fetch user details using the username
        const user = await JoblyApi.getCurrentUser(username);
        setCurrentUser(user.user);
      } else {
        // Handle the case where the username isn't found in the token
        console.error("Username not found in token");
      }
    }
  } catch (err) {
    console.error("Login failed:", err);
    // Handle the login failure (maybe update UI to show error)
  }
}


  // const signup = async (formData) => {
  //   try {
  //     const { token } = await JoblyApi.registerUser(formData);
  //     localStorage.setItem('token', token);
  //     setToken(token);
  //     const user = await JoblyApi.getCurrentUser();  
  //     setCurrentUser(user);
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };

  const signup = async (formData) => {
    try {
      const { token } = await JoblyApi.registerUser(formData);
      
      // Store the token for future requests and in local storage
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

  // {currentUser && (
  //   <div>
  //     <p>Welcome, {currentUser.username}!</p>
  //     {/* Render authenticated content */}
  //   </div>
  // )}

  return (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} logout={logout} />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home currentUser={currentUser} />} />

          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          {/* <Route path="/profile" element={<Profile currentUser={currentUser} />} /> */}
          <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />

          {/* <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/:handle" element={<CompanyDetails />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />  */}

          <Route path="/companies" element={<Protected element={<CompaniesList />} />} />
          <Route path="/companies/:handle" element={<Protected element={<CompanyDetails />} />} />
          <Route path="/jobs/:id" element={<Protected element={<JobDetails />} />} />
          <Route path="/jobs" element={<Protected element={<JobsList />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


