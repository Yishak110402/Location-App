function isValidUsername(username) {
    const result = {
      isValid: true,
      errors: []
    };
  
    // Length check
    if (username.length < 5 || username.length > 15) {
      result.isValid = false;
      result.errors.push("Username must be between 5 and 15 characters.");
    }
  
    // Allowed characters check
    const allowedChars = /^[a-zA-Z0-9._]+$/;
    if (!allowedChars.test(username)) {
      result.isValid = false;
      result.errors.push("Username can only contain letters, numbers, periods, and underscores.");
    }
  
    // Start or end with . or _ check
    if (/^[._]/.test(username) || /[._]$/.test(username)) {
      result.isValid = false;
      result.errors.push("Username cannot start or end with a period or underscore.");
    }
  
    // Consecutive . or _ check
    if (/[\._]{2,}/.test(username)) {
      result.isValid = false;
      result.errors.push("Username cannot contain consecutive periods or underscores.");
    }
  
    return result;
  }
  
  module.exports = isValidUsername