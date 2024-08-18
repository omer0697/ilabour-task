import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading, setError } from '../features/products/productsSlice';
import axiosInstance from '../api/axiosInstance';
import DataTable from '../Components/DataTable';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [editProduct, setEditProduct] = useState(null); // State for the product being edited
  const [showAlert, setShowAlert] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get('/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteClick = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      dispatch(setProducts(data.filter((product) => product.id !== id)));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleIdClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  const handleAddProductClick = () => {
    setNewProduct({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
    });
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setNewProduct(product);
    setEditProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!newProduct.title) errors.title = 'Title is required';
    if (!newProduct.price) errors.price = 'Price is required';
    if (!newProduct.description) errors.description = 'Description is required';
    if (!newProduct.category) errors.category = 'Category is required';
    if (!newProduct.image) errors.image = 'Image URL is required';
    return errors;
  };

  const handleSaveProduct = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      if (editProduct) {
        // Edit product
        const response = await axiosInstance.put(`/products/${editProduct.id}`, newProduct);
        dispatch(setProducts(data.map((product) => (product.id === editProduct.id ? response.data : product))));
      } else {
        // Add new product
        const response = await axiosInstance.post('/products', newProduct);
        dispatch(setProducts([...data, response.data]));
      }

      setShowModal(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    } catch (error) {
      dispatch(setError(error.message));
    }
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

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({ value }) => (
        <span
          className="text-primary"
          style={{ cursor: 'pointer' }}
          onClick={() => handleIdClick(value)}
        >
          {value}
        </span>
      ),
    },
    { Header: 'Name', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Price', accessor: 'price' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <>
          <FaPen
            style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
            onClick={() => handleEditClick(row.original)}
          />
          <FaTrash
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDeleteClick(row.original.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className='container'>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {editProduct ? 'Product edited successfully!' : 'New product added successfully!'}
        </Alert>
      )}

      <DataTable data={data} columns={columns} loading={loading} onAddProductClick={handleAddProductClick} />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {editProduct ? 'Update Product' : 'Save Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
