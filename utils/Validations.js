export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateName = (name) => {
  return /^[a-zA-Z\s]{2,50}$/.test(name);
};