import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar";
import { Table, Container, Row, Col, Card, Button } from "react-bootstrap";
import CreateUser from "../CreateUser/CreateUser";
import UpdateUser from "../UpdateUser/UpdateUser";

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
                              <Link to={`/${user._id}`}>{user.name}</Link>
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
                                  onClick={() => handleDelete(user._id)}
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
    </>
  );
}

export default Users;
