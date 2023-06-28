import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProductItem.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const ProductItem = ({ product }) => {
  const [deletedItem, setDeletedItem] = useState(false);
  const [show, setShow] = useState(false);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:8080/api/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 500) {
        return <div>DEBES SER ADMIN</div>;
      }
      if (response.status === 200) {
        setDeletedItem(true);
      }
      setShow(true);
    } catch (error) {
      console.log('error al borrar el producto: ', error);
    }
  };
  if (!product) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }
  return !deletedItem ? (
    <Card className='m-4' style={{ width: '18rem' }}>
      <Card.Img variant='top' src={`${product.image}`} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {product.price}
        </Card.Subtitle>
        <Card.Text>{product.category}</Card.Text>
        <Card.Text>{product.description}</Card.Text>

        <Button
          variant='outline-danger'
          onClick={() => deleteProduct(product._id)}
        >
          Eliminar
        </Button>
        <Link to={`/products/${product._id}`}>
          <Button variant='outline-secondary'>Editar</Button>
        </Link>
      </Card.Body>
    </Card>
  ) : (
    <Row>
      <Col xs={6}>
        <Toast
          bg='danger'
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>DELETE</strong>
          </Toast.Header>
          <Toast.Body>El producto se ha eliminado correctamente!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};
export default ProductItem;
