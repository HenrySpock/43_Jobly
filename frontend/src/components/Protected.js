import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("jobly_token"); 
    return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default Protected;
