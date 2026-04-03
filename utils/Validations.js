export const validateEmail = (email) => {
  if (!email || email.trim().email === 0) {
    return '';
  }

  return validateEmailWithoutLenght(email);
};

export const validateEmailWithoutLenght = (email) => {

  if (!email || email.trim() === '') {
    return 'Required';
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) {
    return 'Invalid Email';
  }

  return '';
};


export const validateName = (value) => {
  if (!value || value.trim().length === 0) {
    return '';
  }

  return validateNameWithoutLenght(value)
};

export const validateNameWithoutLenght = (value) => {

  if (value.trim().length < 2) {
    return 'Invalid Name';
  }

  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(value.trim())) {
    return 'Invalid Name';
  }

  return '';
};

export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return '';
  }

  const cleaned = phone.replace(/[\s\-()]/g, ""); // remove spaces, -, ()

  // Optional +1 at start
  const regex = /^(?:\+1)?\d{10}$/;

  if (!regex.test(cleaned)) {
    return "Phone number must be a valid US number (10 digits, optional +1)";
  }

  return '';
};