import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const schema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "name should be atleast 2 characters")
    .max(50, "name should have 50 or less characters"),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    )
    .required("email is required")
    .min(7, "email should have atleast 7 characters")
    .max(255, "email should have 255 or less characters"),
  phone: Yup.string()
    .required("phone number is required")
    .min(6, "phone should have atleast 6 characters")
    .max(20, "phone should have 20 or less characters"),
  age: Yup.number()
    .integer("age must me a whole number")
    .min(18, "age must be at least 18 years")
    .max(70, "age must be less than or equal to 70"),
});

function UpdateUser({ userId, onUpdateUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5656/api/employees/${userId}`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((result) => {
          const { name, email, phone, age } = result.data;
          setInitialValues({
            name,
            email,
            phone,
            age,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .put(`http://localhost:5656/api/employees/${userId}`, values, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((result) => {
          console.log(result);
          setShowAlert(true);
          onUpdateUser();
          setTimeout(() => {
            setShowAlert(false);
            handleClose();
          }, 1000);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Update
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0)", zIndex: 1050 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        {!loading && (
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ getFieldProps, errors, touched }) => (
              <Form>
                <Modal.Body>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name..."
                      className="form-control"
                      {...getFieldProps("name")}
                    />
                    {errors.name && touched.name && (
                      <div className="text-danger">{errors?.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter Email..."
                      className="form-control"
                      {...getFieldProps("email")}
                    />
                    {errors.email && touched.email && (
                      <div className="text-danger">{errors?.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone Number..."
                      className="form-control"
                      {...getFieldProps("phone")}
                    />
                    {errors.phone && touched.phone && (
                      <div className="text-danger">{errors?.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age">Age</label>
                    <Field
                      type="number"
                      id="age"
                      name="age"
                      placeholder="Enter your Age..."
                      className="form-control"
                      {...getFieldProps("age")}
                    />
                    {errors.age && touched.age && (
                      <div className="text-danger">{errors?.age}</div>
                    )}
                  </div>

                  {showAlert && (
                    <div className="alert alert-success" role="alert">
                      Employee has been updated successfully!
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    Update
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </>
  );
}

UpdateUser.propTypes = {
  userId: PropTypes.string.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

export default UpdateUser;
