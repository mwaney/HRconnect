import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar";

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Submit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5656/api/employees", { name, email, phone, age })
      .then((result) => {
        console.log(result);
        navigate("/allemployees");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavigationBar />
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Submit}>
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
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
