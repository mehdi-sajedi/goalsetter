import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editGoal } from '../features/goals/goalSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditGoalModal = ({ goal, showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setText('');
  };

  const updateGoal = (e) => {
    e.preventDefault();
    if (text === '') {
      handleClose();
      return;
    }
    dispatch(
      editGoal({
        goalId: goal._id,
        text: { text },
      })
    );
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Goal</Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateGoal}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Goal</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            Update goal
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditGoalModal;
