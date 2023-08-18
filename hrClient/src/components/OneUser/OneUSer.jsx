import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";

function OneUSer() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToLogin = () => {
      navigate("/");
    };
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:5656/api/employees/${id}`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((result) => {
          setUser(result.data);
        })
        .catch((err) => {
          console.log(err);
          navigateToLogin();
        });
    } else {
      console.log("Token does not exist");
      navigateToLogin();
    }
  }, [id, navigate]);
  return (
    <>
      <NavigationBar />
      <div className="d-flex vh-100 bg-warning justify-content-center align-items-center">
        <div className="w-70 bg-light rounded p-3">
          <div className="card" style={{ width: "20rem" }}>
            <img
              className="card-img-top"
              src="https://img.freepik.com/premium-photo/small-boy-colorful-background-funny-cartoon-character-school-kid-3d-generative-ai_58409-28883.jpg?w=2000"
              alt="Card image cap"
            />
            <div className="card-body">
              <h3 className="card-title">{user.name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Cell: {user.phone}</li>
                <li className="list-group-item">Age: {user.age}</li>
              </ul>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to="/employees" className="btn btn-primary">
                  Go Back
                </Link>
                <Link to={`/employees/${user._id}`} className="btn btn-primary">
                  Update
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneUSer;
