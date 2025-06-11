export const validateName = (name: string): string => {
  if (!name.trim()) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return "";
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email address";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};
