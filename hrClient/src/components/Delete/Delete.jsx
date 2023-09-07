import axios from "axios";
import { Button, Modal, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Delete({ user, onDeleteUser }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(`${import.meta.env.VITE_ENDPOINT}/employees/${user._id}`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then(() => {
          onDeleteUser(user._id);
          handleClose();
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Button variant="outline-danger" size="sm" onClick={handleShow}>
        Delete
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && <p>Are you sure you want to delete {user.name}?</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading && (
              <Spinner
                size="sm"
                className="me-2"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Delete.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default Delete;
