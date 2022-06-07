import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editGoal } from '../features/goals/goalSlice';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';

const EditModal = ({ editing, setEditing }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (
      e.target.closest('.close-btn') ||
      e.target.classList.contains('edit-modal-overlay')
    ) {
      setEditing(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') return;
    // Need the id of the goal here
    dispatch(
      editGoal({
        goalId: editing.goalId,
        text: { text },
      })
    );
    setText('');
    setEditing(false);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return createPortal(
    <div className="edit-modal-overlay" onClick={closeModal}>
      <div className="edit-modal">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="edit-text">Edited Goal</label>
            <input
              type="text"
              name="text"
              id="edit-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={inputRef}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block add-goal" type="submit">
              Edit Goal
            </button>
          </div>
        </form>
        <button className="close-btn">
          <IoCloseOutline />
        </button>
      </div>
    </div>,
    document.getElementById('edit-modal')
  );
};

export default EditModal;
