import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlGetContent } from '../../services/urls';
import { useEffect, useState } from 'react';
import ProductItemDetail from '../ProductItemDetail/ProductItemDetail';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
    const getItem = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${urlGetContent}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const {
          data: { data }
        } = response;
        setProductDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [id]);
  return <ProductItemDetail product={productDetails} />;
};
export default ItemDetailContainer;
