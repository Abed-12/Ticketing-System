import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, allowedRoles, element }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    if (!allowedRoles.includes(isAuthenticated.role)) {
        return <Navigate to="/dashboard" />; 
    }

    return element;
};

export default PrivateRoute;
