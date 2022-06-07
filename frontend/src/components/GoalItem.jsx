import { deleteGoal } from '../features/goals/goalSlice';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';

const GoalItem = ({ goal, editing, setEditing }) => {
  const dispatch = useDispatch();

  const editActive = editing?.goalId === goal._id;

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  const openEditModal = () => {
    setEditing({ active: true, goalId: goal._id });
  };

  return (
    <div className={`goal ${editActive ? 'edit-active' : ''}`}>
      <div>{new Date(goal.createdAt).toLocaleDateString()}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={onDelete}>
        <IoCloseOutline />
      </button>
      <button className="update" onClick={openEditModal}>
        <FiEdit />
      </button>
      <div className="edit-flag"></div>
    </div>
  );
};

export default GoalItem;
