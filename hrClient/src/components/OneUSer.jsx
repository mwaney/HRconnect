import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavigationBar from "./Navbar";

function OneUSer() {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5656/api/employees/${id}`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="d-flex vh-100 bg-warning justify-content-center align-items-center">
        <div className="w-70 bg-light rounded p-3">
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="https://img.freepik.com/premium-photo/small-boy-colorful-background-funny-cartoon-character-school-kid-3d-generative-ai_58409-28883.jpg?w=2000"
              alt="Card image cap"
            />
            <div className="card-body">
              <h3 className="card-title">{user.name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Cell: +{user.phone}</li>
                <li className="list-group-item">Age: {user.age}</li>
              </ul>
              <Link to="/" className="btn btn-primary">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneUSer;
