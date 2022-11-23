import { useState } from 'react';
import { deleteGoal } from '../features/goals/goalSlice';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import styles from './GoalItem.module.scss';
import EditGoalModal from './EditGoalModal';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <div className={styles.goal}>
      <div className={styles.date}>
        {new Date(goal.createdAt).toLocaleDateString()}
      </div>
      <h2 className={styles.text}>{goal.text}</h2>
      <button className={styles.close} onClick={onDelete}>
        <IoCloseOutline />
      </button>
      <button
        onClick={() => setShowModal(true)}
        className={styles.editBtn}
        data-something="moron"
      >
        <FiEdit />
      </button>
      <EditGoalModal
        goal={goal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default GoalItem;
