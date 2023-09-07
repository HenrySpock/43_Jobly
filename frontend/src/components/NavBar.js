import React from 'react';
import { Link } from 'react-router-dom';

function UserInfo({ user }) {
  return <div>User Info: {user.username}</div>;
}

function NavBar({ user, logout }) {
  return (
    <nav>
      <Link to="/">Jobly</Link>
      {!user ? (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <div>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
          <UserInfo user={user} />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
