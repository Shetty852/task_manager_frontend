import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '60px 40px',
      textAlign: 'center',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transform: isLoaded ? 'translateY(0px)' : 'translateY(30px)',
      opacity: isLoaded ? 1 : 0,
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
    heading: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '15px',
      lineHeight: '1.2'
    },
    subheading: {
      fontSize: '18px',
      color: '#4a5568',
      marginBottom: '40px',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '40px'
    },
    primaryButton: {
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
      textDecoration: 'none',
      display: 'inline-block',
      transform: 'translateY(0px)'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      padding: '14px 32px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },
    features: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '20px'
    },
    feature: {
      flex: '1',
      minWidth: '120px',
      textAlign: 'center'
    },
    featureIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '10px',
      margin: '0 auto 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    featureText: {
      fontSize: '14px',
      color: '#4a5568',
      fontWeight: '500'
    }
  };

  const handleButtonHover = (e, isHover, isPrimary = false) => {
    if (isPrimary) {
      e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0px)';
      e.target.style.boxShadow = isHover 
        ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
        : '0 4px 15px rgba(102, 126, 234, 0.3)';
    } else {
      e.target.style.background = isHover ? '#667eea' : 'transparent';
      e.target.style.color = isHover ? 'white' : '#667eea';
      e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0px)';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          ✓
        </div>
        
        <h1 style={styles.heading}>Task Manager</h1>
        <p style={styles.subheading}>
          Organize your tasks efficiently and boost your productivity with our intuitive task management system.
        </p>
        
        <div style={styles.buttonContainer}>
          <button 
            style={styles.primaryButton}
            onMouseEnter={(e) => handleButtonHover(e, true, true)}
            onMouseLeave={(e) => handleButtonHover(e, false, true)}
            onClick={() => window.location.href = '/login'}
          >
            Get Started
          </button>
          
          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => handleButtonHover(e, true, false)}
            onMouseLeave={(e) => handleButtonHover(e, false, false)}
            onClick={() => window.location.href = '/register'}
          >
            Create Account
          </button>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⚡</div>
            <div style={styles.featureText}>Fast & Efficient</div>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔒</div>
            <div style={styles.featureText}>Secure & Private</div>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📱</div>
            <div style={styles.featureText}>Easy to Use</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;