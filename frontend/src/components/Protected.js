// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const Protected = ({ element, ...rest }) => {
//     const isAuthenticated = !!localStorage.getItem("jobly_token"); 
//     return isAuthenticated ? element : <Navigate to="/" replace />;
// };

// export default Protected;

// Step 9.
import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("jobly_token"); 
    if (isAuthenticated) {
        // Forward any additional props to the protected component
        return React.cloneElement(element, rest);
    } else {
        return <Navigate to="/" replace />;
    }
};

export default Protected;
