import { Button, Navbar, Container, Nav } from "react-bootstrap";
function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <header>
        <h1>welcome to my website</h1>
        <Button variant="success">click here</Button>
      </header>
    </>
  );
}
export default Header;
