import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Card, Spinner, Container, Row, Col } from 'react-bootstrap';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="alert alert-danger mt-4">
              {error}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Row noGutters>
              <Col md={4}>
                <Card.Img variant="top" src={product.image} alt={product.title} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${product.price}
                  </Card.Text>
                  <Card.Text>
                    <strong>Category:</strong> {product.category}
                  </Card.Text>
                  <Card.Text>
                    <strong>Description:</strong> {product.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Rating:</strong> {product.rating.rate} / 5 ({product.rating.count} reviews)
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
