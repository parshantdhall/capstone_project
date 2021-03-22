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

export const validateProjectForm = (dataToValidate) => {
  if (
    dataToValidate.project_title === "" ||
    dataToValidate.project_description === "" ||
    dataToValidate.number_of_students_allowed <= 0 ||
    dataToValidate.number_of_groups_allowed <= 0 ||
    dataToValidate.project_file === ""
  ) {
    return {
      isError: true,
      message: "All fields are necessary",
    };
  }
  return {
    isError: false,
  };
};

export const validateProjectFormFileType = (dataToValidate) => {
  if (
    dataToValidate.type === "application/pdf" ||
    dataToValidate.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return {
      isError: false,
    };
  } else {
    return {
      isError: true,
      message: "Only Pdfs and Word document files are allowed",
    };
  }
};
