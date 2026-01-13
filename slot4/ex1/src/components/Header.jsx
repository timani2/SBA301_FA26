import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSearch = (term) => {
    if (window.location.pathname !== "/") {
      navigate(`/?q=${term}`);
    } else {
      if (term) {
        setSearchParams({ q: term });
      } else {
        setSearchParams({});
      }
    }
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyWebsite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>

          <SearchBar
            searchText={searchParams.get("q") || ""}
            handleSearch={handleSearch}
            className="d-flex ms-auto"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
