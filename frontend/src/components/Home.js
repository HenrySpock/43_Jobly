import React from 'react'; 
 
  const HomePage = ({ currentUser }) => { 

  return (
    <div  className="centered-content">
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

