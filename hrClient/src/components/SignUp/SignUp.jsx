import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import NavigationBar from "../NavigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("Username is Required")
    .min(3, "Username must have atleast 3 characters")
    .max(50, "Username must have 50 or less characters"),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid Email Address"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have atleast 6 characters")
    .max(255, "Password must have 255 characters or less"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "The passwords don't match")
    .required("Please confirm your password"),
});

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:5656/api/users", values)
        .then((response) => {
          console.log(response.data);
          alert(JSON.stringify(response.data, null, 2));
          navigate("/login");
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            formik.setFieldError("email", "Email address is already in Use");
          } else {
            console.log("Error creating the person:", error.message);
          }
        });
    },
  });
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
            <Form onSubmit={formik.handleSubmit}>
              <h2 className="mb-4">Sign Up</h2>
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Username"
                  {...formik.getFieldProps("userName")}
                />

                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-danger">{formik.errors.userName}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
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
                  placeholder="Please enter your password"
                  {...formik.getFieldProps("password")}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-danger">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
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
