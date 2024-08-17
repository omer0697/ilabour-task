import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import ProductDetails from './Pages/ProductDetails';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import Registration from './Pages/Registiration';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin, // Use window.location.origin for flexibility in environments
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/product-details/:id" element={<ProtectedRoute component={ProductDetails} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </div>
    </Auth0Provider>
  );
}

export default App;
