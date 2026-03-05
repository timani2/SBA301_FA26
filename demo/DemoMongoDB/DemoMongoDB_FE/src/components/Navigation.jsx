import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg" className="mb-4" sticky="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Product Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/add">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
