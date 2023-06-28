import React, { useState, useEffect } from 'react';
import { urlGetContent } from '../../services/urls';
import axios from 'axios';
import ProductList from '../ProductList/ProductList';
import "./ProductListContainer.css"

const ProductsContainer = () => {
  const [error, setError] = useState({
    error: false,
    errorCode: '',
    errorMsg: ''
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem('token'); 
        
        const response = await axios.get(urlGetContent, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        const { data } = response.data;
        if (response.status === 200) {
          setProducts(data);
        }
      } catch (error) {
        setError({
          error: true,
          errorCode: error.response.status,
          errorMessage: error.response.data
        });
      }
    };
    getProducts();
  }, []);

  return (
    <div className='list_container'>
      <ProductList products={products} error={error} />
    </div>
  );
};

export default ProductsContainer;
