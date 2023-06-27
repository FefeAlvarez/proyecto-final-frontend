import { Link } from 'react-router-dom';
import ProductsListContainer from '../../components/ProductsListContainer/ProductsListContainer';
import Button from 'react-bootstrap/Button';
import NavBar from '../../components/NavBar/NavBar';

export const Home = () => {
  return (
    <div>
      <NavBar/>
      <h1>Catálago de productos</h1>
      <Link to={'/crear-producto'}>
        <Button variant='dark'>CREAR un producto</Button>
      </Link>
      <ProductsListContainer />
    </div>
  );
};
