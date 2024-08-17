import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import ProductDetails from './Pages/ProductDetails';
import Registiration from './Pages/Registiration';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <Auth0Provider
      domain="dev-n6z78tt75zdsfjt7.us.auth0.com"
      clientId="pMp5njMxiKR3J8F8s1ir6aXGTHv9phpS"
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
            <Route path="/registration" element={<ProtectedRoute component={Registiration} />} />
          </Routes>
        </Router>
      </div>
    </Auth0Provider>
  );
}

export default App;
