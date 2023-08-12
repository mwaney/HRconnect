import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Log out");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">HrConnect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {location.pathname == "/login" && (
                <Nav.Link href="/">Sign up</Nav.Link>
              )}
              {!token && <Nav.Link href="/login">Log in</Nav.Link>}
              {token && <Nav.Link onClick={handleLogout}>Log out</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
