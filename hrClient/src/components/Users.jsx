import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5656/api/employees")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
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
    axios
      .delete("http://localhost:5656/api/employees/" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-warning justify-content-center align-items-center">
      <div className="w-70 bg-white rounded p-3">
        <Link to="/create" className="btn btn-info mb-2">
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
                        to={`/update/${user._id}`}
                        className="btn btn-primary mr-2"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger mr-2"
                        onClick={(e) => handleDelete(user._id)}
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
  );
}

export default Users;
