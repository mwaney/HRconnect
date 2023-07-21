import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function LoginPage() {
  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(45deg, #4285f4, #0f9d58, #f4b400, #db4437)",
      }}
    >
      <Col xs={12} md={6} lg={4}>
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                className="py-3 px-4 rounded"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="py-3 px-4 rounded"
              />
            </Form.Group>

            <div className="mb-3">
              Don't Have an Account? <a href="/">Register</a>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3 py-3"
              style={{ background: "#4285f4", borderColor: "#4285f4" }}
            >
              Sign In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <a href="#" className="text-white">
              Forgot Password?
            </a>
          </div>
        </div>
      </Col>
    </div>
  );
}

export default LoginPage;
