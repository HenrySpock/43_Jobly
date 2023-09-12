import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("jobly_token"); 
    if (isAuthenticated) { 
        return React.cloneElement(element, rest);
    } else {
        return <Navigate to="/" replace />;
    }
};

export default Protected;
