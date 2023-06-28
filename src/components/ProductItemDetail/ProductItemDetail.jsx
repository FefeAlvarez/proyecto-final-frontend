import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Link } from 'react-router-dom';

const ProductItemDetail = ({ product }) => {
  const [formData, setFormData] = useState(product || {});
  const [show, setShow] = useState(false);
  const [toggleEdited, setToggleEdited] = useState(false);
  const editProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        const updatedProduct = response.data;

        setFormData({
          ...formData,
          title: updatedProduct.title,
          category: updatedProduct.category,
          description: updatedProduct.description,
          price: updatedProduct.price,
          image: updatedProduct.image
        });
      }
      setShow(true);
      setToggleEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(formData);
    const isFormComplete = values.every(
      (value) => value && value.trim() !== ''
    );

    if (isFormComplete) {
      editProduct(product._id);
    } else {
      console.log('Por favor complete todos los campos');
    }
  };

  if (!product) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }

  return toggleEdited === false ? (
    <div className='detail_container d-flex m-4 p-4'>
      <Form className='m-4' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicTitle'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={formData.title || ''}
            placeholder='Fender Telecaster'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCategory'>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type='text'
            name='category'
            value={formData.category || ''}
            placeholder='ej. bajos'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicDescription'>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as='textarea'
            name='description'
            value={formData.description || ''}
            placeholder='Describa el producto'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Precio USD</Form.Label>
          <Form.Control
            type='number'
            name='price'
            value={formData.price || ''}
            placeholder='100'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type='text'
            name='image'
            value={formData.image || ''}
            placeholder='http://imagen.com'
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit'>Actualizar</Button>
      </Form>
    </div>
  ) : (
    <Row>
      <Col>
        <Toast
          bg='success'
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
            <strong className='me-auto'>Edit</strong>
          </Toast.Header>
          <Toast.Body>Se ha editado el elemento correctamente!</Toast.Body>
        </Toast>
      </Col>
      <Link to={`/home`}>
        <Button variant='outline-secondary'>Volver</Button>
      </Link>
    </Row>
  );
};

export default ProductItemDetail;
