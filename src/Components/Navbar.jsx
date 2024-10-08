import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function AppNavbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  
  // Retrieve the user's name from localStorage
  const userName = localStorage.getItem('registrationData') && JSON.parse(localStorage.getItem('registrationData')).name;

  return (
    <Navbar key={userName} expand="lg" style={{ backgroundColor: '#ffffff', padding: '10px 20px' }} className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" className="font-weight-bold" style={{ color: '#007bff', fontSize: '1.75rem' }}>
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {isAuthenticated ? (
            <>
              {userName && (
                <span style={{ marginRight: '15px', color: '#007bff', fontWeight: '500', alignSelf: 'center' }}>
                  Welcome, {userName}
                </span>
              )}
              <Button
                variant="outline-primary"
                className="px-4 py-2"
                style={{ borderRadius: '30px' }}
                onClick={() => {
                  localStorage.removeItem('registrationData');
                  logout({ returnTo: window.location.origin });
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              className="px-4 py-2"
              style={{ borderRadius: '30px' }}
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
