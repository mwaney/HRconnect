import { Modal, Button } from "react-bootstrap";

function UserModal({ user, onClose }) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className="card-img-top"
          src="https://img.freepik.com/premium-photo/small-boy-colorful-background-funny-cartoon-character-school-kid-3d-generative-ai_58409-28883.jpg?w=2000"
          alt="Card"
          style={{ maxWidth: "100%" }}
        />
        <h5>Email: {user.email}</h5>
        <h5>Cell: {user.phone}</h5>
        <h5>Age: {user.age}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
