import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const AdminNav = () => {
    const navigate = useNavigate();
  return (
    <div>
    <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link >Dashboard</Nav.Link>
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">User List</NavDropdown.Item>
                <NavDropdown.Item href="#">Add User</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AdminNav