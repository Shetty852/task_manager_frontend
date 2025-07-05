import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks = [], onStatusChange, isLoading = false }) => {
  const [, setIsLoaded] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filterTasks = () => {
    let filtered = [...tasks];

    if (filterStatus === 'completed') {
      filtered = filtered.filter(task => task.status === 'done');
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(task => task.status !== 'done');
    } else if (filterStatus === 'overdue') {
      filtered = filtered.filter(task => {
        const dueDate = new Date(task.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dueDate < today && task.status !== 'done';
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'status') {
        if (a.status === b.status) return 0;
        return a.status === 'done' ? 1 : -1;
      } else if (sortBy === 'assignee') {
        return a.assignedTo.localeCompare(b.assignedTo);
      }
      return 0;
    });

    return filtered;
  };

  const filteredTasks = filterTasks();

  const getEmptyStateContent = () => {
    if (filterStatus === 'all' && tasks.length === 0) {
      return {
        icon: '📝',
        title: 'No Tasks Yet',
        description: 'Get started by creating your first task using the form above.',
        showBack: false
      };
    } else if (filteredTasks.length === 0 && tasks.length > 0) {
      return {
        icon: '🔍',
        title: 'No Tasks Found',
        description: `No tasks match your current filter "${filterStatus}".`,
        showBack: true
      };
    }
    return null;
  };

  const emptyContent = getEmptyStateContent();

  const getFilterButtonClass = (status) => {
    return `filter-btn ${filterStatus === status ? 'active' : ''}`;
  };

  const getSortButtonClass = (sort) => {
    return `sort-btn ${sortBy === sort ? 'active' : ''}`;
  };



  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (emptyContent) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <div className="empty-icon">{emptyContent.icon}</div>
          <h3 className="empty-title">{emptyContent.title}</h3>
          <p className="empty-description">{emptyContent.description}</p>
          {emptyContent.showBack && (
            <button 
              className="btn btn-primary"
              onClick={() => setFilterStatus('all')}
            >
              Back to All Tasks
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Filter and Sort Controls */}
      <div className="controls-section">
        <div className="control-group">
          <label className="control-label">Filter by Status:</label>
          <div className="filter-buttons">
            <button 
              className={getFilterButtonClass('all')}
              onClick={() => setFilterStatus('all')}
            >
              All Tasks
            </button>
            <button 
              className={getFilterButtonClass('pending')}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </button>
            <button 
              className={getFilterButtonClass('completed')}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
            <button 
              className={getFilterButtonClass('overdue')}
              onClick={() => setFilterStatus('overdue')}
            >
              Overdue
            </button>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Sort by:</label>
          <div className="sort-buttons">
            <button 
              className={getSortButtonClass('date')}
              onClick={() => setSortBy('date')}
            >
              Due Date
            </button>
            <button 
              className={getSortButtonClass('status')}
              onClick={() => setSortBy('status')}
            >
              Status
            </button>
            <button 
              className={getSortButtonClass('assignee')}
              onClick={() => setSortBy('assignee')}
            >
              Assignee
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="results-header">
        <h3 className="results-title">
          {filterStatus === 'all' ? 'All Tasks' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Tasks`}
        </h3>
        <span className="results-count">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onStatusUpdated={onStatusChange} 
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;