import { Col, Row, Form, Button, Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid Email Address"
    ),
  password: Yup.string().required("Please Enter your password"),
});
function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:5656/api/login", values)
        .then((response) => {
          console.log(response.data);
          alert(JSON.stringify(values, null, 2));
          navigate("/employees");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
            if (error.response.status === 401) {
              formik.setFieldError("email", "Inavlid email or password");
            }
          } else {
            console.log("Error Logging in:", error.message);
          }
        });
    },
  });
  return (
    <Container>
      <Row>
        <Col
          className="mt-5 pt-5"
          xl={{ span: 4, offset: 4 }}
          lg={{ span: 4, offset: 4 }}
          md={{ span: 6, offset: 3 }}
          sm={{ span: 8, offset: 2 }}
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-center text-primary">Login</h2>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">
                    <small>{formik.errors.email}</small>
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">
                    <small>{formik.errors.password}</small>
                  </div>
                ) : null}
              </Form.Group>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </div>
            </Form>
            <p className="text-center">
              <small>
                Dont Have an Account? <a href="/">Register</a>
              </small>
            </p>
            <p className="text-center ">
              <small>
                <a href="#" className="text-dark">
                  Forgot Password?
                </a>
              </small>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;