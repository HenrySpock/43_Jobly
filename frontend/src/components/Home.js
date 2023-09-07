import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';
import jwtDecode from 'jwt-decode';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      const token = localStorage.getItem("jobly_token");

      // If there's no token, exit early
      if (!token) return;

      // Set token to JoblyApi to use it for authenticated requests
      JoblyApi.token = token;

      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
 
        const user = await JoblyApi.getCurrentUser(decodedToken.username);
        console.log('Fetched user:', user);
    
        // Checking if the fetched user and its username exist
        if (user && user.user && user.user.username) {
            setCurrentUser(user.user);  // Note the change here
        }
    
      } catch (error) {
          console.error('Error fetching current user:', error);
          localStorage.removeItem("jobly_token");
      }

  }

    fetchCurrentUser();
  }, []);

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Welcome to Jobly, {currentUser.username}!</h1>
          {/* Render authenticated content */}
        </div>
      ) : (
        <div>
          <h1>Welcome to Jobly!</h1>
          {/* Render non-authenticated content */}
        </div>
      )}
    </div>
  );
};

export default HomePage;

