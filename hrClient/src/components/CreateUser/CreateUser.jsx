import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";

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

const initialValues = {
  name: "",
  email: "",
  phone: "",
  age: "",
};

function CreateUser() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(`http://localhost:5656/api/employees`, values, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((response) => {
          console.log(response);
          setShowAlert(true);
          setTimeout(() => {
            navigate("/employees");
          }, 1200);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <NavigationBar />

      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          {showAlert && (
            <div className="alert alert-success" role="alert">
              Successfully Created Employee
            </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ getFieldProps, errors, touched }) => (
              <Form>
                <h2>Add Employee</h2>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    {...getFieldProps("name")}
                  />
                  {errors.name && touched.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    className="form-control"
                    {...getFieldProps("email")}
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">Phone</label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    className="form-control"
                    {...getFieldProps("phone")}
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-danger">{errors.phone}</div>
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
                    <div className="text-danger">{errors.age}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-success">
                  Create
                </button>
              </Form>
            )}
          </Formik>

          {/* <form onSubmit={Submit}>
            <h2>Add Employee</h2>
            <div className="mb-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Phone</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                className="form-control"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <button className="btn btn-success">Create</button>
          </form> */}
        </div>
      </div>
    </>
  );
}

export default CreateUser;
