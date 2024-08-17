import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate,useNavigate } from 'react-router-dom';
import Registration from '../Pages/Registiration';
import NotAuthenticated from '../Pages/NotAuthenticated';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  // Check localStorage for registration data
  const storedFormData = JSON.parse(localStorage.getItem('registrationData'));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Authentication Error: {error.message}</div>;
  }

  if (isAuthenticated) {
    if (storedFormData) {
      // If authenticated and registration data exists, proceed to the protected component
      return <Component {...rest} />;
    } else {
      // If authenticated but no registration data, redirect to the registration page
      navigate('/registration');
      return <Registration />;
    }
  } else {
    // If not authenticated, redirect to the home page
    return <NotAuthenticated />;
  }
};

export default ProtectedRoute;
