import { useEffect, useState } from "react";
import "./Users.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import CreateUser from "../CreateUser/CreateUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import UserModal from "../OneUser/UserModal";

function getUsers(token) {
  return axios.get("http://localhost:5656/api/employees", {
    headers: {
      "x-auth-token": token,
    },
  });
}

function Users() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
      return;
    }

    getUsers(storedToken)
      .then((result) => setUsers(result.data))
      .catch((err) => {
        if (err.code == "ERR_BAD_REQUEST") {
          navigate("/");
        }
      });
  }, [navigate]);

  const showDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const hideDeleteConfirmation = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

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

  const handleUserCreate = (user) => {
    setUsers((prevUsers) => {
      return [...prevUsers, user];
    });
  };

  const handleFetchUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getUsers(token)
        .then((result) => setUsers(result.data))
        .catch((err) => {
          if (err.code === "ERR_BAD_REQUEST") {
            navigate("/");
          }
        });
    }
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
                                  userId={user._id}
                                  onUpdateUser={handleFetchUser}
                                />

                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => showDeleteConfirmation(user)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {selectedUser && (
        <UserModal onClose={() => setSelectedUser(null)} user={selectedUser} />
      )}
      <Modal
        show={showDeleteModal}
        onHide={hideDeleteConfirmation}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userToDelete && (
            <p>Are you sure you want to delete {userToDelete.name}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteConfirmation}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(userToDelete._id);
              hideDeleteConfirmation();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;
