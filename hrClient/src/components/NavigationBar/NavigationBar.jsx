import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";

function NavigationBar() {
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
              <Nav.Link href="/">Sign up</Nav.Link>
              <Nav.Link href="/login">Log in</Nav.Link>
              <Nav.Link href="#home">Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
