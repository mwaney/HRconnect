import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid Email Address"
    ),
  password: Yup.string().required("Please Enter your password"),
});
function LoginPage() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {},
  });
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
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                className="py-3 px-4 rounded"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="py-3 px-4 rounded"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
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
            <a href="#" className="text-dark">
              Forgot Password?
            </a>
          </div>
        </div>
      </Col>
    </div>
  );
}

export default LoginPage;
