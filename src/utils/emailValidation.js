/**
 * Email validation utilities
 */

/**
 * Validates email format using a robust regex pattern
 * @param {string} email - The email string to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Comprehensive email regex that covers most valid email formats
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email.trim());
};

/**
 * Get email validation error message
 * @param {string} email - The email string to validate
 * @returns {string|null} - Error message if invalid, null if valid
 */
export const getEmailValidationError = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Real-time email validation for form inputs
 * @param {string} email - The email string to validate
 * @returns {Object} - Validation result with isValid and error properties
 */
export const validateEmailInput = (email) => {
  const error = getEmailValidationError(email);
  return {
    isValid: error === null,
    error: error
  };
};