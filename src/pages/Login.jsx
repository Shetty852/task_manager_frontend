import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // ✅ Declare navigate

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
    //  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
      `,
      zIndex: 1
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '50px 40px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      zIndex: 2,
      transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    logo: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '18px',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '8px',
      letterSpacing: '-0.5px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#718096',
      fontWeight: '400'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      position: 'relative'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px',
      letterSpacing: '0.5px'
    },
    input: {
      width: '100%',
      padding: '16px 20px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '16px',
      color: '#2d3748',
      background: 'rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    inputFocused: {
      borderColor: '#667eea',
      background: 'rgba(255, 255, 255, 1)',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    passwordContainer: {
      position: 'relative'
    },
    togglePassword: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#718096',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    button: {
      width: '100%',
      padding: '18px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      marginTop: '8px',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    buttonText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    loader: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    backLink: {
      textAlign: 'center',
      marginTop: '24px'
    },
    backButton: {
      color: '#667eea',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/tasks'); // ✅ Redirect to tasks page
      } else {
        alert(data.msg || 'Login failed');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (e) => {
    Object.assign(e.target.style, styles.inputFocused);
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
    e.target.style.boxShadow = 'none';
  };

  const handleButtonHover = (e, isHover) => {
    if (!isLoading) {
      e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0px)';
      e.target.style.boxShadow = isHover 
        ? '0 8px 25px rgba(102, 126, 234, 0.5)' 
        : '0 4px 15px rgba(102, 126, 234, 0.4)';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <div style={styles.logo}>✓</div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                style={styles.input}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <button
                type="button"
                style={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="button"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
            disabled={isLoading}
            onClick={handleSubmit}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            <div style={styles.buttonText}>
              {isLoading && <div style={styles.loader}></div>}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </div>
          </button>
        </div>

        <div style={styles.backLink}>
          <a 
            href="/" 
            style={styles.backButton}
            onMouseEnter={(e) => e.target.style.color = '#5a67d8'}
            onMouseLeave={(e) => e.target.style.color = '#667eea'}
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Login;
