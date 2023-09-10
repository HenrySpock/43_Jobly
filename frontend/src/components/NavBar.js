import React from 'react';
import { Link } from 'react-router-dom';

function UserInfo({ user }) {
  return <div>User Info: {user.username}</div>;
}

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
          <Link to="/logout" onClick={logout}>Logout</Link>
          <UserInfo user={currentUser} />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
