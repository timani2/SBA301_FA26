import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../contexts/AuthContext";
import CarouselBanner from "./CarouselBanner";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, username, avatar, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <CarouselBanner />
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

            {!isLoggedIn && (
              <Nav className="ms-auto">
                <SearchBar
                  searchText={searchParams.get("q") || ""}
                  handleSearch={handleSearch}
                  className="d-flex"
                />
                <Link to="/login" className="nav-link ms-3">
                  Login
                </Link>
              </Nav>
            )}

            {isLoggedIn && (
              <Nav className="ms-auto d-flex align-items-center">
                <SearchBar
                  searchText={searchParams.get("q") || ""}
                  handleSearch={handleSearch}
                  className="d-flex me-3"
                />
                <img
                  src={avatar}
                  alt="Avatar"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
