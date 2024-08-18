import React from 'react';
import { Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const NotAuthenticated = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center bg-light" style={{ height: '100vh', backgroundImage: 'url(/path-to-background-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Row className="text-center">
        <Col>
          <Card className="shadow-lg p-5" style={{ maxWidth: '450px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
            <Card.Body>
              <Card.Title as="h1" className="mb-4" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#007bff' }}>
                Welcome to MyApp
              </Card.Title>
              <Card.Text className="mb-4" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                Please log in to access the application and start your journey with us.
              </Card.Text>
              <Button variant="primary" size="lg" onClick={() => loginWithRedirect()} style={{ padding: '10px 30px', fontSize: '1.2rem', borderRadius: '30px' }}>
                Log In
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotAuthenticated;
