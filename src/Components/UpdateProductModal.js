import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

function UpdateProductModal({ showModal, handleModalClose, onSaveProduct, product, isEditing }) {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showSuccess, setShowSuccess] = useState(false); // Success state

  useEffect(() => {
    if (isEditing && product) {
      setNewProduct(product);
    } else {
      setNewProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      });
    }
  }, [isEditing, product]);

  const validateForm = () => {
    const errors = {};
    if (!newProduct.title) errors.title = 'Title is required';
    if (!newProduct.price) errors.price = 'Price is required';
    if (!newProduct.description) errors.description = 'Description is required';
    if (!newProduct.category) errors.category = 'Category is required';
    if (!newProduct.image) errors.image = 'Image URL is required';
    return errors;
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: '',
    });
  };

  const handleSaveProduct = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true); // Start loading
    try {
      await onSaveProduct(newProduct, isEditing);
      setShowSuccess(true); // Show success message
      setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
      handleModalClose(); // Close modal after successful save/update
    } catch (error) {
      console.error("Failed to save the product:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success">
            {isEditing ? 'Product updated successfully!' : 'New product added successfully!'}
          </Alert>
        )}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              placeholder="Enter product title"
              className={validationErrors.title && "is-invalid"}
            />
            {validationErrors.title && <div className="invalid-feedback">{validationErrors.title}</div>}
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              className={validationErrors.price && "is-invalid"}
            />
            {validationErrors.price && <div className="invalid-feedback">{validationErrors.price}</div>}
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className={validationErrors.description && "is-invalid"}
            />
            {validationErrors.description && <div className="invalid-feedback">{validationErrors.description}</div>}
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
              className={validationErrors.category && "is-invalid"}
            />
            {validationErrors.category && <div className="invalid-feedback">{validationErrors.category}</div>}
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="Enter product image URL"
              className={validationErrors.image && "is-invalid"}
            />
            {validationErrors.image && <div className="invalid-feedback">{validationErrors.image}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose} disabled={isLoading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveProduct} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              {isEditing ? ' Updating...' : ' Saving...'}
            </>
          ) : (
            isEditing ? 'Update Product' : 'Save Product'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateProductModal;
