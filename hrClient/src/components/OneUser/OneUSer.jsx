import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import { Button } from "react-bootstrap";

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
      <div className="d-flex vh-100 bg-warning justify-content-center align-items-center">
        <div className="w-70 bg-light rounded p-3">
          {/* Display user details as a modal */}
          <UserModal user={user} />
        </div>
      </div>
    </>
  );
}

export default OneUSer;
