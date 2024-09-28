import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
//app password = dnml wlcp jrig niez
const CollaboratorDialog = ({ eventId, taskId, onCollaboratorAdded }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCollaborator = () => {
    axios.post(`http://localhost:5000/events/${eventId}/tasks/${taskId}/collaborators`, { email })
      .then(response => {
        onCollaboratorAdded();  // Callback to refresh collaborators list
        handleClose();  // Close the modal after success
      })
      .catch(error => {
        setError('Failed to add collaborator. Try again.');
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add Collaborator
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Collaborator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCollaboratorEmail">
              <Form.Label>Collaborator Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter collaborator's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-danger">{error}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCollaborator}>
            Add Collaborator
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CollaboratorDialog;
