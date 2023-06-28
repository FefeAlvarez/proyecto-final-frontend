import { useNavigate } from 'react-router-dom';
import ProductsListContainer from '../../components/ProductsListContainer/ProductsListContainer';
import Button from 'react-bootstrap/Button';
import NavBar from '../../components/NavBar/NavBar';

export const Home = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/crear-producto'); 
  };

  return (
    <div>
      <NavBar />
      <h1>Catálogo de productos</h1>
  
      <Button variant='dark' onClick={handleCreateProduct}>
        CREAR un producto
      </Button>
      <ProductsListContainer />
    </div>
  );
};
