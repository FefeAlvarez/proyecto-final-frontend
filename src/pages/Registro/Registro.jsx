import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
console.log("esto manda ",name,email,password);


      const response = await axios.post('http://localhost:8080/api/users/register', {
        name,
        email,
        password
      });

      console.log(response.data); 


      setName('');
      setEmail('');
      setPassword('');

    
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error(error);
  
    }
  };

  return (
    <>
      <h1>Registro de usuario</h1>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Juan Pérez'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='jperez@mail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='123456789'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className='text-muted'>
                Debe incluir 6-20 caracteres
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit'>Registrarse</Button>
      </Form>
    </>
  );
};

export default Registro;
