import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';
import styles from './GoalForm.module.scss';

const GoalForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') return;
    dispatch(createGoal({ text }));
    setText('');
  };

  return (
    <section className={styles.form}>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.btnBlock} type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
