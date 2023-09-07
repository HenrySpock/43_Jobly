import React from 'react';

function LogoutButton({ username, logout }) {
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <span>{username}</span>
    </div>
  );
}

export default LogoutButton;
