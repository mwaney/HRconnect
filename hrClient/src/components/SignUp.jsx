import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import NavigationBar from "./Navbar";

function SignUp() {
  return (
    <div>
      <NavigationBar />
      <Row
        className="d-flex align-items-center bg-primary text-black"
        style={{ height: "100vh" }}
      >
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="p-5 bg-light rounded">
            <Form>
              <h2 className="mb-4">Sign Up</h2>
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your Username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Please enter your password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <div className="mb-3">
                Already Have an Account? <a href="/login">Login</a>
              </div>
              <Button variant="warning" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <img
            src="./signup.png"
            alt=""
            className="img-fluid"
            style={{ maxHeight: "600px", maxWidth: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
