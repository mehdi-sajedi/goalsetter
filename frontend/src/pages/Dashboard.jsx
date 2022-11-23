import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, user, isError, message, dispatch]);

  return (
    <>
      <section className={styles.heading}>
        <h1>Welcome {user && user.name}</h1>
        <h3>Goals Dashboard</h3>
      </section>
      <GoalForm />
      <section className={styles.content}>
        {goals.length > 0 ? (
          <div className={styles.goals}>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
