import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../api';
import './TaskPage.css';

const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      loadTasks();
    }
  }, [navigate]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  return (
    <div className="task-page-container">
      <h2 className="heading"> Task Manager</h2>
      <TaskForm onTaskCreated={loadTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPage;
