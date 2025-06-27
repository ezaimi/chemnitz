function validateSignupData({ name, email, password }) {
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push("Name must be at least 3 characters long.");
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!password || password.length < 5) {
    errors.push("Password must be at least 5 characters long.");
  }

  return errors;
}

module.exports = { validateSignupData };
