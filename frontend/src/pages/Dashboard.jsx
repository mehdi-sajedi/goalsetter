import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import styles from './Dashboard.module.scss';
import { TbRectangle } from 'react-icons/tb';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [goalLayout, setGoalLayout] = useState('grouped');

  const { user } = useSelector((state) => state.auth);
  const { goals, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  useLayoutEffect(() => {
    setGoalLayout(localStorage.getItem('goalLayout') ?? 'grouped');
  }, [setGoalLayout]);

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

  const handleGoalLayout = (type) => {
    setGoalLayout(type);
    localStorage.setItem('goalLayout', type);
  };

  return (
    <div className={styles.dashboard}>
      <section className={styles.heading}>
        <h1>Welcome {user && user.name}</h1>
        <h3>Goals Dashboard</h3>
      </section>
      <GoalForm />
      <div className={styles.layoutIcons}>
        <button
          onClick={() => handleGoalLayout('single')}
          className={goalLayout === 'single' ? styles.active : ''}
        >
          <TbRectangle />
        </button>
        <button
          onClick={() => handleGoalLayout('grouped')}
          className={goalLayout === 'grouped' ? styles.active : ''}
        >
          <HiOutlineSquares2X2 />
        </button>
      </div>
      <section className={styles.content}>
        {goals.length > 0 ? (
          <div
            className={`${styles.goals} ${
              goalLayout === 'single' ? styles.singleLayout : ''
            }`}
          >
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
