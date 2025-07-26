import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmailInput } from '../utils/emailValidation';

function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordStrength('Too short');
      return false;
    } else if (password.length < 8) {
      setPasswordStrength('Weak');
      return true;
    } else if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
      setPasswordStrength('Strong');
      return true;
    } else {
      setPasswordStrength('Medium');
      return true;
    }
  };

  const handleEmailChange = (email) => {
    setForm({ ...form, email });
    
    // Real-time email validation
    const emailValidation = validateEmailInput(email);
    if (email.trim() !== '' && !emailValidation.isValid) {
      setErrors({ ...errors, email: emailValidation.error });
    } else {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handlePasswordChange = (password) => {
    setForm({ ...form, password });
    validatePassword(password);

    if (form.confirmPassword && password !== form.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
    } else {
      const newErrors = { ...errors };
      delete newErrors.confirmPassword;
      setErrors(newErrors);
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setForm({ ...form, confirmPassword });

    if (form.password && confirmPassword !== form.password) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
    } else {
      const newErrors = { ...errors };
      delete newErrors.confirmPassword;
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    const newErrors = {};
    
    // Email validation
    const emailValidation = validateEmailInput(form.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (form.password && form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });

      const data = await res.json();
      if (res.status === 201) {
        alert('Registration successful! Please login to continue.');
        navigate('/login');
      } else {
        alert(data.msg || 'Registration failed!');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
     // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '60px 40px',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s ease-out'
    },
    logo: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '20px',
      margin: '0 auto 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '15px',
      textAlign: 'center',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '18px',
      color: '#4a5568',
      marginBottom: '40px',
      textAlign: 'center',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginTop: '20px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '6px',
      color: '#4a5568'
    },
    input: {
      padding: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      width: '100%',
      transition: 'all 0.3s ease',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    inputError: {
      borderColor: '#e53e3e'
    },
    button: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      marginTop: '10px',
      transform: 'translateY(0px)'
    },
    togglePassword: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#667eea',
      cursor: 'pointer',
      fontWeight: '600'
    },
    errorText: {
      fontSize: '12px',
      color: '#e53e3e',
      marginTop: '6px'
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '16px',
      color: '#4a5568'
    },
    linkText: {
      color: '#667eea',
      fontWeight: '600',
      textDecoration: 'none'
    }
  };

  const handleButtonHover = (e, isHover) => {
    e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0px)';
    e.target.style.boxShadow = isHover 
      ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
      : '0 4px 15px rgba(102, 126, 234, 0.3)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.logo}>+</div>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join and start managing your tasks</p>

        <div style={styles.form}>
          <div>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              style={{ ...styles.input, ...(errors.email && styles.inputError) }}
              value={form.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.email ? '#e53e3e' : '#e2e8f0'}
              placeholder="Enter your email address"
              required
            />
            {errors.email && <div style={styles.errorText}>{errors.email}</div>}
          </div>

          <div style={{ position: 'relative' }}>
            <label style={styles.label}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              style={{ ...styles.input, ...(errors.password && styles.inputError) }}
              value={form.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.password ? '#e53e3e' : '#e2e8f0'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.togglePassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && <div style={styles.errorText}>{errors.password}</div>}
            {passwordStrength && !errors.password && (
              <div style={{ fontSize: '12px', color: '#667eea', marginTop: '4px', fontWeight: '500' }}>
                Strength: {passwordStrength}
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              style={{ ...styles.input, ...(errors.confirmPassword && styles.inputError) }}
              value={form.confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#e53e3e' : '#e2e8f0'}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.togglePassword}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
            {errors.confirmPassword && <div style={styles.errorText}>{errors.confirmPassword}</div>}
          </div>

          <button
            type="button"
            style={styles.button}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div style={styles.loginLink}>
            Already have an account?{' '}
            <a href="/login" style={styles.linkText}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;