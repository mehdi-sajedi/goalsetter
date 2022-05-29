import { deleteGoal } from '../features/goals/goalSlice';
import { useDispatch } from 'react-redux';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={onClick}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
