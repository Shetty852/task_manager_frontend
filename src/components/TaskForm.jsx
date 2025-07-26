import React, { useState } from 'react';
import { createTask } from '../api';
import { validateEmailInput } from '../utils/emailValidation';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    task: '',
    assignedTo: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [emailError, setEmailError] = useState('');

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validate email for assignedTo field
    if (field === 'assignedTo') {
      if (value.trim() !== '') {
        const validation = validateEmailInput(value);
        setEmailError(validation.isValid ? '' : validation.error);
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.task.trim() || !formData.assignedTo.trim() || !formData.date) {
      return;
    }

    // Validate email before submitting
    const emailValidation = validateEmailInput(formData.assignedTo);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createTask(formData);
      setFormData({
        task: '',
        assignedTo: '',
        date: ''
      });
      setEmailError('');
      onTaskCreated?.();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      maxWidth: '500px',
      width: '100%',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transform: isLoaded ? 'translateY(0px)' : 'translateY(20px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.6s ease-out'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    titleIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: 'white'
    },
    subtitle: {
      fontSize: '16px',
      color: '#4a5568',
      fontWeight: '400'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    labelIcon: {
      fontSize: '16px'
    },
    input: {
      padding: '16px 20px',
      border: '2px solid rgba(102, 126, 234, 0.2)',
      borderRadius: '12px',
      fontSize: '16px',
      fontFamily: 'inherit',
      background: 'rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s ease',
      outline: 'none',
      color: '#2d3748'
    },
    inputFocused: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
      background: 'rgba(255, 255, 255, 0.95)'
    },
    inputError: {
      borderColor: '#e53e3e',
      background: 'rgba(229, 62, 62, 0.05)'
    },
    errorText: {
      fontSize: '12px',
      color: '#e53e3e',
      marginTop: '6px',
      fontWeight: '500'
    },
    dateInput: {
      padding: '16px 20px',
      border: '2px solid rgba(102, 126, 234, 0.2)',
      borderRadius: '12px',
      fontSize: '16px',
      fontFamily: 'inherit',
      background: 'rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s ease',
      outline: 'none',
      color: '#2d3748',
      cursor: 'pointer'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '18px 32px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '8px',
      minHeight: '56px'
    },
    submitButtonDisabled: {
      background: 'linear-gradient(135deg, #a0aec0, #cbd5e0)',
      cursor: 'not-allowed',
      boxShadow: '0 2px 8px rgba(160, 174, 192, 0.2)'
    },
    buttonIcon: {
      fontSize: '18px'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  const [focusedInput, setFocusedInput] = useState(null);

  const handleButtonHover = (e, isHover) => {
    if (!isSubmitting) {
      e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0px)';
      e.target.style.boxShadow = isHover 
        ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
        : '0 4px 15px rgba(102, 126, 234, 0.3)';
    }
  };

  const isFormValid = formData.task.trim() && formData.assignedTo.trim() && formData.date && !emailError;

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
        <div style={styles.header}>
          <h2 style={styles.title}>
            <div style={styles.titleIcon}>✓</div>
            Create New Task
          </h2>
          <p style={styles.subtitle}>
            Add a new task to your task management system
          </p>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>✏️</span>
              Task Description
            </label>
            <input
              type="text"
              value={formData.task}
              onChange={(e) => handleInputChange('task', e.target.value)}
              onFocus={() => setFocusedInput('task')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...styles.input,
                ...(focusedInput === 'task' ? styles.inputFocused : {})
              }}
              placeholder="Enter task description..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📧</span>
              Assigned To (Email)
            </label>
            <input
              type="email"
              value={formData.assignedTo}
              onChange={(e) => handleInputChange('assignedTo', e.target.value)}
              onFocus={() => setFocusedInput('assignedTo')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...styles.input,
                ...(focusedInput === 'assignedTo' ? styles.inputFocused : {}),
                ...(emailError ? styles.inputError : {})
              }}
              placeholder="Enter assignee email address..."
              required
              disabled={isSubmitting}
            />
            {emailError && <div style={styles.errorText}>{emailError}</div>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📅</span>
              Due Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              onFocus={() => setFocusedInput('date')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...styles.dateInput,
                ...(focusedInput === 'date' ? styles.inputFocused : {})
              }}
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={{
              ...styles.submitButton,
              ...((!isFormValid || isSubmitting) ? styles.submitButtonDisabled : {})
            }}
          >
            {isSubmitting ? (
              <>
                <div style={styles.spinner}></div>
                Creating Task...
              </>
            ) : (
              <>
                <span style={styles.buttonIcon}>➕</span>
                Add Task
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskForm;