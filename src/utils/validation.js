const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is invalid");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Email is invalid");
  } else if (validator.isStrongPassword(password)) {
    throw new Error("Password is invalid");
  }
};

const validateProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about",
  ];

  const isValidProfileData = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isValidProfileData
};

module.exports = {
  validateSignUpData,
  validateProfileData
};
