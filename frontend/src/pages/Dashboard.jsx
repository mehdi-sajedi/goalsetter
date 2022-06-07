import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import EditModal from '../components/EditModal';

const Dashboard = () => {
  const [editing, setEditing] = useState({
    active: false,
    goalId: '',
  });

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
      console.log('!user');
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, user, isError, message, dispatch]);



  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} setEditing={setEditing} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
      {editing.active && <EditModal editing={editing} setEditing={setEditing} />}
    </>
  );
};

export default Dashboard;
