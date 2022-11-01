import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/Home">Food Delivery</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/Home">Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header