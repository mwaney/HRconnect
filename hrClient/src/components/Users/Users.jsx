import { useEffect, useState } from "react";
import "./Users.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import CreateUser from "../CreateUser/CreateUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import UserModal from "../OneUser/UserModal";
import Delete from "../Delete/Delete";

function getUsers(token) {
  return axios.get("http://localhost:5656/api/employees", {
    headers: {
      "x-auth-token": token,
    },
  });
}

function Users() {
  const [users, setUsers] = useState([]);
  // const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
      return;
    }

    getUsers(storedToken)
      .then((result) => {
        setUsers(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.code == "ERR_BAD_REQUEST") {
          navigate("/");
        }
      });
  }, [navigate]);

  const handleUserDeletion = (deletedUserID) => {
    setUsers((prevUsers) => {
      // Use 'filter' to create a new array without the deleted user
      return prevUsers.filter((user) => user._id !== deletedUserID);
    });
  };

  const handleUserCreate = (user) => {
    setUsers((prevUsers) => {
      return [...prevUsers, user];
    });
  };

  const handleUpdateUser = (user) => {
    setUsers((prevUsers) => {
      return prevUsers.map((prevUser) => {
        if (prevUser._id === user._id) return user;
        return prevUser;
      });
    });
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <div className="mb-3">
              <h1 className="text-muted">
                <small>Employees</small>
              </h1>
            </div>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <CreateUser onUserCreate={handleUserCreate} />
                <div className="table-responsive">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <Table striped>
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
                              <td>
                                <Link
                                  to="#"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  {user.name}
                                </Link>
                              </td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>{user.age}</td>
                              <td>
                                <div className="btn-group">
                                  <UpdateUser
                                    user={user}
                                    onUpdateUser={handleUpdateUser}
                                  />

                                  <Delete
                                    user={user}
                                    onDeleteUser={handleUserDeletion}
                                    // onClick={() => showDeleteConfirmation(user)}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {selectedUser && (
        <UserModal onClose={() => setSelectedUser(null)} user={selectedUser} />
      )}
    </>
  );
}

export default Users;
