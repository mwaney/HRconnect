import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar";

function getUsers(token) {
  return axios.get("http://localhost:5656/api/employees", {
    headers: {
      "x-auth-token": token,
    },
  });
}

function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
      return;
    }

    getUsers(storedToken)
      .then((result) => setUsers(result.data))
      .catch((err) => {
        if (err.code == "ERR_BAD_REQUEST") {
          navigate("/login");
        }
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:5656/api/employees/" + id)
        .then((result) => setUser(result.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://localhost:5656/api/employees/" + id, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <NavigationBar />
      <div className="d-flex flex-column vh-100 bg-primary justify-content-center align-items-center">
        <div className="mb-3">
          <h1
            style={{
              fontWeight: "bold",
              fontFamily: "fantasy",
              color: "#FFF",
            }}
          >
            HrConnect Employee DashBoard
          </h1>
        </div>
        <div className="w-70 bg-white rounded p-3">
          <Link to="/create" className="btn btn-warning mb-2">
            Add +
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/employees/${user._id}`}
                          className="btn btn-primary mr-2"
                        >
                          Update
                        </Link>
                        <button
                          className="btn btn-danger mr-2"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        <Link to={`/${user._id}`} className="btn btn-secondary">
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
