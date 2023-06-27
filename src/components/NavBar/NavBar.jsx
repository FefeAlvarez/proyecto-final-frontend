import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function handleLogout() {
  axios
    .post('http://localhost:8080/api/users/logout')
    .then((response) => {
      const redirectUrl = response.data.redirectUrl;
      window.location.href = redirectUrl; 
    })
    .catch((error) => {
      console.error(error);      
    });
}

function NavBar() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/home'>Proyecto Final App</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/home'>Home</Nav.Link>
            <Button variant='warning' onClick={handleLogout}>
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
