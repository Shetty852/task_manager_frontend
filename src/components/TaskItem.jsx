import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task = {
  _id: '1',
  task: 'Complete project documentation',
  assignedTo: 'John Doe',
  date: '2025-06-25',
  status: 'pending'
}, onStatusUpdated }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkDone = async () => {
    setIsUpdating(true);
    
    try {
      // Replace with your API call
       await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
         status: 'done',
       });
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      onStatusUpdated?.();
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const dueDate = new Date(task.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isOverdue = dueDate < today && task.status !== 'done';
  const isDone = task.status === 'done';
  const isToday = dueDate.toDateString() === new Date().toDateString();

  const formatDate = (date) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = () => {
    if (isDone) return '#10b981'; // green
    if (isOverdue) return '#ef4444'; // red
    if (isToday) return '#f59e0b'; // amber
    return '#667eea'; // default purple
  };

  const getStatusText = () => {
    if (isDone) return 'Completed';
    if (isOverdue) return 'Overdue';
    if (isToday) return 'Due Today';
    return 'Pending';
  };

  const getStatusIcon = () => {
    if (isDone) return '✅';
    if (isOverdue) return '🔴';
    if (isToday) return '⚡';
    return '⏳';
  };

  const styles = {
    container: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      margin: '16px 0',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transform: isLoaded ? 'translateY(0px)' : 'translateY(20px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.5s ease-out',
      position: 'relative',
      overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '12px'
    },
    taskTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#2d3748',
      margin: '0',
      lineHeight: '1.3',
      flex: '1',
      minWidth: '200px'
    },
    statusBadge: {
      background: getStatusColor(),
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: `0 2px 8px ${getStatusColor()}30`
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      background: 'rgba(102, 126, 234, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(102, 126, 234, 0.1)'
    },
    detailIcon: {
      fontSize: '18px',
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    detailContent: {
      flex: '1'
    },
    detailLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#4a5568',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '2px'
    },
    detailValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#2d3748',
      margin: '0'
    },
    dateValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: isOverdue ? '#ef4444' : isToday ? '#f59e0b' : '#2d3748',
      margin: '0'
    },
    actionSection: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: '16px',
      borderTop: '1px solid rgba(102, 126, 234, 0.1)'
    },
    markDoneButton: {
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  color: '#ffffff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '140px',
  justifyContent: 'center',
},

    markDoneButtonDisabled: {
      background: 'linear-gradient(135deg, #a0aec0, #cbd5e0)',
      cursor: 'not-allowed',
      boxShadow: '0 2px 8px rgba(160, 174, 192, 0.2)'
    },
    completedOverlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
      pointerEvents: 'none',
      opacity: isDone ? 1 : 0,
      transition: 'opacity 0.3s ease'
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  const handleButtonHover = (e, isHover) => {
    if (!isUpdating) {
      e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0px)';
      e.target.style.boxShadow = isHover 
        ? '0 8px 25px rgba(16, 185, 129, 0.4)' 
        : '0 4px 15px rgba(16, 185, 129, 0.3)';
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.completedOverlay}></div>
        
        <div style={styles.header}>
          <h3 style={styles.taskTitle}>{task.task}</h3>
          <div style={styles.statusBadge}>
            <span>{getStatusIcon()}</span>
            {getStatusText()}
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <div style={styles.detailIcon}>👤</div>
            <div style={styles.detailContent}>
              <div style={styles.detailLabel}>Assigned To</div>
              <p style={styles.detailValue}>{task.assignedTo}</p>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.detailIcon}>📅</div>
            <div style={styles.detailContent}>
              <div style={styles.detailLabel}>Due Date</div>
              <p style={styles.dateValue}>{formatDate(dueDate)}</p>
            </div>
          </div>
        </div>

        {!isDone && (
          <div style={styles.actionSection}>
            <button
              onClick={handleMarkDone}
              disabled={isUpdating}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
              style={{
                ...styles.markDoneButton,
                ...(isUpdating ? styles.markDoneButtonDisabled : {})
              }}
            >
              {isUpdating ? (
                <>
                  <div style={styles.spinner}></div>
                  Updating...
                </>
              ) : (
                <>
                  ✅ Mark Complete
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskItem;