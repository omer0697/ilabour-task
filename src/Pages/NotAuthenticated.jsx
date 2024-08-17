import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const NotAuthenticated = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="text-center">
        <Col>
          <Card className="shadow-sm p-4" style={{ maxWidth: '400px' }}>
            <Card.Body>
              <Card.Title as="h1" className="mb-4">Welcome to MyApp</Card.Title>
              <Card.Text className="mb-4">
                Please log in to access the application.
              </Card.Text>
              <Button variant="primary" size="lg" onClick={() => loginWithRedirect()}>
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
