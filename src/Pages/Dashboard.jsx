import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading, setError } from '../features/products/productsSlice';
import axiosInstance from '../api/axiosInstance';
import DataTable from '../Components/DataTable';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import UpdateProductModal from '../Components/UpdateProductModal';

function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // Notification state

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

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleAddProductClick = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveProduct = async (product, isEditing) => {
    try {
      if (isEditing) {
        const response = await axiosInstance.put(`/products/${editProduct.id}`, product);
        dispatch(setProducts(data.map((item) => (item.id === editProduct.id ? response.data : item))));
      } else {
        const response = await axiosInstance.post('/products', product);
        dispatch(setProducts([...data, response.data]));
      }
      setShowModal(false);
      setShowAlert(true); // Show notification
      setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
    } catch (error) {
      dispatch(setError(error.message));
    }
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
          {editProduct ? 'Product updated successfully!' : 'New product added successfully!'}
        </Alert>
      )}
      <DataTable data={data} columns={columns} loading={loading} onAddProductClick={handleAddProductClick} />

      <UpdateProductModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        onSaveProduct={handleSaveProduct}
        product={editProduct}
        isEditing={!!editProduct}
      />
    </div>
  );
}

export default Dashboard;
