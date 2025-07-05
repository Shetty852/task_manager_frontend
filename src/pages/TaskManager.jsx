// src/pages/TaskManager.jsx
import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTask } from '../api';
import './TaskManager.css'; 

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const data = await getTask();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} onStatusChange={fetchTasks} />
    </div>
  );
};

export default TaskManager;
