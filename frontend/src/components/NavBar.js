import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ currentUser, logout }) {
  console.log(currentUser);
  return (
    <nav>
      <Link to="/">Jobly</Link>
      {!currentUser ? (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <div>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={logout}>Logout</Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
