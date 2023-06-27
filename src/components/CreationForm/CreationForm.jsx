import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/products',
        formData
      );
      if (response.status === 500) {
        return(<div>DEBES SER ADMIN</div>)
      }
      if (response.status === 200) {
        console.log('Producto creado exitosamente');
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className='mb-3'>
        <Col>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type='text'
              placeholder='ej. Fender Telecaster'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Form.Text className='text-muted'>
              Ingrese el nombre del producto
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='price'>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type='number'
              placeholder='1200'
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <Form.Text className='text-muted'>
              Ingrese el precio en dólares
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type='text'
              placeholder='ej. un producto Fender'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Form.Text className='text-muted'>
              Ingrese la descripcion del producto
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='category'>
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              aria-label='Default select example'
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value='Guitarras'>Guitarras</option>
              <option value='Bajos'>Bajos</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group className='mb-3' controlId='image'>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type='text'
              placeholder='http://imagen.com'
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Col>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Col>
    </Form>
  );
};

export default CreationForm;
