import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Registration = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    militaryService: '',
    cv: null,
    additionalInfo: ''
  });

  useEffect(() => {
    // Check if the user is authenticated and has data in localStorage
    const storedFormData = JSON.parse(localStorage.getItem('registrationData'));
    if (isAuthenticated && storedFormData) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0]
    });
  };

  const handleCompleteRegistration = () => {
    // Save form data to localStorage
    localStorage.setItem('registrationData', JSON.stringify(formData));
    navigate('/');
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4 text-center">Registration</h1>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleCompleteRegistration();
      }}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Enter your surname"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formMilitaryService">
              <Form.Label>Military Service Status</Form.Label>
              <Form.Control
                as="select"
                name="militaryService"
                value={formData.militaryService}
                onChange={handleInputChange}
                required
              >
                <option value="">Select status</option>
                <option value="completed">Completed</option>
                <option value="exempt">Exempt</option>
                <option value="postponed">Postponed</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formCV" className="my-4">
          <Form.Label>Upload CV</Form.Label>
          <Form.Control
            type="file"
            name="cv"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAdditionalInfo">
          <Form.Label>Additional Questionnaire Information</Form.Label>
          <Form.Control
            as="textarea"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Enter any additional information"
            rows={4}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Complete Registration
        </Button>
      </Form>
    </Container>
  );
};

export default Registration;
