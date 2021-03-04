export const validateRegister = (dataToValidate) => {
  // if fields are empty
  if (
    dataToValidate.email === "" ||
    dataToValidate.first_name === "" ||
    dataToValidate.last_name === "" ||
    dataToValidate.password === ""
  ) {
    return {
      isError: true,
      message: "All fields are necessary",
    };
  }
  if (dataToValidate.password.length < 8) {
    return {
      isError: true,
      message: "Password should be atleast 8 characters long",
    };
  }
  return {
    isError: false,
  };
};
