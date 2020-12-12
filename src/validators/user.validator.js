const userCreateValidatorSchema = {
  firstName: {
    in: ['body'],
    isLength: {
      errorMessage: 'First Name should be at least 3 char long!',
      options: { min: 3 },
    },
    trim: true,
  },
  lastName: {
    in: ['body'],
    isLength: {
      errorMessage: 'Last Name should be at least 3 chars long!',
      options: { min: 3 },
    },
    trim: true,
  },
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Please enter a valid email address!',
    trim: true,
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password should be at least 8 chars long!',
      options: { min: 8 },
    },
  },
};

const userUpdateValidatorSchema = {
  firstName: {
    in: ['body'],
    isLength: {
      errorMessage: 'First Name should be at least 3 char long!',
      options: { min: 3 },
    },
    trim: true,
  },
  lastName: {
    in: ['body'],
    isLength: {
      errorMessage: 'Last Name should be at least 3 chars long!',
      options: { min: 3 },
    },
    trim: true,
  },
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Please enter a valid email address!',
    trim: true,
  },
};

module.exports = { userCreateValidatorSchema, userUpdateValidatorSchema };
